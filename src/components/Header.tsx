import React from 'react';
import './header.styles.scss';
import { GithubIcon } from '../icons/Github';

export default function Header(): JSX.Element {
    return (
        <header className='Header'>
            <GithubIcon />
            <h1>Github Issue Tracker</h1>
        </header>
    );
}