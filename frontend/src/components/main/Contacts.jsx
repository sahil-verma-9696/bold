import React from 'react'
import { useSelector } from 'react-redux'

function Contacts() {
  const currUser = useSelector(store=>store.auth.user);
  return (
    <div className="flex flex-col h-full text-white p-4">
      <header className='flex gap-4 border-b'>
        <span>All</span>
        <span>Pending</span>
        <span>Friends</span>
      </header>
    </div>
  )
}

export default Contacts