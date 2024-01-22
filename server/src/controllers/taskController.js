const Task = require('../models/Task');

const taskController = {
  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createTask: async (req, res) => {
    try {
      const newTask = await Task.create(req.body);
      res.json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  
  updateTask: async (req, res) => {
    const taskId = req.params.id;

    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
      res.json(updatedTask);
    } catch (error) {
      console.error(`Error updating task with ID ${taskId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  deleteTask: async (req, res) => {
    const taskId = req.params.id;

    try {
      await Task.findByIdAndDelete(taskId);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = taskController;