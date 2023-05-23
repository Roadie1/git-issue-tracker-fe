import React from 'react';
import moment from 'moment';
import './statistic-item.styles.scss';
import { Statistic } from '../models';

export default function StatisticItem(props: { statistic: Statistic }): JSX.Element {
    const { clientIp, requestType, searchParams, requestedAt } = props.statistic;
    return (
        <li className='statistic-item'>
            <p>{clientIp}</p>
            <p>{requestType}</p>
            <p>{searchParams.join(', ')}</p>
            <p>{moment(requestedAt).format('Do MMM YYYY')}</p>
        </li>
    );
}