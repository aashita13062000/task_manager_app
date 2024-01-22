import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask } from '../redux/slices/taskSlice';
import apiService from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await apiService.getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = async (taskId) => {
    const updatedTaskTitle = prompt('Enter the updated task:');

    if (updatedTaskTitle !== null) {
      try {
        await apiService.updateTask(taskId, { title: updatedTaskTitle });
        const updatedTasks = await apiService.getTasks();
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiService.deleteTask(taskId);
        const updatedTasks = await apiService.getTasks();
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);

    const sortedTasks = [...tasks].sort((a, b) =>
      newOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

    setTasks(sortedTasks);
  };

  const handleCheckboxChange = (taskId) => {
    const updatedCompletedTasks = completedTasks.includes(taskId)
      ? completedTasks.filter((id) => id !== taskId)
      : [...completedTasks, taskId];

    setCompletedTasks(updatedCompletedTasks);
  };

  const handleFilter = () => {
    setShowCompleted(!showCompleted);
  };

  const handleAdd = () => {
    navigate('/add');
  };

  const filteredTasks = showCompleted ? tasks.filter((task) => completedTasks.includes(task._id)) : tasks;

  return (
    <div className="task-list-container">
      <div className="header-container">
        <h1>Task List</h1>
        <div className="icon-container">
          <FontAwesomeIcon icon={sortOrder === 'asc' ? faSort : faSortDown} className="sort-icon" onClick={handleSort} />
          <FontAwesomeIcon
            icon={faFilter}
            className={`filter-icon ${showCompleted ? 'active' : ''}`}
            onClick={handleFilter}
          />
        </div>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th className="task-data-header">
              Task
              <FontAwesomeIcon icon={faPlus} className="add-icon" onClick={handleAdd} />
            </th>
            <th className="edit-header">Edit</th>
            <th className="delete-header">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td className={`task-data ${completedTasks.includes(task._id) ? 'completed-task' : ''}`}>
                <input
                  type="checkbox"
                  checked={completedTasks.includes(task._id)}
                  onChange={() => handleCheckboxChange(task._id)}
                />
                {task.title}
              </td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(task._id)}>
                  Edit
                </button>
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(task._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;