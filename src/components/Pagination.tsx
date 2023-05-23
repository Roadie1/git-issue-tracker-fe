import React, { PropsWithChildren } from 'react';
import Button from './Button';
import './pagination.styles.scss';

interface PaginationProps {
    onChange: (size: number, page: number) => void;
    total: number;
    page: number;
    size: number;
}

export default function Pagination({ onChange, total, page, size, children }: PropsWithChildren<PaginationProps>): JSX.Element {

    const switchSize = (newSize: number): void => {
        onChange(newSize, page);
    }

    const switchPage = (newPage: number): void => {
        onChange(size, newPage);
    }

    const renderPages = (): JSX.Element[] => {
        const totalPages = Math.ceil(total / size);
        if(totalPages <= 1) return [];
        return Array.from(Array(totalPages)).map((_item, index) => {
            const pageNumber = index + 1;
            return (
                <Button
                    key={"page" + pageNumber}
                    type="primary"
                    active={pageNumber === page}
                    onClick={() => switchPage(index + 1)}
                >
                    {pageNumber}
                </Button>
            );
        });
    }

    return (
        <section className='paginated-list'>
            <header className='paginated-list__options'>
                <h4>Total: {total}</h4>
                <nav className='paginated-list__options__size-buttons'>
                    <span>Show:</span>
                    <Button type="underline" disabled={size === 10} onClick={() => switchSize(10)}>10</Button>
                    <Button type="underline" disabled={size === 30} onClick={() => switchSize(30)}>30</Button>
                    <Button type="underline" disabled={size === 50} onClick={() => switchSize(50)}>50</Button>
                </nav>
            </header>
            {children}
            <footer className='paginated-list__pages'>
                {renderPages()}
            </footer>
        </section>
    )
}