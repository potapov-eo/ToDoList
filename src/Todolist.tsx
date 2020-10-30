import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
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
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)

    }
    return <div>

        <h3><EditableSpan title={props.title} onChange={changeTitle}/>
            {/*<button onClick={removeTodoList}> x</button>*/}
            <Button onClick={removeTodoList}>
                <Delete/>
            </Button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const changeTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }
                    return (
                        <div key={t.id} className={t.isDone ? "isDone" : ""}>
                            <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{'aria-label': 'secondary checkbox'}}
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <EditableSpan title={t.title} onChange={changeTitle}/>
                            {/*  <button onClick={onClickHandler}> x</button>*/}
                            <Button onClick={onClickHandler}>
                                <Delete/>
                            </Button>
                        </div>
                    )
                })
            }

        </div>
        <div style={{padding: "10px"}}>
            <Button variant={props.filter === "all" ? "contained" : "outlined"} color="primary"
                    className={props.filter === "all" ? "active" : ""}
                    onClick={onAllCliCkHandler}>All
            </Button>
            <Button variant={props.filter === "active" ? "contained" : "outlined"} color="primary"
                    className={props.filter === "active" ? "active" : ""}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === "comleted" ? "contained" : "outlined"} color="primary"
                    className={props.filter === "comleted" ? "active" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

