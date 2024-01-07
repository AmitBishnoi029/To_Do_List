import React from 'react';
import img from '../../imaegs/todolisticon.png'; 
import '../../css/DefaultPage.css';

const DefaultPage = () => {
  return (
    <div className="default-page-container">
      <div className="text-content">
        <h1>Welcome to Your To-Do List App</h1>
        <p>
          Keep track of your tasks, set priorities, and get things done with our
          simple and intuitive to-do list app.
        </p>
        <p>Sign in or sign up to start organizing your tasks.</p>
      </div>
      <div className="image-content">
        <img src={img} alt="To-Do List Icon" />
      </div>
    </div>
  );
};

export default DefaultPage;
