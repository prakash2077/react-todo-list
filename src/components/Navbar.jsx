import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

  const returnClassName = ({isActive})=>{
    return isActive ? 'current' : null
  }

  return (
      <nav>
        <h1>GOAT IT⚡</h1>
        <ul>
          <li><NavLink className={returnClassName} to="/">Home</NavLink></li>
          <li><NavLink className={returnClassName} to="/tasks">Tasks</NavLink></li>
          <li><NavLink className={returnClassName} to="/contact-us">Contact us</NavLink></li>
        </ul>
      </nav>
  )
}

export default Navbar