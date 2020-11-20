import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange:(newTitle:string)=>void
}

export const EditableSpan=React.memo((props: EditableSpanPropsType)=> {
   let[editMode, seteditMode]=useState <boolean>(false)
    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState<string >("")
    const activateEditMode = () => {
       seteditMode(true)
        setTitle(props.title)}
    const activateViewMode = () => {
       if (title.trim() !== ""){seteditMode(false)
        props.onChange(title)}else
           setError("Tittle is required")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onPressHandler = ((e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            if (title.trim() !== "") {activateViewMode()}else
                setError("Tittle is required")
        }
    })
    return editMode
        ?  <TextField
            autoFocus
            onBlur={activateViewMode}
            value={title} onChange={onChangeHandler}
            onKeyPress={onPressHandler}
            error={!!error }
            helperText={error}
        />
        :<span onDoubleClick={activateEditMode}>{props.title}</span>
})