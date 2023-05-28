import React, { FormEvent, useState } from 'react';
import './searchbar.styles.scss';
import { SearchIcon } from '../../icons';
import { fetchIssues } from '../../store/issuesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function Searchbar(): JSX.Element {
  const [username, setUsername] = useState('');
  const [repository, setRepository] = useState('');
  const dispatch = useAppDispatch();
  const issueStatus = useAppSelector(state => state.issues.status);


  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (issueStatus !== 'loading') {
      dispatch(fetchIssues({ user: username, repository, page: 1, size: 10, forced: true }));
    }
  }

  return (
    <nav className='searchbar'>
      <p>Type username and repository to get a list of issues</p>
      <form className='searchbar_inputs' onSubmit={onSubmit}>
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder='Repository' onChange={(e) => setRepository(e.target.value)} />
        <input type="submit" hidden />
        <button className="searchbar_button" onClick={onSubmit}>
          <SearchIcon />
        </button>
      </form>
    </nav>
  );
}