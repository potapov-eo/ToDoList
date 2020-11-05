import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type changeTaskStatusActionType = {
    type: 'CHENG-TASK-STATUS'
    taskID: string
    isDone: boolean
    todoListID:string
}
export type changeTaskTitleActionType = {
    type: 'CHENG-TASK-TITLE'
    taskID: string
    title: string
    todoListID:string
}

type ActionType = RemoveTaskActionType|AddTaskActionType|changeTaskStatusActionType
|changeTaskTitleActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todoListID] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            const tasks = state[action.todoListID]
            stateCopy[action.todoListID]  = [newTask, ...tasks]
            return stateCopy
        }
        case 'CHENG-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListID]
            let newTasks = tasks.map(task => {
                if (task.id === action.taskID) {
                    return {...task, isDone: action.isDone}
                }
                return task
            })
            stateCopy[action.todoListID] = newTasks
            return stateCopy
        }
        case 'CHENG-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListID]
            let newTasks = tasks.map(task => {
                if (task.id === action.taskID) {
                    return {...task, title: action.title}
                }
                return task
            })
            stateCopy[action.todoListID] = newTasks
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskID: taskID,
        todoListID: todoListID
    }
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title: title,
        todoListID: todoListID
    }
}
export const changeTaskStatusAC = (taskID: string, isDone:boolean, todoListID: string): changeTaskStatusActionType => {
    return {
        type: 'CHENG-TASK-STATUS',
        taskID: taskID,
        isDone: isDone,
        todoListID:todoListID,
    }
}
export const changeTaskTitleAC = (taskID: string, title:string, todoListID: string): changeTaskTitleActionType => {
    return {
        type: 'CHENG-TASK-TITLE',
        taskID: taskID,
        title: title,
        todoListID:todoListID,
    }
}























