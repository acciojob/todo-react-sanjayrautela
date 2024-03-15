import React, { useState } from "react";
import "./todo.css";

let id = 0;

function TodoApp() {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTodo = () => {
        if (inputValue.trim() !== '') { // Check if the input value is not empty
            setTasks([...tasks, { title: inputValue, id: ++id }]);
            setInputValue('');
        }
    }

    const removeTask = (taskId) => {
        const remainingTasks = tasks.filter(task => task.id !== taskId);
        setTasks(remainingTasks);
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
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul className="tasks-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task">
                        <div>
                            <span>{task.id}</span>
                            <span>{task.title}</span>
                        </div>
                        <div>
                            <button onClick={() => removeTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
