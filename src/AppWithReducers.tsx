import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {FilterValuesType, todolistsReducer} from './state/todolists-reducer'
import {tasksReducer} from './state/tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from './API/todolist-api'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all",  addedDate: '',
            order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",  addedDate: '',
            order: 0}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: todolistId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        /*const action = removeTaskAC(id, todolistId);
        dispatchToTasks(action);*/
    }

    function addTask(title: string, todolistId: string) {
        /*const action = addTaskAC(title, todolistId);
        dispatchToTasks(action);*/
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        /*const action = changeTaskStatusAC(id, status, todolistId);
        dispatchToTasks(action);*/
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        /*const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatchToTasks(action);*/
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
       /* const action = changeTodolistFilterAC(todolistId, value);
        dispatchToTodolists(action);*/
    }

    function removeTodolist(id: string) {
       /* const action = removeTodolistAC(id);
        dispatchToTasks(action);
        dispatchToTodolists(action);*/
    }

    function changeTodolistTitle(id: string, title: string) {
       /* const action = changeTodolistTitleAC(id, title);
        dispatchToTodolists(action);*/
    }

    function addTodolist(title: string) {
        /*const action = addTodolistAC(title,"111");
        dispatchToTasks(action);
        dispatchToTodolists(action);*/
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
