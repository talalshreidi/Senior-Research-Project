import React, {useState} from 'react';
import styles from './TaskList.module.css';

const TaskList = ({tasks, onDeleteTask, onToggleTaskCompletion, onUpdateTask}) => {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskText, setEditTaskText] = useState('');
    const [hoveredTaskId, setHoveredTaskId] = useState(null);

    const handleEditClick = (task) => {
        setEditTaskId(task.id);
        setEditTaskText(task.text);
    };

    const handleEditSave = (id) => {
        if (editTaskText.trim()) {
            onUpdateTask(id, {text: editTaskText.trim()});
            setEditTaskId(null);
        }
    };

    const handleCancelEdit = () => {
        setEditTaskId(null);
        setEditTaskText('');
    };

    const getTaskClassName = (task) => {
        const priorityClass =
            task.priority === 'High' ? styles['high-priority'] :
                task.priority === 'Medium' ? styles['medium-priority'] :
                    task.priority === 'Low' ? styles['low-priority'] : '';

        return `${styles.taskItem} ${task.completed ? styles.completed : ''} ${priorityClass}`;
    };

    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'short', day: 'numeric'};
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const formattedDate = date.toLocaleDateString(undefined, options);

        const currentDate = new Date();
        const isOverdue = date < currentDate && dateString !== '';

        return (
            <span style={{color: isOverdue ? 'red' : 'inherit'}}>
                {formattedDate}
            </span>
        );
    };

    return (
        <ul className={styles.taskList}>
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className={getTaskClassName(task)}
                    onMouseEnter={() => setHoveredTaskId(task.id)}
                    onMouseLeave={() => setHoveredTaskId(null)}
                >
                    <div className={styles.taskContent}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleTaskCompletion(task.id)}
                            className={styles.taskCheckbox}
                        />
                        {editTaskId === task.id ? (
                            <div className={styles.editInputWrapper}>
                                <input
                                    type="text"
                                    value={editTaskText}
                                    onChange={(e) => setEditTaskText(e.target.value)}
                                    onBlur={() => handleEditSave(task.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleEditSave(task.id);
                                        else if (e.key === 'Escape') handleCancelEdit();
                                    }}
                                    className={styles.taskInput}
                                    autoFocus
                                />
                                <button
                                    onClick={() => handleEditSave(task.id)}
                                    className={styles.saveButton}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <span
                                onDoubleClick={() => handleEditClick(task)}
                                title="Double-click to edit"
                                className={styles.taskText}
                            >
                                {task.text}
                            </span>
                        )}
                        {task.dueDate && (
                            <span className={styles.dueDate}>
                                Due: <strong>{formatDate(task.dueDate)}</strong>
                            </span>
                        )}
                    </div>
                    <div
                        className={`${styles.taskActions} ${
                            hoveredTaskId === task.id ? styles.actionsVisible : ''
                        }`}
                    >
                        <button
                            onClick={() => handleEditClick(task)}
                            className={styles.editButton}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteTask(task.id)}
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;