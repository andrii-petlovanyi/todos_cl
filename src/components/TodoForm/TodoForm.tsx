import React, { useRef, useState } from 'react';
import { useAddTodoMutation } from '../../redux/todo/todoApiSlice';
import cn from 'classnames';
import style from './style.module.css';
import { IAddTodo } from '../../interface/Todo';

interface ITodoFormError {
  title?: boolean;
  task?: boolean;
}

export const TodoForm: React.FC = () => {
  const [formError, setFormError] = useState<ITodoFormError>();
  const titleRef = useRef<HTMLInputElement>(null);
  const taskRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let title = titleRef.current?.value.trim() || '';
    let task = taskRef.current?.value.trim() || '';

    const errors = {
      title: title?.length === 0,
      task: task?.length === 0,
    };

    setFormError(errors);

    if (errors.title || errors.task) {
      return;
    }

    try {
      const res = await addTodo<IAddTodo>({
        title,
        task,
      });
      if ('data' in res) {
        formRef.current?.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={e => handlerSubmit(e)} className={style.form} ref={formRef}>
      <div className={style.form__control}>
        <label className={style.form__label} htmlFor="title">
          Title:
        </label>
        <input
          className={cn(style.form__input, {
            [style.form__error]: formError?.title,
          })}
          id="title"
          name="title"
          ref={titleRef}
        />
        <span className={style.form__error_message}>
          {formError?.title && 'This field is empty'}
        </span>
      </div>

      <div className={style.form__control}>
        <label className={style.form__label} htmlFor="task">
          Task:
        </label>
        <input
          className={cn(style.form__input, {
            [style.form__error]: formError?.task,
          })}
          id="task"
          name="task"
          ref={taskRef}
        />
        <span className={style.form__error_message}>
          {formError?.task && 'This field is empty'}
        </span>
      </div>
      <button
        className={style.form__submit}
        type="submit"
        disabled={isLoading}
        aria-label="Create new todo button"
      >
        {isLoading ? 'Loading' : 'Create'}
      </button>
    </form>
  );
};
