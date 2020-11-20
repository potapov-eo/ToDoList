import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValueType, TodolistType} from '../AppWithRedux';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {

    let action = removeTodolistAC(todolistId1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";
    const todoListID1 = v1()
    let action = AddTodolistAC(newTodolistTitle,todoListID1)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";
    let action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = "completed";
    let action = ChangeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
