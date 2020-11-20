import React, {ChangeEvent} from 'react';
import {Button, Checkbox} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';

type TaskPropsType ={
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    id: string
    taskId:string
    title:string
    isDone:boolean
}
export const Task = (props:TaskPropsType)=>{

    const onClickHandler = () => {
        props.removeTask(props.taskId, props.id)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.taskId, e.currentTarget.checked, props.id)
    }
    const changeTitle = (newTitle: string) => {
        props.changeTaskTitle(props.taskId, newTitle, props.id)
    }
    return (
        <div key={props.taskId} className={props.isDone ? "isDone" : ""}>
            <Checkbox
                defaultChecked
                color="primary"
                inputProps={{'aria-label': 'secondary checkbox'}}
                checked={props.isDone}
                onChange={changeStatus}
            />
            <EditableSpan title={props.title} onChange={changeTitle}/>
            {/*  <button onClick={onClickHandler}> x</button>*/}
            <Button onClick={onClickHandler}>
                <Delete/>
            </Button>
        </div>
    )

}