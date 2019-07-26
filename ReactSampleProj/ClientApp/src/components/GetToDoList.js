import React, { Component } from "react"
//import TodoItem from "./TodoItem"
import "./style.css"
import TodoItem from "./TodoItem";

export class GetToDoList extends Component {
    displayName = GetToDoList.name

    constructor(props) {
        super(props)
        this.state = {
            todoList: [],
            loading: true,
            button_text: 'select all'
        }
        this.handleChange = this.handleChange.bind(this)
        this.ToggleSelect = this.ToggleSelect.bind(this)

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

    ToggleSelect(txt_val) {
        this.setState(prevState => {
            console.log(prevState.button_text)
            const flag = prevState.button_text === "select all" ? true : false
            const selectalltodo = prevState.todoList.map(todo => {
                todo.isCompleted = flag
                return todo
            })
            const texxxt = txt_val === "select all" ? "de-select all" : "select all"
            return { todoList: selectalltodo, button_text: texxxt }
        })
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
            <div>
                <div className="todo-list">
                    <div className="btn-div-cls">
                        <button class="btn btn-default" onClick={() => this.ToggleSelect(this.state.button_text)}>{this.state.button_text}</button>
                    </div>
                    {todoitems}
                </div>
               
            </div>
        )
    }
}