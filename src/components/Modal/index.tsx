import React from 'react';
import "./modal.styles.scss";
import Button from '../Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeModal } from '../../store/modalSlice';

export default function Modal(): JSX.Element {
  const { title, message, show } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(closeModal());
  }

  if (show) {
    return (
      <div className="overlay" onClick={close}>
        <aside className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className='close-button'>
            <Button onClick={close} type="transparent">X</Button>
          </div>
          <h2>{title}</h2>
          <p>{message}</p>
        </aside>
      </div>
    );
  }
}