import React, { useState } from 'react'
import '../styles/DisplayOptions.css'
import Display from '../assets/Display.svg'
import Down from '../assets/down.svg'

const DisplayOptions = ({ setGroupBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false); //giving initially -> false value

  const toggleDropDown = () => { //function to toggle between close and open state of the drop-down list
    setIsOpen(!isOpen);
  }
  return (
    <div className='display-button-container'>
      <button className='display-button' onClick={toggleDropDown}>
        <span><img src={Display} alt="display-icon" /></span>
        Display
        <span><img src={Down} alt="down-icon" /></span>
      </button>
      {
        isOpen && (
          <div className='dropdown-content'>
            <div className='dropdown-item'>
              <label>Grouping</label>
              <select name="Status" id="group" onChange={(e) => setGroupBy(e.target.value)}>
                <option value='status'>Status</option>
                <option value='user'>User</option>
                <option value='priority'>Priority</option>
              </select>
            </div>
            <div className='dropdown-item'>
              <label>Ordering</label>
              <select name="Priority" id="order" onChange={(e) => setSortBy(e.target.value)}>
                <option value='priority'>Priority</option>
                <option value='title'>Title</option>
              </select>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default DisplayOptions
