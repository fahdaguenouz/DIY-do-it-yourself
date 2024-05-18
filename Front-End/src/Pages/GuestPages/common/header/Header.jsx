import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head.jsx"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link style={{textDecorationLine:'none'}} to='/'>Home</Link>
            </li>
            <li>
              <Link to='/tutorials' style={{textDecorationLine:'none'}}>Tutorials</Link>
            </li>
            <li>
              <Link to='/about' style={{textDecorationLine:'none'}}>About</Link>
            </li>
            <li>
              <Link to='/team' style={{textDecorationLine:'none'}}>Team</Link>
            </li>
            <li>
              <Link to='/pricing' style={{textDecorationLine:'none'}}>Pricing</Link>
            </li>
            <li>
              <Link to='/blog' style={{textDecorationLine:'none'}}>Blogs</Link>
            </li>
            <li>
              <Link to='/contact' style={{textDecorationLine:'none'}}>Contact</Link>
            </li>
          </ul>
          <div className='start'>
            <div className='button'><Link className="text-login" to="/login" style={{textDecorationLine:'none'}}>Sign in / Sign Up</Link></div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
