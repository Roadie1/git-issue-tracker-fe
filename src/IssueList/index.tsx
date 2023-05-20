import React from 'react';
import './issue-list.styles.scss';
import Searchbar from '../components/Searchbar';

export default function IssueList(): JSX.Element {
    return (
        <main className='IssueList'>
            <Searchbar />
        </main>
    );
}
