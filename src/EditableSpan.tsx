import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(newTitle:string)=>void
}

export function EditableSpan(props: EditableSpanPropsType) {
   let[editMode, seteditMode]=useState <boolean>(false)
    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState<string >("")
    const activateEditMode = () => {
       seteditMode(true)
        setTitle(props.title)}
    const activateViewMode = () => {
       seteditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onPressHandler = ((e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
           /* props.addTask(title)*/
            activateViewMode()
        }
    })
    return editMode
        ?  <input
            autoFocus
            onBlur={activateViewMode}
            value={title} onChange={onChangeHandler}
            onKeyPress={onPressHandler}
            className={error ? "error" : ""}
        />
        :<span onDoubleClick={activateEditMode}>{props.title}---</span>
}