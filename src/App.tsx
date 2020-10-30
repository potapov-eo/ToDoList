import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

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

export type FilterValueType = 'all' | 'active' | 'comleted'
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
type TaskSstateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const [filter, setfilter] = useState<FilterValueType>("all")

    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todoListID1, title: "What to learn", filter: 'all'},
        {id: todoListID2, title: "What to buy", filter: 'active'}

    ])
    const [tasks, setTasks] = useState<TaskSstateType>({
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

        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        const todolist = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todolist]
        setTasks({...tasks})
    }

    function removeTask(taskID: string, todoListID: string) {
        const todolist = tasks[todoListID]
        tasks[todoListID] = todolist.filter(t => t.id !== taskID)
        setTasks({...tasks})

    }

    function removeTodoList(todoListID: string) {
        let filteredTodoList = todolists.filter(tl => tl.id !== todoListID)
        setTodolists(filteredTodoList)
        let deletedTasks = delete tasks[todoListID]
        setTasks({...tasks})
        console.log(tasks)

    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todolist = tasks[todoListID]
        let newTodoList = todolist.map(task => {
            if (task.id === taskID) {
                return {...task, isDone: isDone}
            }
            return task
        })
        tasks[todoListID] = newTodoList
        setTasks({...tasks})
    }

    function changFilter(value: FilterValueType, todoListID: string) {
        const todolist = todolists.find(tl => tl.id === todoListID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])

        }
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const todolist = tasks[todoListID]
        let newTodoList = todolist.map(task => {
            if (task.id === taskID) {
                return {...task, title: newTitle}
            }
            return task
        })
        tasks[todoListID] = newTodoList
        setTasks({...tasks})
    }

    function changeTodolistTitle(todoListID: string, newTitle: string) {
        const todoList = todolists.find(t => t.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodolists([...todolists])
        }

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
                            if (tl.filter === 'comleted') {
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

export default App;
