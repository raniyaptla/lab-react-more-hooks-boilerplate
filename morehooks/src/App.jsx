import React, { useReducer, useRef } from 'react';
import './App.css'
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADDTASK':
      return [...state, { id: Date.now(), text: action.payload, isHidden: false }];
    case 'TOGGLETASK':
      return state.map((task) =>
        task.id === action.payload ? { ...task, isHidden: !task.isHidden } : task
      );
    default:
      return state;
  }
};

const TaskList = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const ref = useRef(); 

  const addTask = (text) => {
    dispatch({ type: 'ADDTASK', payload: text });
  };

  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLETASK', payload: id });
  };

  function focus() {
    ref.current.focus();
  }

  return (
    <div class='container'>
      <h1>Task List</h1>
      <input
        ref={ref}
        type="text"
        placeholder="Add a new task"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.isHidden ? 'Task Hidden' : task.text}
            <button onClick={() => toggleTask(task.id)}>Toggle</button>
          </li>
        ))}
      </ul>

      <button onClick={focus}>Get back writing</button>
    </div>
  );
};

export default TaskList;
