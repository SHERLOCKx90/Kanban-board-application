import React from 'react'
import DisplayOptions from "./DisplayOptions.js"
import '../styles/NavBar.css'

const NavBar = ({ setGroupBy, setSortBy }) => {
  return (
    <div className='nav'>
      <DisplayOptions setGroupBy={setGroupBy} setSortBy={setSortBy} />
    </div>
  )
}

export default NavBar
