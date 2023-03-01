import React from 'react';
import ReactDOM from 'react-dom';

import style from './style.module.css';

export interface ITodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  changeStatusHandler: () => void;
  title: string;
  task: string;
  status: boolean;
}

export const TodoModal: React.FC<ITodoModalProps> = ({
  isOpen,
  onClose,
  changeStatusHandler,
  title,
  status,
  task,
}) => {
  const handleModalClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={style.modal__overlay} onClick={handleModalClose}>
      <div className={style.modal__content} onClick={e => e.stopPropagation()}>
        <button className={style.modal__close_button} onClick={onClose}>
          x
        </button>
        <h2 className={style.modal__title}>{title}</h2>
        <p className={style.modal__label}>Description:</p>
        <p className={style.modal__description}>{task}</p>
        <input
          className={style.modal__status}
          type="checkbox"
          checked={status}
          onChange={changeStatusHandler}
        />
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLDivElement
  );
};
