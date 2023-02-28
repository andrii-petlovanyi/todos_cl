import './App.css'
import { useAllTodoListQuery } from './redux/todo/todoApiSlice'

function App() {

  const { data } = useAllTodoListQuery()
  console.log(data)

  return (
    <div >
      Hello, Andrii
    </div>
  )
}

export default App
