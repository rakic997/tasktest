import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './group-list.scss'

import { useGroups } from '../../context/GroupsContext'
import AddItemInput from '../UI/AddItemInput'

const GroupsList = () => {
  const [groupTitle, setGroupTitle] = useState('')
  const { groups, setGroups, activeGroupId, setActiveGroupId } = useGroups()

  const handleAddGroup = () => {
    const newGroup = {
      id: uuidv4(),
      title: groupTitle,
      tasks: [],
    }

    setGroups(prevGroups => [
      ...prevGroups,
      newGroup
    ])
    setGroupTitle('')
  }

  return (
    <section className='groups'>
      <div className='groups-header'>
        <h2>Groups</h2>
      </div>
      <div className='groups-body'>
        <ul className='groups-list' role='list'>
          {groups?.map((group) => {
            return (
              <li
                key={group.id}
                className={group.id === activeGroupId ? 'group active' : 'group'}
                onClick={() => setActiveGroupId(group.id)}>
                <h6>{group.title}</h6>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='groups-footer'>
        <AddItemInput
          placeholder='New group...'
          className={'add-group-input'}
          value={groupTitle}
          onChange={(e) => setGroupTitle(e.target.value)}
          onClick={handleAddGroup}
        />
      </div>
    </section>
  )
}

export default GroupsList