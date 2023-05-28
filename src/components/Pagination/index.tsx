import React, { PropsWithChildren } from 'react';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { Button } from '../';
import './pagination.styles.scss';

interface PaginationProps {
  onChange: (size: number, page: number) => void;
  total: number;
  page: number;
  size: number;
}

export default function Pagination({ onChange, total, page, size, children }: PropsWithChildren<PaginationProps>): JSX.Element {
  const windowSize = useWindowDimensions();
  const switchSize = (newSize: number): void => {
    onChange(newSize, 1);
  }

  const switchPage = (newPage: number): void => {
    onChange(size, newPage);
  }

  const renderPageButton = (pageNumber: number): JSX.Element => {
    return (
      <Button
        key={`page - ${pageNumber}`}
        type="primary"
        active={pageNumber === page}
        onClick={() => switchPage(pageNumber)}
      >
        {pageNumber}
      </Button>
    );
  }
  const renderElipsis = (pageNumber: number): JSX.Element => {
    return (
      <Button
        key={`page - ${pageNumber}`}
        type="primary"
        disabled
        onClick={null}
      >
        ...
      </Button>
    )
  }

  const getPaginationButtons = (current: number, max: number, offset: number): JSX.Element[] => {
    const buttons = [];
    for (let i = 1; i <= max; i++) {
      if (i < current - offset && i > 1) {
        i = current - offset - 1;
        buttons.push(renderElipsis(i));
        continue;
      }
      if (i > current + offset && i < max) {
        i = max - 1;
        buttons.push(renderElipsis(i));
        continue;
      }
      buttons.push(renderPageButton(i));
    }
    return buttons;
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
        {getPaginationButtons(page, Math.ceil(total / size), windowSize.width > 500 ? 2 : 1)}
      </footer>
    </section>
  )
}