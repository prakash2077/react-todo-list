import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import InstallPWAButton from '../InstallPWAButton';

const Navbar = () => {

  const returnClassName = ({isActive})=>{
    return isActive ? 'current' : null
  }

  return (
      <nav>
        <div className="logo"><h1><NavLink className="home" to='/'>GOAT&nbsp;IT⚡</NavLink> </h1></div>
        
        <ul>
          <li><NavLink className={returnClassName} to="/">Home</NavLink></li>
          <li><NavLink className={returnClassName} to="/tasks">Tasks</NavLink></li>
          <li><NavLink className={returnClassName} to="/contact-us">Contact us</NavLink></li>
        </ul>
        <InstallPWAButton />
      </nav>
  )
}

export default Navbar