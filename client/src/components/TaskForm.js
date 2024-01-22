import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slices/taskSlice';
import apiService from '../services/api';
import './TaskForm.css';
import { Link } from 'react-router-dom';


const TaskForm = () => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = await apiService.createTask({ title: taskTitle });
      dispatch(addTask(newTask));
      setTaskTitle('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav>
        <Link to="/">Task List</Link>
      </nav>

    <div className="form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Add a task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Add Task
        </button>
      </form>
    </div>
    </div>
  );
};

export default TaskForm;