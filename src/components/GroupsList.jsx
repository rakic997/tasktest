import React from 'react'

const initialGorups = [
  { id: 1, title: 'Group 1' },
  { id: 2, title: 'Group 2' },
  { id: 3, title: 'Group 3' },
]

const GroupsList = () => {
  return (
    <section className='groups'>
      <div className='groups-header'>
        <h2>Groups</h2>
      </div>
      <div className='groups-body'>
        <ul className='groups-list'>
          {initialGorups.map((group) => {
            return (
              <li key={group.id}>{group.title}</li>
            )
          })}
        </ul>
      </div>
      <div className='groups-footer'>
        <div className='add-group-input'>
          <input
            type='text'
            id='add-group'
            name='add-task'
            placeholder='New gorup...'
          />
          <button>+</button>
        </div>
      </div>
    </section>
  )
}

export default GroupsList