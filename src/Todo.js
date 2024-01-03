import React, { useState } from 'react'
import './Todo.css'

export const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editV, setEditV] = useState('null');

    const addTodo = () => {
        if (input.trim() !== "") {
            const newTodo = {
                id: new Date().getTime(),
                text: input
            }

            setTodos([...todos, newTodo]);
            setInput('');
        }
    }

    const deleteTodo = (id) => {
        const updateTodo = todos.filter((todo) => todo.id !== id);
        setTodos(updateTodo);
    }

    const editTodo = (id, text) => {
        setEditMode(true);
        setEditId(id);
        setEditV(text);
    }

    const updateTodo = () => {
        const updatedTodo = todos.map((todo) => {
            if (todo.id === editId) {
                return { ...todo, text: editV };
            }
            return todo;
        })

        setTodos(updatedTodo);
        setEditMode(false);
        setEditId(null);
        setEditV('');
    }

    return (
        <div className='todo-container'>
            <h2>Todo List</h2>
            <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />

            {
                editMode ? (
                    <div>
                        <input type='text' value={editV} onChange={(e)=>
                            setEditV(e.target.value)
                        }/>
                        <button onClick={updateTodo}>Update</button>
                    </div>
                ):(
                    <button onClick={addTodo}>Add</button>
                )
            }
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <div>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        <button onClick={() => editTodo(todo.id, todo.text)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
