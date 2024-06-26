import React, { useState } from 'react'
import './task.scss'
import { useGroups } from '../../context/GroupsContext'

import Modal from '../UI/Modal'

const Task = ({ task, activeGroupTitle }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const { groups, setGroups, activeGroupId } = useGroups()

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleDeleteTask = () => {
    setShowConfirmation(true)
  };

  const confirmDeleteTask = () => {
    const updatedGroups = groups.map(group => {
      if (group.id === activeGroupId) {
        const updatedTasks = group.tasks.filter(groupTask => groupTask.id !== task.id)
        return { ...group, tasks: updatedTasks }
      }
      return group
    })
    setGroups(updatedGroups)
    toggleModal()
  }

  const handleCompleteTask = (e) => {
    e.stopPropagation()

    const updatedGroups = groups.map(group => {
      if (group.id === activeGroupId) {
        const updatedTasks = group.tasks.map(groupTask => {
          if (groupTask.id === task.id) {
            return { ...groupTask, completed: true }
          }
          return groupTask
        });
        return { ...group, tasks: updatedTasks }
      }
      return group
    });
    setGroups(updatedGroups)
    setIsOpen(false)
  }

  const handleSaveChanges = () => {
    const updatedGroups = groups.map(group => {
      if (group.id === activeGroupId) {
        const updatedTasks = group.tasks.map(groupTask => {
          if (groupTask.id === task.id) {
            return { ...groupTask, title: editedTitle, description: editedDescription }
          }
          return groupTask;
        });
        return { ...group, tasks: updatedTasks }
      }
      return group
    });
    setGroups(updatedGroups)
    toggleModal()
  }

  return (
    <li
      className={task.completed ? 'task completed' : 'task'}
      onClick={toggleModal}>
      <h6>{task.title}</h6>
      <button className='complete' onClick={handleCompleteTask} disabled={task.completed}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="23.75" height="23" rx="7.5" stroke="#FCA311" />
          <path d="M16.5898 7.845C16.6924 7.98563 16.75 8.17625 16.75 8.375C16.75 8.57375 16.6924 8.76437 16.5898 8.905L11.2948 16.155C11.1921 16.2955 11.0529 16.3743 10.9077 16.3743C10.7625 16.3743 10.6233 16.2955 10.5206 16.155L8.147 12.905C8.05029 12.7627 7.99763 12.5747 8.00008 12.3804C8.00253 12.1861 8.05991 12.0006 8.16014 11.863C8.26064 11.7258 8.39608 11.6472 8.538 11.6438C8.67992 11.6405 8.81726 11.7126 8.92116 11.845L10.9077 14.565L15.8156 7.845C15.9183 7.70455 16.0576 7.62566 16.2027 7.62566C16.3479 7.62566 16.4871 7.70455 16.5898 7.845Z" fill="white" />
        </svg>
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="task-details">
          <div className='task-details-header'>
            <h6>{activeGroupTitle}</h6>
            <div className='button-group'>
              <button onClick={handleDeleteTask}>
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="27" height="23" rx="7.5" fill="#C71111" />
                  <rect x="0.5" y="0.5" width="27" height="23" rx="7.5" stroke="#C71111" />
                  <path d="M19.5 7H16.5V6.25C16.5 5.91848 16.3683 5.60054 16.1339 5.36612C15.8995 5.1317 15.5815 5 15.25 5H12.75C12.4185 5 12.1005 5.1317 11.8661 5.36612C11.6317 5.60054 11.5 5.91848 11.5 6.25V7H8.5C8.36739 7 8.24021 7.05268 8.14645 7.14645C8.05268 7.24021 8 7.36739 8 7.5C8 7.63261 8.05268 7.75979 8.14645 7.85355C8.24021 7.94732 8.36739 8 8.5 8H9.03125L9.625 17.5288C9.66937 18.3678 10.3125 19 11.125 19H16.875C17.6916 19 18.3219 18.3819 18.375 17.5312L18.9688 8H19.5C19.6326 8 19.7598 7.94732 19.8536 7.85355C19.9473 7.75979 20 7.63261 20 7.5C20 7.36739 19.9473 7.24021 19.8536 7.14645C19.7598 7.05268 19.6326 7 19.5 7ZM12.0178 17H12C11.8704 17.0001 11.7459 16.9499 11.6526 16.8599C11.5593 16.77 11.5046 16.6473 11.5 16.5178L11.25 9.51781C11.2453 9.3852 11.2934 9.25615 11.3839 9.15904C11.4743 9.06193 11.5996 9.00472 11.7322 9C11.8648 8.99528 11.9938 9.04342 12.091 9.13385C12.1881 9.22428 12.2453 9.34958 12.25 9.48219L12.5 16.4822C12.5024 16.5479 12.4918 16.6134 12.4688 16.6749C12.4459 16.7365 12.411 16.793 12.3662 16.841C12.3215 16.8891 12.2676 16.9279 12.2079 16.9552C12.1481 16.9825 12.0835 16.9977 12.0178 17ZM14.5 16.5C14.5 16.6326 14.4473 16.7598 14.3536 16.8536C14.2598 16.9473 14.1326 17 14 17C13.8674 17 13.7402 16.9473 13.6464 16.8536C13.5527 16.7598 13.5 16.6326 13.5 16.5V9.5C13.5 9.36739 13.5527 9.24021 13.6464 9.14645C13.7402 9.05268 13.8674 9 14 9C14.1326 9 14.2598 9.05268 14.3536 9.14645C14.4473 9.24021 14.5 9.36739 14.5 9.5V16.5ZM15.5 7H12.5V6.25C12.4996 6.21706 12.5058 6.18439 12.5183 6.15388C12.5307 6.12338 12.5491 6.09567 12.5724 6.07238C12.5957 6.04909 12.6234 6.03069 12.6539 6.01826C12.6844 6.00583 12.7171 5.99962 12.75 6H15.25C15.2829 5.99962 15.3156 6.00583 15.3461 6.01826C15.3766 6.03069 15.4043 6.04909 15.4276 6.07238C15.4509 6.09567 15.4693 6.12338 15.4817 6.15388C15.4942 6.18439 15.5004 6.21706 15.5 6.25V7ZM16.5 16.5178C16.4954 16.6473 16.4407 16.77 16.3474 16.8599C16.2541 16.9499 16.1296 17.0001 16 17H15.9819C15.9162 16.9977 15.8517 16.9824 15.7919 16.9551C15.7322 16.9278 15.6784 16.889 15.6336 16.8409C15.5889 16.7929 15.5541 16.7364 15.5311 16.6749C15.5082 16.6133 15.4976 16.5478 15.5 16.4822L15.75 9.48219C15.7523 9.41653 15.7676 9.35197 15.7949 9.2922C15.8222 9.23243 15.861 9.17863 15.909 9.13385C15.9571 9.08908 16.0136 9.05421 16.0751 9.03124C16.1367 9.00828 16.2022 8.99766 16.2678 9C16.3335 9.00234 16.398 9.01759 16.4578 9.04488C16.5176 9.07217 16.5714 9.11096 16.6161 9.15904C16.6609 9.20713 16.6958 9.26356 16.7188 9.32511C16.7417 9.38667 16.7523 9.45215 16.75 9.51781L16.5 16.5178Z" fill="white" />
                </svg>
              </button>
              <button onClick={handleCompleteTask} disabled={task.completed}>
                <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.58981 0.845011C8.69238 0.985637 8.75 1.17626 8.75 1.37501C8.75 1.57376 8.69238 1.76439 8.58981 1.90501L3.29479 9.15501C3.19209 9.29546 3.05286 9.37435 2.90771 9.37435C2.76255 9.37435 2.62333 9.29546 2.52062 9.15501L0.146995 5.90501C0.0502909 5.76275 -0.00236966 5.5747 8.19128e-05 5.38038C0.00253349 5.18606 0.0599062 5.00061 0.160141 4.86301C0.260639 4.72577 0.396082 4.64721 0.538001 4.64386C0.67992 4.6405 0.817263 4.7126 0.921163 4.84501L2.90771 7.56501L7.81564 0.845011C7.91834 0.704561 8.05756 0.625671 8.20272 0.625671C8.34788 0.625671 8.4871 0.704561 8.58981 0.845011Z" fill="white" />
                </svg>
                <span>Complete</span>
              </button>
            </div>
          </div>
          <div className='task-details-body'>
            <input
              type='text'
              value={editedTitle}
              onChange={handleTitleChange}
            />
            <label>Description</label>
            <textarea
              value={editedDescription}
              onChange={handleDescriptionChange}
            />
            <button className='save-button' onClick={handleSaveChanges}>Save Changes</button>

            {showConfirmation && (
              <div className='confirmation'>
                <p>Are you sure you want to delete task?</p>
                <div className='button-group'>
                  <button onClick={confirmDeleteTask}>Delete</button>
                  <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </li>
  )
}

export default Task