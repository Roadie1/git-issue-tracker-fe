import React from 'react';
import moment from 'moment';
import './statistic-item.styles.scss';
import { Statistic } from '../../models';

export default function StatisticItem(props: { statistic: Statistic }): JSX.Element {
    const { clientIp, requestType, searchParams, requestedAt } = props.statistic;

    const renderParams = () => {
        return searchParams.map((param) => {
            return (
                `${param.parameter}: ${param.value}`
            );
        }).join(', ')
    }
    return (
        <li className='statistic-item'>
            <p>{clientIp}</p>
            <p>{requestType}</p>
            <p>{renderParams()}</p>
            <p>{moment(requestedAt).format('DD.MM.YY, HH:mm:ss')}</p>
        </li>
    );
}