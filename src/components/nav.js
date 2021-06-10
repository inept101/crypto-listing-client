import React from 'react'
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <div className="navbar">
            <div className="logo"></div>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/view'>View</Link></li>
                </ul>
            
        </div>
    )
}

export default Nav
