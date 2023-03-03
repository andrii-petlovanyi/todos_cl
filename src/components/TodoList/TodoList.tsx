import React from 'react';
import { ITodoModal } from '../../interface/Todo';
import { useAllTodoListQuery } from '../../redux/todo/todoApiSlice';
import { TodoItem } from '../TodoItem/TodoItem';
import style from './style.module.css';

interface ITodoListProps {
  openModalHandler: (task: ITodoModal) => void;
}

export const TodoList: React.FC<ITodoListProps> = ({ openModalHandler }) => {
  const { data, isLoading } = useAllTodoListQuery();

  return (
    <>
      <div className={style.todo_list__header}>
        <p className={style.todo_list__label}>N:</p>
        <p className={style.todo_list__label}>Title:</p>
        <p className={style.todo_list__label}>Task:</p>
        <p className={style.todo_list__label}>Status:</p>
      </div>
      <ul className={style.todo_list}>
        {!isLoading ? (
          data?.todoList?.length ? (
            data?.todoList?.map((todo, index) => (
              <TodoItem
                key={todo._id}
                {...todo}
                index={index + 1}
                openModalHandler={openModalHandler}
              />
            ))
          ) : (
            <>...no todo in lists</>
          )
        ) : (
          <>...loading</>
        )}
      </ul>
    </>
  );
};
