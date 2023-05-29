import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchIssues } from '../../store/issuesSlice';
import { Loading, Pagination, IssueItem, Searchbar } from '../../components';
import './issue-list.styles.scss';

export default function IssueList(): JSX.Element {
    const issuesInfo = useAppSelector(state => state.issues.issueDTO);
    const status = useAppSelector(state => state.issues.status);
    const dispatch = useAppDispatch();

    const renderIssues = (): JSX.Element[] => {
        return issuesInfo.issues.map((issue) => {
            return (
                <IssueItem key={`issue-${issue.id}`} issue={issue} />
            )
        })
    }

    const paginationChange = useCallback((size: number, page: number): void => {
        if (status !== 'loading') {
            dispatch(fetchIssues({
                user: issuesInfo.metadata.user,
                repository: issuesInfo.metadata.repository,
                page,
                size
            }));
        }
    }, [issuesInfo?.metadata]);

    return (
        <main className="page-container">
            <Searchbar />
            <section className="issue-list__container">
                {status === 'loading' && (
                    <Loading size={50} />
                )}
                {status === 'succeeded' && issuesInfo?.issues.length === 0 && (
                    <p className='issue-list__not-found'>No issues found in this repository</p>
                )}
                {status !== 'failed' && issuesInfo?.issues.length > 0 && (
                    <Pagination onChange={paginationChange} total={issuesInfo.metadata.totalCount} page={issuesInfo.metadata.page} size={issuesInfo.metadata.size}>
                        <ul className="issue-list">
                            {renderIssues()}
                        </ul>
                    </Pagination>
                )}
            </section>
        </main>
    );
}
