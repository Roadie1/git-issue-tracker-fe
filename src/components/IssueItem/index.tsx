import React from 'react';
import moment from 'moment';
import { Issue } from '../../models';
import './issue-item.styles.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface IssueItemProps {
    issue: Issue;
}

export default function IssueItem({ issue }: IssueItemProps): JSX.Element {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.issues.issueDTO.metadata.user);
    const repository = useAppSelector((state) => state.issues.issueDTO.metadata.repository);
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
        <li className="issue-item" onClick={() => navigate(`/issue/${user}/${repository}/${issue.number}`)}>
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