import React from 'react'
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme'

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

export default function Navigation() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
            <nav className="row space-between">
                <ul className="row nav">
                    <li><NavLink className="nav-link" to="/" exact={true} activeStyle={activeStyle}>Top</NavLink></li>
                    <li><NavLink className="nav-link" to="/new" activeStyle={activeStyle}>New</NavLink></li>
                </ul>
                <button style={{fontSize: 30}} className='btn-clear' onClick={toggleTheme}>
                    {theme === 'light' ? '🔦' : '💡'}
                </button>
            </nav>
            )}
        </ThemeConsumer>
    )
}