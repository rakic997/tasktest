import { useState } from 'react'

import GroupsList from './components/GroupsList'
import TasksList from './components/TasksList'

function App() {

  return (
    <div className='content'>
      <GroupsList />
      <TasksList />
    </div>
  )
}

export default App
