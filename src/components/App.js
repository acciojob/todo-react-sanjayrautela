import React, { useState } from "react";
import "./todo.css";

let id = 0;

function TodoApp() {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);

    const createNewTodo = () => {
        const found = tasks.some(task => task.title === inputValue);
        if (found) {
            alert("Already added the task");
        } else {
            setTasks([...tasks, { title: inputValue, id: ++id }]);
            setInputValue('');
        }
    }

    const addTodo = () => {
        if (editingTaskId) {
            const updatedTasks = tasks.map(task =>
                task.id === editingTaskId ? { ...task, title: inputValue } : task
            );
            setTasks(updatedTasks);
            setEditingTaskId(null);
            setInputValue('');
        } else {
            createNewTodo();
        }
    }

    const removeTask = (taskId) => {
        const remainingTasks = tasks.filter(task => task.id !== taskId);
        setTasks(remainingTasks);
    }

    const onEdit = (taskId) => {
        const { title } = tasks.find(task => task.id === taskId);
        setInputValue(title);
        setEditingTaskId(taskId);
    }

    return (
        <div style={{ margin: "20px" }}>
            <h2>To-Do List</h2>
            <div>
                <input
                    placeholder="Enter Todo"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={addTodo}>{editingTaskId ? 'Edit Todo' : 'Add Todo'}</button>
            </div>
            <ul className="tasks-list">
                {tasks.map((task) => (
                    <li key={task.id} className={`task ${task.id === editingTaskId ? 'active' : ''}`}>
                        <div>
                            <span>{task.id}</span>
                            <span>{task.title}</span>
                        </div>
                        <div>
                            <button onClick={() => onEdit(task.id)}>Edit</button>
                            <button onClick={() => removeTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
