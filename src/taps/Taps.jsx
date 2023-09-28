import React from 'react'
import { Link } from 'react-router-dom'
import * as STYLE from "../styles/Style"

const Taps = () => {
  return (
    <nav className={STYLE.NAV_STYLE}>
        <Link to={"/login"} className="w-1/2 absolute top-1 left-12 font-bold" >Log In</Link>
        <Link to={"/register"} className="w-1/2 absolute top-1 left-52 font-bold">Sign Up</Link>
    </nav>
  )
}

export default Taps