import React from 'react';
import ReactDOM from 'react-dom';
import { useDeleteTodoMutation } from '../../redux/todo/todoApiSlice';

import style from './style.module.css';

export interface ITodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  changeStatusHandler: () => void;
  id: string;
  title: string;
  task: string;
  status: boolean;
}

export const TodoModal: React.FC<ITodoModalProps> = ({
  isOpen,
  onClose,
  changeStatusHandler,
  id,
  title,
  status,
  task,
}) => {
  const handleModalClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();

  const clickHandler = async () => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.log(error);
    }
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
        <div className={style.modal__options}>
          <input
            className={style.modal__status}
            type="checkbox"
            checked={status}
            onChange={changeStatusHandler}
          />
          <button
            className={style.modal__delete}
            type="button"
            disabled={isLoading}
            onClick={clickHandler}
          >
            {isLoading ? 'Deleting' : 'Delete'}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLDivElement
  );
};
