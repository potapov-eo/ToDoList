import React from 'react';
import {FilterValueType} from "./App";

 export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID:string) => void
    changFilter: (value:FilterValueType)=> void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={ () => {props.removeTask(t.id)}}> x </button>
                        </li>
                    )
                })
            }

        </ul>
        <div>
            <button onClick={ () => {props.changFilter('all')}}>All</button>
            <button onClick={ () => {props.changFilter('active')}}>Active</button>
            <button onClick={ () => {props.changFilter('comleted')}}>Completed</button>
        </div>
    </div>
}
