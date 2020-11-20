import React, {ChangeEvent, useCallback} from 'react';
import {FilterValueType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from './Task';

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

export const Todolist=React.memo((props: PropsType)=> {
    let taskForTodoList = props.tasks;
    if (props.filter === 'active') {
        taskForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        taskForTodoList = props.tasks.filter(t => t.isDone === true)
    }

    const onAllCliCkHandler = useCallback(() => {
        props.changFilter('all', props.id)
    },[ props.changFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changFilter('active', props.id)
    },[ props.changFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changFilter('completed', props.id)
    },[ props.changFilter, props.id])
    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    },[props.removeTodoList, props.id])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    },[props.addTask, props.id ])
    const changeTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    },[props.changeTodolistTitle,props.id])
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
                taskForTodoList.map(t => {
                    return <Task removeTask={props.removeTask}
                        changeStatus={props.changeStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        id={props.id}
                        taskId={t.id}
                        title={t.title}
                        isDone={t.isDone}  />
                   /* const onClickHandler = () => {
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
                            {/!*  <button onClick={onClickHandler}> x</button>*!/}
                            <Button onClick={onClickHandler}>
                                <Delete/>
                            </Button>
                        </div>
                    )*/
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
            <Button variant={props.filter === "completed" ? "contained" : "outlined"} color="primary"
                    className={props.filter === "completed" ? "active" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})
/*
type TaskPropsType ={
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    id: string
    taskId:string
    title:string
    isDone:boolean
}
const Task = (props:TaskPropsType)=>{

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
            {/!*  <button onClick={onClickHandler}> x</button>*!/}
            <Button onClick={onClickHandler}>
                <Delete/>
            </Button>
        </div>
    )

}*/
