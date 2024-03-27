import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useGroups } from '../context/GroupsContext'

import Task from './Task'

const TasksList = () => {
  const [taskName, setTaskName] = useState('')
  const [error, setError] = useState('')
  const { activeGroup, setActiveGroup, groups, setGroups } = useGroups()

  const updateGroupTasks = (groups, activeGroupId, newTask) => {
    return groups.map(group => {
      if (group.id === activeGroupId) {
        return {
          ...group,
          tasks: [newTask, ...group.tasks]
        };
      }
      return group
    })
  }

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      setError('Task name cannot be empty!')
      return
    }

    if (!activeGroup) {
      setError('No active group selected!')
      return
    }

    const newTask = {
      id: uuidv4(),
      title: taskName.trim()
    }

    const updatedGroups = updateGroupTasks(groups, activeGroup.id, newTask)

    setGroups(updatedGroups)
    setTaskName('')
    setError('')

    // Need re-render of active group to render tasks
    setActiveGroup(activeGroup => ({
      ...activeGroup,
      tasks: [newTask, ...activeGroup.tasks]
    }))
  }

  console.log(groups)

  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <h2>Tasks - {activeGroup?.title}</h2>
      </div>
      <div className='tasks-body'>
        <ul className='groups-body'>
          {activeGroup?.tasks.map((task) => {
            return (
              <Task task={task} />
            )
          })}
        </ul>
      </div>
      <div className='tasks-footer'>
        <div className='add-task-input'>
          <input
            type='text'
            id='add-task'
            name='add-task'
            placeholder='Add task...'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button onClick={handleAddTask}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="23.75" height="23" rx="7.5" fill="#FCA311" />
              <rect x="0.5" y="0.5" width="23.75" height="23" rx="7.5" stroke="#FCA311" />
              <path d="M16.125 12.625H13V15.75C13 15.9158 12.9342 16.0747 12.8169 16.1919C12.6997 16.3092 12.5408 16.375 12.375 16.375C12.2092 16.375 12.0503 16.3092 11.9331 16.1919C11.8158 16.0747 11.75 15.9158 11.75 15.75V12.625H8.625C8.45924 12.625 8.30027 12.5592 8.18306 12.4419C8.06585 12.3247 8 12.1658 8 12C8 11.8342 8.06585 11.6753 8.18306 11.5581C8.30027 11.4408 8.45924 11.375 8.625 11.375H11.75V8.25C11.75 8.08424 11.8158 7.92527 11.9331 7.80806C12.0503 7.69085 12.2092 7.625 12.375 7.625C12.5408 7.625 12.6997 7.69085 12.8169 7.80806C12.9342 7.92527 13 8.08424 13 8.25V11.375H16.125C16.2908 11.375 16.4497 11.4408 16.5669 11.5581C16.6842 11.6753 16.75 11.8342 16.75 12C16.75 12.1658 16.6842 12.3247 16.5669 12.4419C16.4497 12.5592 16.2908 12.625 16.125 12.625Z" fill="white" />
            </svg>
          </button>
        </div>
        {error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  )
}

export default TasksList