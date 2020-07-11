import React from 'react'
import { NavLink } from 'react-router-dom';

function NavComponent() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" activeClassName="selected" exact={true}>Top</NavLink></li>
                <li><NavLink to="/new" activeClassName="selected">New</NavLink></li>
            </ul>
        </nav>
    )
}

export default NavComponent
