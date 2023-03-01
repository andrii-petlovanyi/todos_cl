import React, { useState } from 'react';
import { useAddTodoMutation } from '../../redux/todo/todoApiSlice';
import { IAddTodo } from '../../interface/Todo';
import cn from 'classnames';
import style from './style.module.css';

interface ITodoFormError {
  title?: boolean;
  task?: boolean;
}

export const TodoForm: React.FC = () => {
  const initialForm = {
    title: '',
    task: '',
  };
  const [formData, setFormData] = useState<IAddTodo>(initialForm);
  const [formError, setFormError] = useState<ITodoFormError>();

  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = {
      title: formData.title.trim().length === 0,
      task: formData.task.trim().length === 0,
    };

    setFormError(errors);

    if (errors.title || errors.task) {
      return;
    }

    try {
      const res = await addTodo(formData);
      if ('data' in res) {
        setFormData(initialForm);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handlerSubmit} className={style.form}>
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
          onChange={handleChange}
          value={formData.title}
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
          onChange={handleChange}
          value={formData.task}
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
        Create
      </button>
    </form>
  );
};
