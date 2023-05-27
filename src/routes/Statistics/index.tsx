import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading, Pagination } from '../../components';
import './statistics.styles.scss';
import { fetchStatistics } from '../../store/statisticsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import moment from 'moment';

export default function Staistics(): JSX.Element {
    const dispatch = useAppDispatch();
    const { statistics, status } = useAppSelector(state => state.statistics);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchStatistics({ page: 1, size: 10 })).unwrap().catch(() => navigate('/error'));
    }, []);

    const renderStatistics = (): JSX.Element[] => {
        return statistics.statistics.map((statistic, index) => {
            return (
                <li className='statistic-list__item' key={`statistic-${index}`}>
                    <span className='attribute ip' data-name="Client IP:">{statistic.clientIp}</span>
                    <span className='attribute type' data-name="Request type:">{statistic.requestType}</span>
                    <span className='attribute parameters' data-name="Request parameters:">
                        {statistic.searchParams.map((param) => `${param.parameter}: ${param.value}`).join(', ')}
                    </span>
                    <span className='attribute date' data-name="Requested at:">
                        {moment(statistic.requestedAt).format('DD.MM.YY, HH:mm:ss')}
                        </span>
                </li>
            )
        })
    }

    const paginationChange = useCallback((size: number, page: number): void => {
        if (status !== 'loading') {
            dispatch(fetchStatistics({ page, size })).unwrap().catch(() => navigate('/error'));
        }
    }, []);

    return (
        <main className='page-container'>
            {status === 'loading' && (
                <div className="loading-container">
                    <Loading size={40} />
                </div>
            )}
            {status === 'succeeded' && (
                <Pagination onChange={paginationChange} total={statistics?.metadata.totalCount} page={statistics?.metadata.page} size={statistics?.metadata.size}>
                    <ul className="statistic-list">
                        <li className='statistic-list__header statistic-list__item'>
                            <span className='attribute ip'>Client IP</span>
                            <span className='attribute type'>Request type</span>
                            <span className='attribute parameters'>Request parameters</span>
                            <span className='attribute date'>Requested at</span>
                        </li>
                        {renderStatistics()}
                    </ul>
                </Pagination>
            )}
        </main>
    );
}