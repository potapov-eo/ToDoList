import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string, ) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
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
        <input
            value={title} onChange={onChangeHandler}
            onKeyPress={onPressHandler}
            className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}