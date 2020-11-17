import React, {useReducer, useState} from 'react';
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
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

function AppWithReducers() {

    const [filter, setfilter] = useState<FilterValueType>("all")

    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todoListID1, title: "What to learn", filter: 'all'},
        {id: todoListID2, title: "What to buy", filter: 'active'}

    ])
    const [tasks, dispatchToTaskReducer] = useReducer(tasksReducer,{
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},

        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Apple", isDone: false},
            {id: v1(), title: "Orange", isDone: false},
        ]
    })


    function addTask(title: string, todoListID: string) {
        dispatchToTaskReducer(addTaskAC(title,todoListID))
    }

    function removeTask(taskID: string, todoListID: string) {
        dispatchToTaskReducer(removeTaskAC(taskID, todoListID))
    }

    function removeTodoList(todoListID: string) {
        dispatchToTodolistsReducer(removeTodolistAC(todoListID))
        dispatchToTaskReducer(removeTodolistAC(todoListID))
          }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchToTaskReducer(changeTaskStatusAC(taskID,isDone,todoListID))
    }

    function changFilter(value: FilterValueType, todoListID: string) {
        dispatchToTodolistsReducer(ChangeTodolistFilterAC(todoListID,value))
    }

    function addTodolist(title: string) {
        const todoListID1 = v1()
        dispatchToTodolistsReducer(AddTodolistAC(title,todoListID1))
        dispatchToTaskReducer(AddTodolistAC(title,todoListID1))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatchToTaskReducer(changeTaskTitleAC(taskID,newTitle,todoListID))
    }

    function changeTodolistTitle(todoListID: string, newTitle: string) {
        dispatchToTodolistsReducer(ChangeTodolistTitleAC(todoListID,newTitle))
    }

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
                            let taskForTodoList = allTodoListTasks;
                            if (tl.filter === 'active') {
                                taskForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                taskForTodoList = allTodoListTasks.filter(t => t.isDone === true)
                            }

                            return (    <Grid item>
                                <Paper  elevation={3} style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodoList}
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

export default AppWithReducers;
