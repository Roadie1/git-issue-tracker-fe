import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.styles.scss';
import { GithubIcon } from '../icons/Github';


export default function Header(): JSX.Element {
    return (
        <header className='Header'>
            <h1>
                <GithubIcon />
                Github Issue Tracker
            </h1>
            <NavLink to="/statistics">Statistics</NavLink>
        </header>
    );
}