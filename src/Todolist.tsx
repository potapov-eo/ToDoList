import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string, todoListID: string) => void
    changFilter: (value: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle:string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle:(todoListID:string, newTitle:string)=>void
}

export function Todolist(props: PropsType) {


    const onAllCliCkHandler = () => {
        props.changFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changFilter('comleted', props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask=(title:string)=>{
        props.addTask(title,props.id)
    }
    const changeTitle=(newTitle:string)=> {
        props.changeTodolistTitle(props.id, newTitle)

    }
    return <div>

        <h3> <EditableSpan title={props.title} onChange={changeTitle}/>
            <button onClick={removeTodoList}> x</button>
        </h3>
        <AddItemForm  addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const changeTitle = (newTitle:string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? "isDone" : ""}>
                            <
                                input type="checkbox" checked={t.isDone}
                                      onChange={changeStatus}
                            />
                            <EditableSpan title={t.title} onChange={changeTitle}/>
                            <button onClick={onClickHandler}> x</button>
                        </li>
                    )
                })
            }

        </ul>
        <div>
            <button className={props.filter === "all" ? "active" : ""}
                    onClick={onAllCliCkHandler}>All
            </button>
            <button className={props.filter === "active" ? "active" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "comleted" ? "active" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

