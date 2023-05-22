import React, { PropsWithChildren } from 'react';
import Button from './Button';

interface PaginationProps {
    onChange: (size: number, page: number) => void;
    total: number;
    page: number;
    size: number;
}

export default function Pagination({ onChange, total, page, size, children }: PropsWithChildren<PaginationProps>): JSX.Element {
    const totalPages = Math.ceil(total / size);

    const switchSize = (newSize: number) => {
        onChange(newSize, page);
    }

    const switchPage = (newPage: number) => {
        onChange(size, newPage);
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
                
            </footer>
        </section>
    )
}