import React, {ChangeEvent, KeyboardEvent, useState}  from 'react';
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
    addTask:(title: string)=> void

}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    const addTask =() => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{setTitle(e.currentTarget.value)}
    const onPressHandler = ((e:KeyboardEvent<HTMLInputElement>) => {if (e.charCode===13) {addTask()}})
    const onAllCliCkHandler = () => {props.changFilter('all')}
    const onActiveClickHandler = () => {props.changFilter('active')}
    const onCompletedClickHandler= () => {props.changFilter('comleted')}
    return <div>

        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler}
                   onKeyPress={onPressHandler}
            />

            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {props.removeTask(t.id)}
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}> x </button>
                        </li>
                    )
                })
            }

        </ul>
        <div>
            <button onClick={ onAllCliCkHandler}>All</button>
            <button onClick={ onActiveClickHandler}>Active</button>
            <button onClick={ onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
