import React from 'react';
import './issue-list.styles.scss';
import Searchbar from '../components/Searchbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import IssueItem from '../components/IssueItem';
import { fetchIssues } from '../store/issuesSlice';
import Pagination from '../components/Pagination';

export default function IssueList(): JSX.Element {
    const issuesInfo = useAppSelector(state => state.issues.issueDTO);
    const dispatch = useAppDispatch();

    const renderIssues = (): JSX.Element[] => {
        return issuesInfo.issues.map((issue) => {
            return (
                <IssueItem key={`issue-${issue.id}`} issue={issue} />
            )
        })
    }

    const paginationChange = (size: number, page: number): void => {
        dispatch(fetchIssues({
            user: issuesInfo.metadata.user,
            repository: issuesInfo.metadata.repository,
            page,
            size
        }));
    }

    return (
        <main className='page-container'>
            <Searchbar />
            {issuesInfo.issues.length > 0 && (
                <Pagination onChange={paginationChange} total={issuesInfo.metadata.totalCount} page={issuesInfo.metadata.page} size={issuesInfo.metadata.size}>
                    <ul className="issue-list">
                        {renderIssues()}
                    </ul>
                </Pagination>
            )}
        </main>
    );
}
