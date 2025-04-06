import React from 'react';
import styles from './Filters.module.css';

const Filters = ({onFilterChange, filter}) => {
    return (
        <div className={styles.filters}>
            <button
                onClick={() => onFilterChange('all')}
                className={filter === 'all' ? styles.active : ''}
            >
                All
            </button>
            <button
                onClick={() => onFilterChange('active')}
                className={filter === 'active' ? styles.active : ''}
            >
                Active
            </button>
            <button
                onClick={() => onFilterChange('completed')}
                className={filter === 'completed' ? styles.active : ''}
            >
                Completed
            </button>
            <button
                onClick={() => onFilterChange('highPriority')}
                className={filter === 'highPriority' ? styles.active : ''}
            >
                High Priority
            </button>
            <button
                onClick={() => onFilterChange('mediumPriority')}
                className={filter === 'mediumPriority' ? styles.active : ''}
            >
                Medium Priority
            </button>
            <button
                onClick={() => onFilterChange('lowPriority')}
                className={filter === 'lowPriority' ? styles.active : ''}
            >
                Low Priority
            </button>
            <button
                onClick={() => onFilterChange('overdue')}
                className={filter === 'overdue' ? styles.active : ''}
            >
                Overdue
            </button>
        </div>
    );
};

export default Filters;