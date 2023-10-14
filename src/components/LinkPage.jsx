import React from 'react'
import { Link } from "react-router-dom";
import * as STYLE from "../styles/Style"

const LinkPage = () => {
    return (
        <section className={STYLE.SEC_STYLE}>
            <h1 className={STYLE.H1_STYLE}>Links</h1>
            <h2 className={STYLE.TEXT_STYLE}>Public</h2>
            <Link 
             to="/login"
             className={STYLE.LINK_STYLE}
            >Login</Link>
            <Link to="/register" className={STYLE.LINK_STYLE}>Register</Link>
            <h2 className={STYLE.TEXT_STYLE}>Private</h2>
            <Link to="/" className={STYLE.LINK_STYLE}>Home</Link>
            <Link to="/editor" className={STYLE.LINK_STYLE}>Editors Page</Link>
            <Link to="/admin" className={STYLE.LINK_STYLE}>Admin Page</Link>
        </section>
    )
}

export default LinkPage