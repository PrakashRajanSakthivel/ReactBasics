import React from "react"

export default function TodoItem(props) {
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={props.todo.isCompleted}
                onChange={() => console.log("Changed!")}
            />
            <p>{props.todo.itemName}</p>
        </div>
    )
}
