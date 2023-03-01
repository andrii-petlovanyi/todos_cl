import React, { useState } from 'react';
import { ITodo } from '../../interface/Todo';
import { useUpdateTodoStatusMutation } from '../../redux/todo/todoApiSlice';
import { TodoModal } from '../TodoModal/TodoModal';
import style from './style.module.css';

interface ITodoProps extends ITodo {
  index: number;
}

export const TodoItem: React.FC<ITodoProps> = ({
  _id,
  title,
  task,
  status,
  index,
}) => {
  const [updateTodoStatus] = useUpdateTodoStatusMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const taskDescription =
    task.length > 15 ? task.slice(0, 15).concat('...') : task;
  const taskTitle =
    title.length > 15 ? title.slice(0, 15).concat('...') : title;

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (e: React.MouseEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    if (target.nodeName === 'INPUT') return;
    setIsModalOpen(true);
  };

  const changeStatusHandler = async () => {
    try {
      await updateTodoStatus({ todoId: _id, status: !status });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <li className={style.todo} onClick={handleModalOpen}>
        <p className={style.todo__number}>{index}</p>
        <h2 className={style.todo__title}>{taskTitle}</h2>
        <p className={style.todo__task}>{taskDescription}</p>
        <input
          className={style.todo__status}
          type="checkbox"
          checked={status}
          onChange={changeStatusHandler}
        />
      </li>
      <TodoModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={title}
        status={status}
        task={task}
        changeStatusHandler={changeStatusHandler}
      />
    </>
  );
};
