import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import MarkdownIt from 'markdown-it';
import parse from 'html-react-parser';
import './issue-details.styles.scss';
import { IssueDetailsDTO } from '../../models';
import api from '../../api';
import { Loading } from '../../components';

export default function IssueDetails(): JSX.Element {
    const { user, repository, issueNumber, } = useParams();
    const [issue, setIssue] = useState<IssueDetailsDTO>();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const getIssueDetails = async () => {
        try {
            const result = await api.fetchIssueDetails(user, repository, issueNumber);
            setIssue(result);
            setLoading(false);
        }
        catch (err) {
            navigate('/error');
        }
    }
    const md = new MarkdownIt();

    useEffect(() => {
        getIssueDetails();
    }, []);

    const renderAssignees = (): JSX.Element[] => {
        return issue.assignees.map((assignee, index) => {
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
        return issue.labels.map((label) => {
            return (
                <span key={`label-${label.name}`} className="issue-details__label" style={{ backgroundColor: '#' + label.color }}>
                    {label.name}
                </span>
            );
        });
    };

    const renderBody = (): string | JSX.Element | JSX.Element[] => {
        const markdown = md.render(issue.body.replace(/<!--(.*?)-->/g, ''));
        return parse(markdown);
    }

    const renderDetails = (): JSX.Element => {
        if (loading) {
            return (
                <div className="loading-container">
                    <Loading size={40} />
                </div>
            )
        }
        if (!issue) {
            return <p>Issue not found</p>;
        }
        return (
            <>
                <header className="issue-details__header">
                    <h1 className="issue-details__title">
                        {issue.title}
                        <span> #{issue.number}</span>
                    </h1>
                    <p className="issue-details__info">
                        <span>Status: {issue.state}</span>
                        <span>
                            <img className="issue-details__avatar" src={issue.user.avatarUrl} alt={issue.user.login} title={issue.user.login} />
                            <b>{issue.user.login}</b> opened this issue on {moment(issue.createdAt).format('MMM DD')}
                        </span>
                    </p>
                </header>
                <article className="issue-details">
                    <section className="issue-details__body">{renderBody()}</section>
                    <section className="issue-details__extra">
                        <div className='issue-details___extra-item'>
                            <h5>Assignees</h5>
                            <p>{issue.assignees.length === 0 ? 'No one assigned' : renderAssignees()}</p>
                        </div>
                        <div className='issue-details___extra-item'>
                            <h5>Labels</h5>
                            <p>{issue.labels.length === 0 ? 'None yet' : renderLabels()}</p>
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