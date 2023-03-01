import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import style from './style.module.css';

function App() {
  return (
    <main className={style.main}>
      <h1 className={style.main__title}>Simple todo</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}

export default App;
