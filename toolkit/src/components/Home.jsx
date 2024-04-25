import TodolistAdd from './TodolistAdd';
import Todolist from './Todolist';

function Home() {

  return (
    <>

      <div id="home">
        <h1>Homepage</h1>

        <TodolistAdd />

        <Todolist />

      </div>

    </>
  )
}

export default Home
