import TodolistAdd from './TodolistAdd';
import Todolist from './Todolist';
import { useDispatch, useSelector } from 'react-redux';
import {reset} from '../store/slice/debuggerSlice';

function Home() {

  const todolist = useSelector((state) => state.todolist.todolist);
  const dispatch = useDispatch();

  return (
    <>

      <div id="home">
        <h1>Homepage</h1>

        <button className="clear-debug" onClick={ () => dispatch(reset()) }>Reset debug</button>

        <TodolistAdd />

        <Todolist />

      </div>

    </>
  )
}

export default Home
