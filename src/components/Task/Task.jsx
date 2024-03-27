import React, { useState } from 'react'
import { useGroups } from '../../context/GroupsContext'

import Modal from '../UI/Modal'

const Task = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const { groups, setGroups, activeGroupId, setActiveGroupId } = useGroups()

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  };

  const handleCompleteTask = (e) => {
    e.stopPropagation(); 

    const updatedGroups = groups.map(group => {
      if (group.id === activeGroupId) {
        const updatedTasks = group.tasks.map(groupTask => {
          if (groupTask.id === task.id) {
            return { ...groupTask, completed: !groupTask.completed };
          }
          return groupTask;
        });
        return { ...group, tasks: updatedTasks };
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  const handleSaveChanges = () => {
    const updatedGroups = groups.map(group => {
      if (group.id === activeGroupId) {
        const updatedTasks = group.tasks.map(groupTask => {
          if (groupTask.id === task.id) {
            return { ...groupTask, title: editedTitle, description: editedDescription };
          }
          return groupTask;
        });
        return { ...group, tasks: updatedTasks };
      }
      return group;
    });
    setGroups(updatedGroups);
    toggleModal(); 
  };

  const handleDeleteTask = () => {
    const updatedGroups = groups.map(group => {
      if (group.id === activeGroupId) {
        const updatedTasks = group.tasks.filter(groupTask => groupTask.id !== task.id);
        return { ...group, tasks: updatedTasks };
      }
      return group;
    });
    setGroups(updatedGroups);
    toggleModal();
  };

  return (
    <li
      className={task.completed ? 'completed' : ''}
      onClick={toggleModal}>
      <h6>{task.title}</h6>
      <p>{task.description}</p>
      <button className='complete' onClick={handleCompleteTask} disabled={task.completed}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="23.75" height="23" rx="7.5" stroke="#FCA311" />
          <path d="M16.5898 7.845C16.6924 7.98563 16.75 8.17625 16.75 8.375C16.75 8.57375 16.6924 8.76437 16.5898 8.905L11.2948 16.155C11.1921 16.2955 11.0529 16.3743 10.9077 16.3743C10.7625 16.3743 10.6233 16.2955 10.5206 16.155L8.147 12.905C8.05029 12.7627 7.99763 12.5747 8.00008 12.3804C8.00253 12.1861 8.05991 12.0006 8.16014 11.863C8.26064 11.7258 8.39608 11.6472 8.538 11.6438C8.67992 11.6405 8.81726 11.7126 8.92116 11.845L10.9077 14.565L15.8156 7.845C15.9183 7.70455 16.0576 7.62566 16.2027 7.62566C16.3479 7.62566 16.4871 7.70455 16.5898 7.845Z" fill="white" />
        </svg>
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="task-details">
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
          />
          <textarea
            value={editedDescription}
            onChange={handleDescriptionChange}
          />
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={handleDeleteTask}>Delete</button>
          <button onClick={handleCompleteTask}>Complete</button>
        </div>
      </Modal>
    </li>
  )
}

export default Task