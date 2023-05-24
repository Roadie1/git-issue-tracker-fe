import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './issue-details.styles.scss';
import { IssueDetailsDTO } from '../../models';
import { fetchIssuedetails } from '../../api';
import MarkdownIt from 'markdown-it';
import parse from 'html-react-parser';

export default function IssueDetails(): JSX.Element {
    const { user, repository, issueNumber, } = useParams();
    const [issue, setIssue] = useState<IssueDetailsDTO>();

    const getIssueDetails = async () => {
        const result = await fetchIssuedetails(user, repository, issueNumber);
        setIssue(result);
    }
    const md = new MarkdownIt();

    useEffect(() => {
        try {
            getIssueDetails();
        }
        catch (err) {
            console.log(err); // TODO
        }
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

    if (!issue) return (
        <main className="page-container">
            <p>Issue not found</p>
        </main>
    );
    return (
        <main className="page-container">
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
                <section className="issue-details__body">{parse(md.render(issue.body))}</section>
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
        </main>
    );
}