import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchIssues } from '../../store/issuesSlice';
import { Loading, Pagination, IssueItem, Searchbar } from '../../components';
import './issue-list.styles.scss';
import { useNavigate } from 'react-router-dom';

export default function IssueList(): JSX.Element {
    const issuesInfo = useAppSelector(state => state.issues.issueDTO);
    const issuesStatus = useAppSelector(state => state.issues.status);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

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
        })).unwrap().catch(() => navigate('/error'));
    }

    return (
        <main className="page-container">
            <Searchbar />
            <section className="issue-list__container">
                {issuesStatus === 'loading' && (
                    <Loading size={50} />
                )}
                {issuesStatus === 'succeeded' && issuesInfo?.issues.length > 0 && (
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
