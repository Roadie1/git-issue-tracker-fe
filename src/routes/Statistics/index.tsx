import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatisticsDTO } from '../../models';
import api from '../../api';
import { Loading, StatisticItem, Pagination } from '../../components';
import './statistics.styles.scss';

export default function Staistics(): JSX.Element {
    const [statistics, setStatistics] = useState<StatisticsDTO>();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const getStatistics = async (page?: number, size?: number) => {
        try {
            const newStatistics = await api.fetchStatistics(page, size);
            setStatistics(newStatistics);
            setLoading(false);
        }
        catch (err) {
            navigate('/error');
        }
    };

    useEffect(() => {
        getStatistics(1, 10);
    }, []);

    const renderStatistics = (): JSX.Element[] => {
        return statistics.statistics.map((statistic, index) => {
            return (
                <StatisticItem key={`statistic-${index}`} statistic={statistic} />
            )
        })
    }

    const paginationChange = async (size: number, page: number): Promise<void> => {
        const newStatistics = await api.fetchStatistics(page, size);
        setStatistics(newStatistics);
    }

    return (
        <main className='page-container'>
            {loading && (
                <div className="loading-container">
                    <Loading size={40} />
                </div>
            )}
            {statistics && (
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