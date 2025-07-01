import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const created = await taskService.createTask({ title: newTask });
      setTasks([created, ...tasks]);
      setNewTask('');
      setError('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
      <form onSubmit={handleAddTask} className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : tasks.length === 0 ? (
        <div>No tasks found.</div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="flex items-center justify-between border-b py-2">
              <span>{task.title}</span>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager; 