import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType= 'all' | 'active' | 'comleted'

function App() {
       let[tasks,setTasks] = useState<Array<TaskType>>(
      [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Redux", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
    ]
       );
    function removeTask(taskID:string) {
        const filteredTask = tasks.filter(t => t.id !==taskID );
        setTasks(filteredTask);
    }
    function changFilter(value:FilterValueType){
        setfilter(value)
    }

    const [filter, setfilter] = useState<FilterValueType>("all")

    let taskForTodoList = tasks;
    if(filter === 'active'){
        taskForTodoList = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'comleted'){
        taskForTodoList = tasks.filter(t => t.isDone === true)
    }



    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changFilter={changFilter}
            />

        </div>
    );
}

export default App;
