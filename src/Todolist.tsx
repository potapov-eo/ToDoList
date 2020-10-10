import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string) => void
    changFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string|null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        }else setError("Tittle is required")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onPressHandler = ((e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    })
    const onAllCliCkHandler = () => {
        props.changFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changFilter('comleted')
    }

    return <div>

        <h3>{props.title}</h3>
        <div>
            <input
                value={title} onChange={onChangeHandler}
                   onKeyPress={onPressHandler}
                className={error? "error" :  ""}

            />

            <button onClick={addTask}>+</button>
            {error&&<div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id} className={t.isDone? "isDone":""}>
                            <
                                input type="checkbox" checked={t.isDone}
                                      onChange={changeStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}> x</button>
                        </li>
                    )
                })
            }

        </ul>
        <div>
            <button className= {props.filter=== "all"?"active":""}
                onClick={onAllCliCkHandler}>All</button>
            <button className= {props.filter=== "active"?"active":""}
                onClick={onActiveClickHandler}>Active</button>
            <button className= {props.filter=== "comleted"?"active":""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
