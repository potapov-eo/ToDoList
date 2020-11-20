import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC, todoListID1, todoListID2,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch])

    const changFilter = useCallback((value: FilterValueType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(todoListID, value))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const todoListID1 = v1()
        dispatch(AddTodolistAC(title, todoListID1))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todoListID, newTitle))
    }, [dispatch])

    const classes = useStyles();
    return (

        <div className="App">
            <Container fixed>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>

                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodoListTasks = tasks[tl.id]

                            return (<Grid item>
                                    <Paper elevation={3} style={{padding: "10px"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={allTodoListTasks}
                                            removeTask={removeTask}
                                            changFilter={changFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            removeTodoList={removeTodoList}
                                            filter={tl.filter}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}/>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container>
        </div>

    );
}

export default AppWithRedux;
