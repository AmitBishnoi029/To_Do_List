import React, { useState } from "react";
import "../../css/list-item.css";

const ListItem = ({ task, onEdit, onToggleComplete, onDelete }) => {
  const [toggle, setToggle] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditClick = () => {
    if (editedText.trim() !== "") {
      onEdit(editedText);
    }
    setToggle(false);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const getPriorityColor = () => {
    
    switch (task.priority) {
      case 1:
        return "green";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "#062e5e"; 
    }
  };

  return (
    <div className="list-item" style={{ backgroundColor: getPriorityColor() }}>
      <input
        type="checkbox"
        className="list-item-checkbox"
        style={{ position: "static" }}
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />

      <div>
        {toggle ? (
          <input
            type="text"
            id="editText"
            value={editedText}
            onChange={handleTextChange}
          />
        ) : (
          <div>
            <span className={`task-text ${task.completed ? "completed" : ""}`}>
              {task.text}
            </span>
            <span className="due-date">Due: {task.dueDate}</span>
          </div>
        )}
        
      </div>
      
      <div className="actions">
        {toggle ? (
          <button className="edit-button" onClick={handleEditClick}>
            Set
          </button>
        ) : (
          <button className="edit-button" onClick={changeToggle}>
            Edit
          </button>
        )}
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
