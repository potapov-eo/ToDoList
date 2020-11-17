import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType =
    ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
export const todoListID1 = v1()
export const todoListID2 = v1()

const initialState: Array<TodolistType>  =[
    {id: todoListID1, title: "What to learn", filter: 'all'},
    {id: todoListID2, title: "What to buy", filter: 'all'}

]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {

            let todolist: TodolistType = {
                id: action.todolistId,
                filter: "all",
                title: action.title
            }
            return [todolist,...state]

        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return ([...state])
            } else {
                return state
            }
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return ([...state])
        }
        default:
            return state
    }
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST' as const,
        id: todolistId
    }
}
export const AddTodolistAC = (title: string,todolistId:string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId:todolistId
    }
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}
