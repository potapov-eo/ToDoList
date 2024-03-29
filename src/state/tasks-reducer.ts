import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from './todolists-reducer';

import {TaskPriorities, TaskType, todolistAPI, UpdateTaskModelType} from "../API/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
export type updateTaskAC = {
    type: 'CHANGE-TASK',
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}
export type SetTaskTitleActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | updateTaskAC
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListsActionType
    | SetTaskTitleActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = action.tasks

            return stateCopy;
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): updateTaskAC => {
    return {type: 'CHANGE-TASK', model, todolistId, taskId}
}
export const setTaskTitleAC = (tasks: Array<TaskType>, todolistId: string): SetTaskTitleActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.GetTasks(todolistId)
        .then((res) => {
            dispatch(setTaskTitleAC(res.data.items, todolistId))
        })
}

export const removeTasksTC = (id: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.DeleteTodolistTasks(todolistId, id)
        .then(res => {
            const action = removeTaskAC(id, todolistId);
            dispatch(action);
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.CreateTodolistTasks(todolistId, title)
        .then(res => {
            const action = addTaskAC(res.data.data.item);
            dispatch(action);
        })
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn(" task not found in the state")
            return
        }
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: TaskPriorities.Low,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }


        todolistAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                const action = updateTaskAC(taskId, model, todolistId);
                dispatch(action);
            })
    }
