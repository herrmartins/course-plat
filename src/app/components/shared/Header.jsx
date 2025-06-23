import React from 'react'
import ToggleTheme from '../ToggleTheme'

function Header() {
  return (
    <>
    <div className='flex justify-center'>
      <h1>English Platform</h1>
      <ToggleTheme />
    </div>
    </>
  )
}

export default Header