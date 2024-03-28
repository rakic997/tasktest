import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useGroups } from '../../context/GroupsContext'

import Task from './Task'
import AddItemInput from '../UI/AddItemInput';

const TasksList = () => {
  const [taskTitle, setTaskTitle] = useState('')
  
  const { groups, setGroups, activeGroupId } = useGroups()
  const activeGroup = groups.find(group => group.id === activeGroupId);

   const sortedTasks = activeGroup ? [...activeGroup.tasks].sort((a, b) => {
    return a.completed === b.completed ? 0 : a.completed ? 1 : -1
  }) : []

  const handleAddTask = () => {
    if (!activeGroup) {
      setError('No active group selected!')
      return
    }

    const newTask = {
      id: uuidv4(),
      title: taskTitle.trim(),
      completed: false
    }

    const updatedGroup = {
      ...activeGroup,
      tasks: [newTask, ...activeGroup.tasks, ]
    };

    const updatedGroups = groups.map(group => {
      return group.id === activeGroupId ? updatedGroup : group
    });

    setGroups(updatedGroups)
    setTaskTitle('')
  }

  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <h2>Tasks - {activeGroup?.title}</h2>
      </div>
      <div className='tasks-body'>
        <ul className='groups-body' role='list'>
          {sortedTasks?.map((task) => {
            return (
              <Task 
                task={task} 
                activeGroupTitle={activeGroup?.title}
                key={task.id}  
              />
            )
          })}
        </ul>
      </div>
      <div className='tasks-footer'>
        <AddItemInput
          placeholder='Add task...'
          className={'add-task-input'}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onClick={handleAddTask}
        />
      </div>
    </div>
  )
}

export default TasksList