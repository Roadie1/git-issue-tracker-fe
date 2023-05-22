import React from 'react';
import moment from 'moment';
import { Issue } from '../models';
import './issue-item.styles.scss';

interface IssueItemProps {
    issue: Issue;
}

export default function IssueItem({ issue }: IssueItemProps): JSX.Element {
    const renderLabels = (): JSX.Element[] => {
        return issue.labels.map((label) => {
            return (
                <span key={`label-${issue.id}-${label.name}`} className='issue-item__label' style={{ backgroundColor: '#'+label.color }}>
                    {label.name}
                </span>
            );
        })
    }

    return (
        <li className="issue-item">
            <img className="issue-item__avatar" src={issue.user.avatarUrl} alt={issue.user.login} title={issue.user.login} />
            <div className="issue-item__description">
                <p className="issue-item__title">{issue.title}</p>
                <p className="issue-item__info">#{issue.number} opened on {moment(issue.createdAt).format('Do MMM YYYY')}</p>
            </div>
            <div className='issue-item__labels'>
                {renderLabels()}
            </div>
        </li>
    )
}