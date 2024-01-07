import React, { useState, useEffect } from 'react';
import ListItem from './listItem';
import "../../css/task-list.css";

const TaskList = ({ usersData }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('timeAdded'); // 'timeAdded', 'priority', 'dueDate'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [priority, setPriority] = useState(2); // Default priority
  const [firstUpdate, setFirstUpdate] = useState(true);
  const getDefaultDueDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow
    return tomorrow.toISOString().substr(0, 10); // Format as YYYY-MM-DD
  };
  const [dueDate, setDueDate] = useState(getDefaultDueDate()); // Default due date
  useEffect(() => {
    loadTasksFromLocalStorage();
  }, [usersData]); // Load tasks when usersData changes (i.e., when a user logs in or out)

  useEffect(() => {
    if (!firstUpdate) {
      console.log("Task updated");
      saveTasksToLocalStorage();
    } else {
      setFirstUpdate(false);
    }
  }, [tasks]);

  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem(`tasks-${usersData.email}`); // Use user's email to distinguish tasks
    console.log(storedTasks);
    if (storedTasks) {
      const updatedTasks = JSON.parse(storedTasks);
      setTasks(updatedTasks);
    }
  };

  const saveTasksToLocalStorage = () => {
    console.log(`saving tasks to local storage`);
    localStorage.setItem(`tasks-${usersData.email}`, JSON.stringify(tasks)); // Use user's email to distinguish tasks
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([
        ...tasks,
        {
          text: taskInput,
          completed: false,
          timeAdded: Date.now(),
          dueDate: dueDate, // Set due date
          priority: priority, // Set priority
        },
      ]);
      setTaskInput('');
      // Reset priority and due date
      setPriority(2);
      setDueDate(getDefaultDueDate());
    }
  };

  const handleEditTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setEditingIndex(null);
    setTasks(updatedTasks);
  };

  const toggleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const filterTasks = (task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    }
    return true;
  };

  const sortTasks = (taskA, taskB) => {
    if (sortBy === 'timeAdded') {
      return sortOrder === 'asc' ? taskA.timeAdded - taskB.timeAdded : taskB.timeAdded - taskA.timeAdded;
    } else if (sortBy === 'priority') {
      // const priorityOrder = { 'high':3, 'medium': 2, 'low': 1 };
      return sortOrder === 'asc' ? taskA.priority - taskB.priority : taskB.priority - taskA.priority;
    } else if (sortBy === 'dueDate') {
      return sortOrder === 'asc' ? (taskA.dueDate || 0) - (taskB.dueDate || 0) : (taskB.dueDate || 0) - (taskA.dueDate || 0);
    }
    return 0;
  };

 

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <select value={priority} onChange={(e) =>{setPriority(parseInt(e.target.value))}}>
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={1}>Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filter-options">
        <label>
          Filter by:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="timeAdded">Time Added</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </label>
        <label>
          Sort Order:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <ul className="list-unstyled">
        {tasks
          .filter(filterTasks)
          .sort(sortTasks)
          .map((task, index) => (
            <li key={index}>
              <ListItem
                task={task}
                onEdit={(newText) => handleEditTask(index, newText)}
                onToggleComplete={() => toggleCompleteTask(index)}
                onDelete={() => deleteTask(index)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
