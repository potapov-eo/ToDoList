(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{284:function(module,exports,__webpack_require__){__webpack_require__(285),__webpack_require__(457),module.exports=__webpack_require__(458)},359:function(module,exports){},458:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(282);module._StorybookPreserveDecorators=!0,Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(650)],module)}.call(this,__webpack_require__(459)(module))},650:function(module,exports,__webpack_require__){var map={"./todolists-api.stories.tsx":669};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=650},669:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"GetTodolists",(function(){return GetTodolists})),__webpack_require__.d(__webpack_exports__,"CreateTodolist",(function(){return CreateTodolist})),__webpack_require__.d(__webpack_exports__,"DeleteTodolist",(function(){return DeleteTodolist})),__webpack_require__.d(__webpack_exports__,"UpdateTodolistTitle",(function(){return UpdateTodolistTitle})),__webpack_require__.d(__webpack_exports__,"GetTasks",(function(){return GetTasks})),__webpack_require__.d(__webpack_exports__,"CreateTodolistTasks",(function(){return CreateTodolistTasks})),__webpack_require__.d(__webpack_exports__,"DeleteTodolistTasks",(function(){return DeleteTodolistTasks})),__webpack_require__.d(__webpack_exports__,"UpdateTaskTitle",(function(){return UpdateTaskTitle}));var TaskStatuses,TaskPriorities,slicedToArray=__webpack_require__(8),react=__webpack_require__(0),react_default=__webpack_require__.n(react),axios=__webpack_require__(283),axios_default=__webpack_require__.n(axios);!function(TaskStatuses){TaskStatuses[TaskStatuses.New=0]="New",TaskStatuses[TaskStatuses.InProgress=1]="InProgress",TaskStatuses[TaskStatuses.Completed=2]="Completed",TaskStatuses[TaskStatuses.Draft=3]="Draft"}(TaskStatuses||(TaskStatuses={})),function(TaskPriorities){TaskPriorities[TaskPriorities.Low=0]="Low",TaskPriorities[TaskPriorities.Middle=1]="Middle",TaskPriorities[TaskPriorities.Hi=2]="Hi",TaskPriorities[TaskPriorities.Urgently=3]="Urgently",TaskPriorities[TaskPriorities.Later=4]="Later"}(TaskPriorities||(TaskPriorities={}));var instance=axios_default.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"b3ca8020-1484-4395-b201-af81d226c6c0"}}),todolistAPI_GetTodolists=function GetTodolists(){return instance.get("todo-lists")},todolistAPI_updateTodoTitle=function updateTodoTitle(todolistId,title){return instance.put("todo-lists/".concat(todolistId),{title:title})},todolistAPI_CreateTodolist=function CreateTodolist(title){return instance.post("todo-lists",{title:title})},todolistAPI_DeleteTodolist=function DeleteTodolist(todolistId){return instance.delete("todo-lists/".concat(todolistId))},todolistAPI_GetTasks=function GetTasks(todolistId){return instance.get("todo-lists/".concat(todolistId,"/tasks"))},todolistAPI_CreateTodolistTasks=function CreateTodolistTasks(todolistId,title){return instance.post("todo-lists/".concat(todolistId,"/tasks"),{title:title})},todolistAPI_DeleteTodolistTasks=function DeleteTodolistTasks(todolistId,taskId){return instance.delete("todo-lists/".concat(todolistId,"/tasks/").concat(taskId))},todolistAPI_updateTask=function updateTask(todolistId,taskId,_updateTask){return instance.put("todo-lists/".concat(todolistId,"/tasks/").concat(taskId),_updateTask)},addSourceDecorator=(__webpack_require__(273).withSource,__webpack_require__(273).addSource),__SOURCE_PREFIX__="C:\\project\\ToDoList\\src\\stories",__STORY__='import React, {ChangeEvent, useState} from \'react\'\r\nimport {todolistAPI, TodoListType} from "../API/todolist-api";\r\n\r\n\r\nexport default {\r\n    title: \'API\'\r\n}\r\n\r\n\r\nexport const GetTodolists = () => {\r\n    const [state, setState] = useState<TodoListType[]>([])\r\n\r\n    const getTodo = () =>\r\n        todolistAPI.GetTodolists().then((res) => {\r\n            setState(res.data);\r\n        })\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        {state.map(td => {\r\n            return <div>{td.order} ---------------- {td.id}</div>\r\n        })\r\n        }\r\n        <button onClick={getTodo}>GET TODOs</button>\r\n    </>\r\n}\r\nexport const CreateTodolist = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [titleText, setTitleText] = useState<string>("")\r\n    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTitleText(e.currentTarget.value)\r\n    }\r\n    const CreateTodo = () => todolistAPI.CreateTodolist(titleText).then((res) => {\r\n        setState(res.data);\r\n    })\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={CreateTodo}>Create Todo</button>\r\n        <input value={titleText} onChange={onChangeTitle}/>\r\n    </>\r\n}\r\nexport const DeleteTodolist = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [todolistId, setTodolistId] = useState<string>("")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n\r\n    const DeleteTodo = () => todolistAPI.DeleteTodolist(todolistId).then((res) => {\r\n        setState(res.data);\r\n    })\r\n\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={DeleteTodo}>Delete Todo</button>\r\n        <input value={todolistId} onChange={onChangeTodolistId}/>\r\n    </>\r\n}\r\nexport const UpdateTodolistTitle = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [title, setTitle] = useState<string>("")\r\n    const onChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTitle(e.currentTarget.value)\r\n    }\r\n    const [todolistId, setTodolistId] = useState<string>("")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n    const ChangeTitle = () => todolistAPI.updateTodoTitle(todolistId, title)\r\n        .then((res) => {\r\n            setState(res.data)\r\n        })\r\n\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={ChangeTitle}>UPDATE TITLE</button>\r\n        <input value={title} onChange={onChangeTodolistTitle}/>title\r\n        <input value={todolistId} onChange={onChangeTodolistId}/>todolistId\r\n    </>\r\n}\r\nexport const GetTasks = () => {\r\n    const [state, setState] = useState<any>([])\r\n    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n    const getTodo = () =>\r\n        todolistAPI.GetTasks(todolistId).then((res) => {\r\n            setState(res.data.items);\r\n        })\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={getTodo}>GET TASKS</button>\r\n        <input value={todolistId} onChange={onChangeTodolistId}/>\r\n    </>\r\n}\r\nexport const CreateTodolistTasks = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [titleText, setTitleText] = useState<string>("")\r\n    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTitleText(e.currentTarget.value)\r\n    }\r\n    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n\r\n\r\n    const CreateTodo = () => todolistAPI.CreateTodolistTasks(todolistId, titleText).then((res) => {\r\n        setState(res.data);\r\n    })\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={CreateTodo}>Create TodoTasks</button>\r\n        <input value={titleText} onChange={onChangeTitle}/>\r\n        <input value={todolistId} onChange={onChangeTodolistId}/>\r\n    </>\r\n}\r\nexport const DeleteTodolistTasks = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n    const [taskId, setTaskId] = useState<string>("")\r\n    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTaskId(e.currentTarget.value)\r\n    }\r\n    const DeleteTodo = () => todolistAPI.DeleteTodolistTasks(todolistId, taskId).then((res) => {\r\n        setState(res.data);\r\n    })\r\n\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={DeleteTodo}>Delete Todo</button>\r\n        TODOLIST_ID<input value={todolistId} onChange={onChangeTodolistId}/>\r\n        <>TASK_ID<input value={taskId} onChange={onChangeTaskId}/></>\r\n    </>\r\n}\r\nexport const UpdateTaskTitle = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [title, setTitle] = useState<string>("")\r\n    const onChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTitle(e.currentTarget.value)\r\n    }\r\n    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n    const [taskId, setTaskId] = useState<string>("3f339ffb-aa37-4872-a7d2-a78a3cf3aa53")\r\n    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTaskId(e.currentTarget.value)\r\n    }\r\n    let newTask = {\r\n        title: title,\r\n        description: "",\r\n        completed: false,\r\n        status: 0,\r\n        priority: 0,\r\n        startDate: "2020-12-14T06:29:43.143",\r\n        deadline: "2020-12-14T06:29:43.143"\r\n    }\r\n\r\n    const ChangeTitle = () => todolistAPI.updateTask(todolistId, taskId, newTask)\r\n        .then((res) => {\r\n            setState(res.data)\r\n        })\r\n\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={ChangeTitle}>UPDATE TITLE</button>\r\n        <div> TITLE<input value={title} onChange={onChangeTodolistTitle}/></div>\r\n        <div> TODOLIST_ID<input value={todolistId} onChange={onChangeTodolistId}/></div>\r\n        <div>TASK_ID<input value={taskId} onChange={onChangeTaskId}/></div>\r\n    </>\r\n}',__ADDS_MAP__={"api--get-todolists":{startLoc:{col:28,line:10},endLoc:{col:1,line:25},startBody:{col:28,line:10},endBody:{col:1,line:25}},"api--create-todolist":{startLoc:{col:30,line:26},endLoc:{col:1,line:41},startBody:{col:30,line:26},endBody:{col:1,line:41}},"api--delete-todolist":{startLoc:{col:30,line:42},endLoc:{col:1,line:59},startBody:{col:30,line:42},endBody:{col:1,line:59}},"api--update-todolist-title":{startLoc:{col:35,line:60},endLoc:{col:1,line:82},startBody:{col:35,line:60},endBody:{col:1,line:82}},"api--get-tasks":{startLoc:{col:24,line:83},endLoc:{col:1,line:98},startBody:{col:24,line:83},endBody:{col:1,line:98}},"api--create-todolist-tasks":{startLoc:{col:35,line:99},endLoc:{col:1,line:121},startBody:{col:35,line:99},endBody:{col:1,line:121}},"api--delete-todolist-tasks":{startLoc:{col:35,line:122},endLoc:{col:1,line:143},startBody:{col:35,line:122},endBody:{col:1,line:143}},"api--update-task-title":{startLoc:{col:31,line:144},endLoc:{col:1,line:181},startBody:{col:31,line:144},endBody:{col:1,line:181}}},__MODULE_DEPENDENCIES__=[],__LOCAL_DEPENDENCIES__={},__IDS_TO_FRAMEWORKS__={},GetTodolists=(__webpack_exports__.default={parameters:{storySource:{source:'import React, {ChangeEvent, useState} from \'react\'\r\nimport {todolistAPI, TodoListType} from "../API/todolist-api";\r\n\r\n\r\nexport default {\r\n    title: \'API\'\r\n}\r\n\r\n\r\nexport const GetTodolists = () => {\r\n    const [state, setState] = useState<TodoListType[]>([])\r\n\r\n    const getTodo = () =>\r\n        todolistAPI.GetTodolists().then((res) => {\r\n            setState(res.data);\r\n        })\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        {state.map(td => {\r\n            return <div>{td.order} ---------------- {td.id}</div>\r\n        })\r\n        }\r\n        <button onClick={getTodo}>GET TODOs</button>\r\n    </>\r\n}\r\nexport const CreateTodolist = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [titleText, setTitleText] = useState<string>("")\r\n    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTitleText(e.currentTarget.value)\r\n    }\r\n    const CreateTodo = () => todolistAPI.CreateTodolist(titleText).then((res) => {\r\n        setState(res.data);\r\n    })\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={CreateTodo}>Create Todo</button>\r\n        <input value={titleText} onChange={onChangeTitle}/>\r\n    </>\r\n}\r\nexport const DeleteTodolist = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [todolistId, setTodolistId] = useState<string>("")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n\r\n    const DeleteTodo = () => todolistAPI.DeleteTodolist(todolistId).then((res) => {\r\n        setState(res.data);\r\n    })\r\n\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={DeleteTodo}>Delete Todo</button>\r\n        <input value={todolistId} onChange={onChangeTodolistId}/>\r\n    </>\r\n}\r\nexport const UpdateTodolistTitle = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [title, setTitle] = useState<string>("")\r\n    const onChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTitle(e.currentTarget.value)\r\n    }\r\n    const [todolistId, setTodolistId] = useState<string>("")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n    const ChangeTitle = () => todolistAPI.updateTodoTitle(todolistId, title)\r\n        .then((res) => {\r\n            setState(res.data)\r\n        })\r\n\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={ChangeTitle}>UPDATE TITLE</button>\r\n        <input value={title} onChange={onChangeTodolistTitle}/>title\r\n        <input value={todolistId} onChange={onChangeTodolistId}/>todolistId\r\n    </>\r\n}\r\nexport const GetTasks = () => {\r\n    const [state, setState] = useState<any>([])\r\n    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n    const getTodo = () =>\r\n        todolistAPI.GetTasks(todolistId).then((res) => {\r\n            setState(res.data.items);\r\n        })\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={getTodo}>GET TASKS</button>\r\n        <input value={todolistId} onChange={onChangeTodolistId}/>\r\n    </>\r\n}\r\nexport const CreateTodolistTasks = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [titleText, setTitleText] = useState<string>("")\r\n    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTitleText(e.currentTarget.value)\r\n    }\r\n    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n\r\n\r\n    const CreateTodo = () => todolistAPI.CreateTodolistTasks(todolistId, titleText).then((res) => {\r\n        setState(res.data);\r\n    })\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={CreateTodo}>Create TodoTasks</button>\r\n        <input value={titleText} onChange={onChangeTitle}/>\r\n        <input value={todolistId} onChange={onChangeTodolistId}/>\r\n    </>\r\n}\r\nexport const DeleteTodolistTasks = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n    const [taskId, setTaskId] = useState<string>("")\r\n    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTaskId(e.currentTarget.value)\r\n    }\r\n    const DeleteTodo = () => todolistAPI.DeleteTodolistTasks(todolistId, taskId).then((res) => {\r\n        setState(res.data);\r\n    })\r\n\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={DeleteTodo}>Delete Todo</button>\r\n        TODOLIST_ID<input value={todolistId} onChange={onChangeTodolistId}/>\r\n        <>TASK_ID<input value={taskId} onChange={onChangeTaskId}/></>\r\n    </>\r\n}\r\nexport const UpdateTaskTitle = () => {\r\n    const [state, setState] = useState<any>(null)\r\n    const [title, setTitle] = useState<string>("")\r\n    const onChangeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTitle(e.currentTarget.value)\r\n    }\r\n    const [todolistId, setTodolistId] = useState<string>("6d780f66-25c6-45e9-b603-606016195c54")\r\n    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTodolistId(e.currentTarget.value)\r\n    }\r\n    const [taskId, setTaskId] = useState<string>("3f339ffb-aa37-4872-a7d2-a78a3cf3aa53")\r\n    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {\r\n        setTaskId(e.currentTarget.value)\r\n    }\r\n    let newTask = {\r\n        title: title,\r\n        description: "",\r\n        completed: false,\r\n        status: 0,\r\n        priority: 0,\r\n        startDate: "2020-12-14T06:29:43.143",\r\n        deadline: "2020-12-14T06:29:43.143"\r\n    }\r\n\r\n    const ChangeTitle = () => todolistAPI.updateTask(todolistId, taskId, newTask)\r\n        .then((res) => {\r\n            setState(res.data)\r\n        })\r\n\r\n\r\n    return <>\r\n        <div> {JSON.stringify(state)}</div>\r\n        <button onClick={ChangeTitle}>UPDATE TITLE</button>\r\n        <div> TITLE<input value={title} onChange={onChangeTodolistTitle}/></div>\r\n        <div> TODOLIST_ID<input value={todolistId} onChange={onChangeTodolistId}/></div>\r\n        <div>TASK_ID<input value={taskId} onChange={onChangeTaskId}/></div>\r\n    </>\r\n}',locationsMap:{"api--get-todolists":{startLoc:{col:28,line:10},endLoc:{col:1,line:25},startBody:{col:28,line:10},endBody:{col:1,line:25}},"api--create-todolist":{startLoc:{col:30,line:26},endLoc:{col:1,line:41},startBody:{col:30,line:26},endBody:{col:1,line:41}},"api--delete-todolist":{startLoc:{col:30,line:42},endLoc:{col:1,line:59},startBody:{col:30,line:42},endBody:{col:1,line:59}},"api--update-todolist-title":{startLoc:{col:35,line:60},endLoc:{col:1,line:82},startBody:{col:35,line:60},endBody:{col:1,line:82}},"api--get-tasks":{startLoc:{col:24,line:83},endLoc:{col:1,line:98},startBody:{col:24,line:83},endBody:{col:1,line:98}},"api--create-todolist-tasks":{startLoc:{col:35,line:99},endLoc:{col:1,line:121},startBody:{col:35,line:99},endBody:{col:1,line:121}},"api--delete-todolist-tasks":{startLoc:{col:35,line:122},endLoc:{col:1,line:143},startBody:{col:35,line:122},endBody:{col:1,line:143}},"api--update-task-title":{startLoc:{col:31,line:144},endLoc:{col:1,line:181},startBody:{col:31,line:144},endBody:{col:1,line:181}}}}},title:"API"},addSourceDecorator((function(){var _useState=Object(react.useState)([]),_useState2=Object(slicedToArray.a)(_useState,2),state=_useState2[0],setState=_useState2[1];return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement("div",null," ",JSON.stringify(state)),state.map((function(td){return react_default.a.createElement("div",null,td.order," ---------------- ",td.id)})),react_default.a.createElement("button",{onClick:function getTodo(){return todolistAPI_GetTodolists().then((function(res){setState(res.data)}))}},"GET TODOs"))}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/todolists-api.stories.tsx",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__})),CreateTodolist=addSourceDecorator((function(){var _useState3=Object(react.useState)(null),_useState4=Object(slicedToArray.a)(_useState3,2),state=_useState4[0],setState=_useState4[1],_useState5=Object(react.useState)(""),_useState6=Object(slicedToArray.a)(_useState5,2),titleText=_useState6[0],setTitleText=_useState6[1];return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement("div",null," ",JSON.stringify(state)),react_default.a.createElement("button",{onClick:function CreateTodo(){return todolistAPI_CreateTodolist(titleText).then((function(res){setState(res.data)}))}},"Create Todo"),react_default.a.createElement("input",{value:titleText,onChange:function onChangeTitle(e){setTitleText(e.currentTarget.value)}}))}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/todolists-api.stories.tsx",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__}),DeleteTodolist=addSourceDecorator((function(){var _useState7=Object(react.useState)(null),_useState8=Object(slicedToArray.a)(_useState7,2),state=_useState8[0],setState=_useState8[1],_useState9=Object(react.useState)(""),_useState10=Object(slicedToArray.a)(_useState9,2),todolistId=_useState10[0],setTodolistId=_useState10[1];return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement("div",null," ",JSON.stringify(state)),react_default.a.createElement("button",{onClick:function DeleteTodo(){return todolistAPI_DeleteTodolist(todolistId).then((function(res){setState(res.data)}))}},"Delete Todo"),react_default.a.createElement("input",{value:todolistId,onChange:function onChangeTodolistId(e){setTodolistId(e.currentTarget.value)}}))}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/todolists-api.stories.tsx",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__}),UpdateTodolistTitle=addSourceDecorator((function(){var _useState11=Object(react.useState)(null),_useState12=Object(slicedToArray.a)(_useState11,2),state=_useState12[0],setState=_useState12[1],_useState13=Object(react.useState)(""),_useState14=Object(slicedToArray.a)(_useState13,2),title=_useState14[0],setTitle=_useState14[1],_useState15=Object(react.useState)(""),_useState16=Object(slicedToArray.a)(_useState15,2),todolistId=_useState16[0],setTodolistId=_useState16[1];return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement("div",null," ",JSON.stringify(state)),react_default.a.createElement("button",{onClick:function ChangeTitle(){return todolistAPI_updateTodoTitle(todolistId,title).then((function(res){setState(res.data)}))}},"UPDATE TITLE"),react_default.a.createElement("input",{value:title,onChange:function onChangeTodolistTitle(e){setTitle(e.currentTarget.value)}}),"title",react_default.a.createElement("input",{value:todolistId,onChange:function onChangeTodolistId(e){setTodolistId(e.currentTarget.value)}}),"todolistId")}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/todolists-api.stories.tsx",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__}),GetTasks=addSourceDecorator((function(){var _useState17=Object(react.useState)([]),_useState18=Object(slicedToArray.a)(_useState17,2),state=_useState18[0],setState=_useState18[1],_useState19=Object(react.useState)("6d780f66-25c6-45e9-b603-606016195c54"),_useState20=Object(slicedToArray.a)(_useState19,2),todolistId=_useState20[0],setTodolistId=_useState20[1];return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement("div",null," ",JSON.stringify(state)),react_default.a.createElement("button",{onClick:function getTodo(){return todolistAPI_GetTasks(todolistId).then((function(res){setState(res.data.items)}))}},"GET TASKS"),react_default.a.createElement("input",{value:todolistId,onChange:function onChangeTodolistId(e){setTodolistId(e.currentTarget.value)}}))}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/todolists-api.stories.tsx",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__}),CreateTodolistTasks=addSourceDecorator((function(){var _useState21=Object(react.useState)(null),_useState22=Object(slicedToArray.a)(_useState21,2),state=_useState22[0],setState=_useState22[1],_useState23=Object(react.useState)(""),_useState24=Object(slicedToArray.a)(_useState23,2),titleText=_useState24[0],setTitleText=_useState24[1],_useState25=Object(react.useState)("6d780f66-25c6-45e9-b603-606016195c54"),_useState26=Object(slicedToArray.a)(_useState25,2),todolistId=_useState26[0],setTodolistId=_useState26[1];return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement("div",null," ",JSON.stringify(state)),react_default.a.createElement("button",{onClick:function CreateTodo(){return todolistAPI_CreateTodolistTasks(todolistId,titleText).then((function(res){setState(res.data)}))}},"Create TodoTasks"),react_default.a.createElement("input",{value:titleText,onChange:function onChangeTitle(e){setTitleText(e.currentTarget.value)}}),react_default.a.createElement("input",{value:todolistId,onChange:function onChangeTodolistId(e){setTodolistId(e.currentTarget.value)}}))}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/todolists-api.stories.tsx",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__}),DeleteTodolistTasks=addSourceDecorator((function(){var _useState27=Object(react.useState)(null),_useState28=Object(slicedToArray.a)(_useState27,2),state=_useState28[0],setState=_useState28[1],_useState29=Object(react.useState)("6d780f66-25c6-45e9-b603-606016195c54"),_useState30=Object(slicedToArray.a)(_useState29,2),todolistId=_useState30[0],setTodolistId=_useState30[1],_useState31=Object(react.useState)(""),_useState32=Object(slicedToArray.a)(_useState31,2),taskId=_useState32[0],setTaskId=_useState32[1];return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement("div",null," ",JSON.stringify(state)),react_default.a.createElement("button",{onClick:function DeleteTodo(){return todolistAPI_DeleteTodolistTasks(todolistId,taskId).then((function(res){setState(res.data)}))}},"Delete Todo"),"TODOLIST_ID",react_default.a.createElement("input",{value:todolistId,onChange:function onChangeTodolistId(e){setTodolistId(e.currentTarget.value)}}),react_default.a.createElement(react_default.a.Fragment,null,"TASK_ID",react_default.a.createElement("input",{value:taskId,onChange:function onChangeTaskId(e){setTaskId(e.currentTarget.value)}})))}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/todolists-api.stories.tsx",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__}),UpdateTaskTitle=addSourceDecorator((function(){var _useState33=Object(react.useState)(null),_useState34=Object(slicedToArray.a)(_useState33,2),state=_useState34[0],setState=_useState34[1],_useState35=Object(react.useState)(""),_useState36=Object(slicedToArray.a)(_useState35,2),title=_useState36[0],setTitle=_useState36[1],_useState37=Object(react.useState)("6d780f66-25c6-45e9-b603-606016195c54"),_useState38=Object(slicedToArray.a)(_useState37,2),todolistId=_useState38[0],setTodolistId=_useState38[1],_useState39=Object(react.useState)("3f339ffb-aa37-4872-a7d2-a78a3cf3aa53"),_useState40=Object(slicedToArray.a)(_useState39,2),taskId=_useState40[0],setTaskId=_useState40[1],newTask={title:title,description:"",completed:!1,status:0,priority:0,startDate:"2020-12-14T06:29:43.143",deadline:"2020-12-14T06:29:43.143"};return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement("div",null," ",JSON.stringify(state)),react_default.a.createElement("button",{onClick:function ChangeTitle(){return todolistAPI_updateTask(todolistId,taskId,newTask).then((function(res){setState(res.data)}))}},"UPDATE TITLE"),react_default.a.createElement("div",null," TITLE",react_default.a.createElement("input",{value:title,onChange:function onChangeTodolistTitle(e){setTitle(e.currentTarget.value)}})),react_default.a.createElement("div",null," TODOLIST_ID",react_default.a.createElement("input",{value:todolistId,onChange:function onChangeTodolistId(e){setTodolistId(e.currentTarget.value)}})),react_default.a.createElement("div",null,"TASK_ID",react_default.a.createElement("input",{value:taskId,onChange:function onChangeTaskId(e){setTaskId(e.currentTarget.value)}})))}),{__STORY__:__STORY__,__ADDS_MAP__:__ADDS_MAP__,__MAIN_FILE_LOCATION__:"/todolists-api.stories.tsx",__MODULE_DEPENDENCIES__:__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__:__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__:__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__:__IDS_TO_FRAMEWORKS__})}},[[284,1,2]]]);
//# sourceMappingURL=main.1a16ff0a0d8836f9bfcd.bundle.js.map