import React, { useState } from 'react';
import styles from './TaskForm.module.css';

const TaskForm = ({ onAddTask }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') {
            setError('Task description is required.');
            return;
        }
        setError('');

        const newTask = {
            text: text.trim(),
            priority,
            dueDate,
            completed: false, // Added 'completed' property
        };

        onAddTask(newTask);
        resetForm();
    };

    const resetForm = () => {
        setText('');
        setPriority('Medium');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.taskForm}>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.formGroup}>
                <label htmlFor="taskText" className={styles.label}>Task Description:</label>
                <input
                    type="text"
                    id="taskText"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter task description"
                    className={styles.inputField}
                    required // Added 'required' for validation
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="taskPriority" className={styles.label}>Priority:</label>
                <select
                    id="taskPriority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={styles.selectField}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="taskDueDate" className={styles.label}>Due Date:</label>
                <input
                    type="date"
                    id="taskDueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={styles.dateField}
                />
            </div>
            <button type="submit" className={styles.submitButton}>
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;