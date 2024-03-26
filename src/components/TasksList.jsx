import React from 'react'

import Task from './Task'

const initialTasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description 2', completed: false },
  { id: 3, title: 'Task 3', description: 'Description 3', completed: false },
]

const TasksList = () => {
  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <h2>Tasks - My List</h2>
      </div>
      <div className='tasks-body'>
        <ul className='groups-body'>
          {initialTasks.map((task) => {
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
          />
          <button>+</button>
        </div>
      </div>
    </div>
  )
}

export default TasksList