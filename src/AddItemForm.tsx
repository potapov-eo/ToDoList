import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Icon, IconButton, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {AddBox, TextFields} from "@material-ui/icons";
import AddBoxIcon from '@material-ui/icons/AddBox';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


type AddItemFormPropsType = {
    addItem: (title: string,) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
    const classes = useStyles();
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onPressHandler = ((e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    })
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else setError("Tittle is required")
    }

    return <div>
        {/*<input
            value={title} onChange={onChangeHandler}
            onKeyPress={onPressHandler}
            className={error ? "error" : ""}
        />*/}
        <TextField
            label={'Type value'}
            variant={"outlined"}
            value={title} onChange={onChangeHandler}
            onKeyPress={onPressHandler}
            error={!!error}
            helperText={error}
        />



        {/* <button onClick={addTask}>+</button>*/}

        <IconButton
            size="medium"
            color="primary"
            onClick={addTask}>
            <AddBox/>
        </IconButton>
       {/* {error && <div className={"error-message"}>{error}</div>}*/}
    </div>
}