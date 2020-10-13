import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

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
    removeTodoList: (todoListID: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id)
            setTitle("")
        } else setError("Tittle is required")
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
    return <div>

        <h3>{props.title}
            <button onClick={removeTodoList}> x</button>
        </h3>
        <div>
            <input
                value={title} onChange={onChangeHandler}
                onKeyPress={onPressHandler}
                className={error ? "error" : ""}

            />

            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? "isDone" : ""}>
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
