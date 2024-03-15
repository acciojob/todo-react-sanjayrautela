import { useState } from "react";
import "./todo.css";

let id = 0;

// tasks = [ {title: "Coding", id: 1} ]

function TodoApp() {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);

    const createNewTodo = () => {
        let found = false;
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            if (task === inputValue) {
                alert("Already added the task")
                found = true;
                break;
            }
        }
        if (!found) {
            setTasks([...tasks, { title: inputValue, id: ++id }]);
            setInputValue('');
        }
    }

    const addTodo = () => {
        if (editingTaskId) {
            // edit the respective task
            tasks.forEach(task => {
                if (task.id === editingTaskId) {
                    task.title = inputValue;
                }
            });

            setTasks([...tasks]);
            setEditingTaskId(null);
            setInputValue('');
        }
        else createNewTodo();
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
                {
                    tasks.map((task) => {
                        return (
                            <li className={`task ${task.id === editingTaskId ? 'active' : ''}`}>
                                <div>
                                    <span>{task.id}</span>
                                    <span>{task.title}</span>
                                </div>
                                <div>
                                    <button onClick={() => onEdit(task.id)}>Edit</button>
                                    <button onClick={() => removeTask(task.id)}>Delete</button>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default TodoApp;