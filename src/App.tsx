import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodoModal } from './components/TodoModal/TodoModal';
import { ITodoModal } from './interface/Todo';
import style from './style.module.css';

function App() {
  const [task, setTask] = useState<ITodoModal | null>(null);

  const closeModalHandler = () => {
    setTask(null);
  };
  const openModalHandler = (task: ITodoModal) => {
    setTask(task);
  };

  const updatedStatusHandler = (status: boolean) => {
    setTask(prev => ({
      ...prev!,
      status,
    }));
  };

  return (
    <main className={style.main}>
      <h1 className={style.main__title}>Simple todo</h1>
      <TodoForm />
      <TodoList openModalHandler={openModalHandler} />
      <TodoModal
        isOpen={!!task}
        onClose={closeModalHandler}
        updateStatus={updatedStatusHandler}
        task={task}
      />
    </main>
  );
}

export default App;
