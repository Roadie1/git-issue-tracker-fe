import React, { useEffect, useState } from 'react';
import './statistics.styles.scss';
import { StatisticsDTO } from '../models';
import Pagination from '../components/Pagination';
import { fetchStatistics } from '../api';
import StatisticItem from '../components/StatisticItem';

export default function Staistics(): JSX.Element {
    const [statistics, setStatistics] = useState<StatisticsDTO>();

    const getStatistics = async (page?: number, size?: number) => {
        const newStatistics = await fetchStatistics(page, size);
        setStatistics(newStatistics);
    }

    useEffect(() => {
        try {
            getStatistics(1, 10);
        }
        catch (err) {
            console.log(err); // TODO
        }
    }, []);

    const renderStatistics = (): JSX.Element[] => {
        return statistics.statistics.map((statistic, index) => {
            return (
                <StatisticItem key={`statistic-${index}`} statistic={statistic} />
            )
        })
    }

    const paginationChange = async (size: number, page: number): Promise<void> => {
        const newStatistics = await fetchStatistics(page, size);
        setStatistics(newStatistics);
    }

    return (
        <main className='page-container'>
            {statistics && (
                <Pagination onChange={paginationChange} total={statistics?.metadata.totalCount} page={statistics?.metadata.page} size={statistics?.metadata.size}>
                    <ul className="statistic-list">
                        {renderStatistics()}
                    </ul>
                </Pagination>
            )}
        </main>
    );
}