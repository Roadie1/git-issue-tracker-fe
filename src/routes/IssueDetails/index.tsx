import React, { useEffect } from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import parse from 'html-react-parser';
import './issue-details.styles.scss';
import { Loading } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchDetails } from '../../store/issueDetailsSlice';

export default function IssueDetails(): JSX.Element {
    const { user, repository, issueNumber } = useParams();
    const { details, status } = useAppSelector(state => state.issueDetails);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const md = new MarkdownIt();

    useEffect(() => {
        dispatch(fetchDetails({ user, repository, issueNumber })).unwrap().catch(() => navigate('/error'));
    }, []);

    const renderAssignees = (): JSX.Element[] => {
        return details.assignees.map((assignee, index) => {
            return (
                <img
                    key={`assignee-${index}`}
                    className="issue-details__avatar"
                    src={assignee.avatarUrl}
                    alt={assignee.login}
                    title={assignee.login} />
            );
        });
    };

    const renderLabels = (): JSX.Element[] => {
        return details.labels.map((label) => {
            return (
                <span key={`label-${label.name}`} className="issue-details__label" style={{ backgroundColor: '#' + label.color }}>
                    {label.name}
                </span>
            );
        });
    };

    const renderBody = (): string | JSX.Element | JSX.Element[] => {
        const markdown = md.render(details.body.replace(/<!--(.*?)-->/g, ''));
        return parse(markdown);
    }

    const renderDetails = (): JSX.Element => {
        if (status === 'loading') {
            return (
                <div className="loading-container">
                    <Loading size={40} />
                </div>
            )
        }
        return (
            <>
                <header className="issue-details__header">
                    <h1 className="issue-details__title">
                        {details.title}
                        <span> #{details.number}</span>
                    </h1>
                    <p className="issue-details__info">
                        <span>Status: {details.state}</span>
                        <span>
                            <img className="issue-details__avatar" src={details.user.avatarUrl} alt={details.user.login} title={details.user.login} />
                            <b>{details.user.login}</b> opened this issue on {moment(details.createdAt).format('MMM DD')}
                        </span>
                    </p>
                </header>
                <article className="issue-details">
                    <section className="issue-details__body">{renderBody()}</section>
                    <section className="issue-details__extra">
                        <div className='issue-details___extra-item'>
                            <h5>Assignees</h5>
                            <p>{details.assignees.length === 0 ? 'No one assigned' : renderAssignees()}</p>
                        </div>
                        <div className='issue-details___extra-item'>
                            <h5>Labels</h5>
                            <p>{details.labels.length === 0 ? 'None yet' : renderLabels()}</p>
                        </div>
                    </section>
                </article>
            </>
        );
    }
    return (
        <main className="page-container">
            {renderDetails()}
        </main>
    );
}