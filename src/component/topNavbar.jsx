import React, { useState } from 'react';
import { FaSort, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../css/top-navbar.css";
import { logout } from './Authentication/authfunctions';

const TopNavbar = ({usersData, isLogged ,checkAuth}) => {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortOptionClick = (option) => {
    // Implement your sorting logic here
    console.log(`Sorting by ${option}`);
    // Close the sort options dropdown
    setShowSortOptions(false);
  };

  const handleAuthClick = () => {
    if (isLogged) {
      // Implement logout logic here
      logout();
      checkAuth();
      console.log("Logging out....");
    } else {
      // Navigate to the signup page if the user is not logged in
      navigate('/login');
    }
  };

  return (
    <nav className="top-navbar">
      <div className="left-icons">
        <span className="icon">
          <FaUser />
        </span>
        <span className="user-name">{(isLogged && usersData!=null)?usersData.name:"To Do List"}</span>
      </div>
      <div className="right-icons">
        <div className='icon'>
          <span onClick={()=>navigate("/")}>Home</span></div><br/>
        
        {/* <div className="icon-container" onMouseEnter={toggleSortOptions} onMouseLeave={toggleSortOptions}>
          <span className="icon">sort</span>
          {showSortOptions && (
            <div className="sort-popup">
              <div onClick={() => handleSortOptionClick('Time')}>Time</div>
              <div onClick={() => handleSortOptionClick('Done')}>Done</div>
              <div onClick={() => handleSortOptionClick('Undone')}>Undone</div>
              <div onClick={() => handleSortOptionClick('Alphabetical')}>Alphabetically</div>
            </div>
          )}
        </div> */}
        <button onClick={handleAuthClick} className="login-button">
          {isLogged ? "Logout" : "Login/Signup"}
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
