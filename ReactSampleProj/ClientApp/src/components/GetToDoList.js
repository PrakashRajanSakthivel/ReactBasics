import React, { Component } from "react"
//import TodoItem from "./TodoItem"
import "./style.css"

export class GetToDoList extends Component {
    displayName = GetToDoList.name

    constructor(props) {
        super(props)
        this.state = {
            todoList: [],
            loading: true
        }
        this.handleChange = this.handleChange.bind(this)

        fetch('api/SampleData/Gettodolist')
            .then(response => response.json())
            .then(data => {
                this.setState({ todoList: data, loading: false });
            });
    }

    static TodoItem(todo, hcfunc) {
        return (
            <div className="todo-item" key={todo.id}>
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => hcfunc(todo.id)}
                />
                <p className={todo.isCompleted ? "todo-item-crossed" : null}>{todo.itemName}</p>
            </div>
        )
    }

    handleChange(id) {
        this.setState(prevState => {
            const updatedTodo = prevState.todoList.map(todo => {
                if (todo.id === id) {
                    todo.isCompleted = !todo.isCompleted
                }
                return todo
            })

            return { todoList: updatedTodo }
        })
    }

    render() {
        const todoitems = this.state.todoList.map(todo =>
            GetToDoList.TodoItem(todo, this.handleChange)
        )
        return (
            <div className="todo-list">
                {todoitems}
            </div>
        )
    }
}