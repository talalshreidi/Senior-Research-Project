import React, {useEffect, useState} from 'react';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import Filters from './components/Filters.jsx';
import styles from './styles/App.module.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');


    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    const addTask = (newTask) => {
        setTasks([...tasks, {...newTask, id: crypto.randomUUID()}]);
    };


    const updateTask = (id, updatedTask) => {
        setTasks(tasks.map(task => (task.id === id ? {...task, ...updatedTask} : task)));
    };


    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };


    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        ));
    };


    const getFilteredTasks = () => {
        let filteredTasks = tasks;

        switch (filter) {

            case 'highPriority':
                filteredTasks = filteredTasks.filter(task => task.priority === 'High');
                break;
            case 'mediumPriority':
                filteredTasks = filteredTasks.filter(task => task.priority === 'Medium');
                break;
            case 'lowPriority':
                filteredTasks = filteredTasks.filter(task => task.priority === 'Low');
                break;
            case 'overdue':
                filteredTasks = filteredTasks.filter(task => {
                    const dueDate = new Date(task.dueDate);
                    return dueDate < new Date() && task.dueDate !== '';
                });
                break;
            default:
                filteredTasks = tasks;
        }
        return filteredTasks;
    };


    return (
        <>
            <div className={styles.appContainer}>  {/* Use styles.appContainer */}
                <h1 className={styles.appTitle}>Senior Research To-Do List</h1> {/* Use styles.appTitle */}
                <h2 className={styles.appTitle}>By Talal Shreidi</h2>
                <TaskForm onAddTask={addTask}/>
                <Filters onFilterChange={setFilter} filter={filter}/>
                <TaskList
                    tasks={getFilteredTasks()}
                    onDeleteTask={deleteTask}
                    onToggleTaskCompletion={toggleTaskCompletion}
                    onUpdateTask={updateTask}
                />
                <footer style={{textAlign: 'center', padding: '1rem', background: '#f1f1f1', marginTop: '1rem'}}>
                    © {new Date().getFullYear()} <span style={{fontWeight: 'bold'}}>CSC 450 Senior Research</span>. All Rights
                    Reserved.
                </footer>
            </div>

        </>
    );
}


export default App;