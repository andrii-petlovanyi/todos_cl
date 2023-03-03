import React from 'react';
import ReactDOM from 'react-dom';
import { ITodoModal } from '../../interface/Todo';
import {
  useDeleteTodoMutation,
  useUpdateTodoStatusMutation,
} from '../../redux/todo/todoApiSlice';

import style from './style.module.css';

export interface ITodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateStatus: (status: boolean) => void;
  task: ITodoModal | null;
}

export const TodoModal: React.FC<ITodoModalProps> = ({
  isOpen,
  onClose,
  updateStatus,
  task,
}) => {
  const [updateTodoStatus] = useUpdateTodoStatusMutation();

  const handleModalClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const changeStatusHandler = async () => {
    try {
      const res = await updateTodoStatus({
        todoId: task?.id,
        status: !task?.status,
      });
      if ('data' in res) {
        updateStatus(res.data.updatedTodo.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();

  const clickHandler = async () => {
    try {
      await deleteTodo(task?.id);
      onClose();
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
        {task && (
          <>
            <h2 className={style.modal__title}>{task.title}</h2>
            <p className={style.modal__label}>Description:</p>
            <p className={style.modal__description}>{task.task}</p>
            <div className={style.modal__options}>
              <input
                className={style.modal__status}
                type="checkbox"
                checked={task.status}
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
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLDivElement
  );
};
