import React from 'react'

const Task = ({ task }) => {
  return (
    <li key={task.id}>
      <h6>{task.title}</h6>
      <p>{task.description}</p>
      <button className='complete'></button>
    </li>
  )
}

export default Task