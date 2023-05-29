import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Loading, Pagination } from '../../components';
import './statistics.styles.scss';
import { ApiError, StatisticsDTO } from '../../models';
import Api from '../../api';
import { useAppDispatch } from '../../store/hooks';
import { showModal } from '../../store/modalSlice';

export default function Staistics(): JSX.Element {
    const [statistics, setStatistics] = useState<StatisticsDTO>();
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch()

    const getStatistics = async (page?: number, size?: number) => {
        try {
            const newStatistics = await Api.fetchStatistics(page, size);
            setStatistics(newStatistics);
            setLoading(false);
        }
        catch (err: unknown) {
            const error = err as ApiError;
            setLoading(false);
            dispatch(showModal({ title: `Error ${error.status || ''}`, message: error.message }));
        }
    };

    useEffect(() => {
        getStatistics(1, 10);
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

    const paginationChange = useCallback(async (size: number, page: number): Promise<void> => {
        if (!loading) {
            const newStatistics = await Api.fetchStatistics(page, size);
            setStatistics(newStatistics);
        }
    }, [loading]);

    return (
        <main className='page-container'>
            {loading && (
                <div className="loading-container">
                    <Loading size={40} />
                </div>
            )}
            {!loading && statistics && (
                <Pagination
                    onChange={(size, page) => void paginationChange(size, page)}
                    total={statistics?.metadata.totalCount}
                    page={statistics?.metadata.page}
                    size={statistics?.metadata.size}
                >
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