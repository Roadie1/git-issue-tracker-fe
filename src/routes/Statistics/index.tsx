import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading, StatisticItem, Pagination } from '../../components';
import './statistics.styles.scss';
import { fetchStatistics } from '../../store/statisticsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

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
                <StatisticItem key={`statistic-${index}`} statistic={statistic} />
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
                        <li className='statistic-list__header'>
                            <span>Client IP</span>
                            <span>Request type</span>
                            <span>Request parameters</span>
                            <span>Requested at</span>
                        </li>
                        {renderStatistics()}
                    </ul>
                </Pagination>
            )}
        </main>
    );
}