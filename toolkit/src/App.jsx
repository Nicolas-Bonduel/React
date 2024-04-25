import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from './store/slice/debuggerSlice.js'

function App() {

  const debugger_ = useSelector((state) => state.debugger.actions);
  const dispatch = useDispatch();

  return (
    <>
      <Header />

      <Routes>
        <Route path={'/'} element={<Home />} />

        <Route path={'*'} element={<div>Not found!</div>} />
      </Routes>

      <div id="logs">

        {/*
          debugger_.length > 0 &&
          <>
            <button className="clear-debug" onClick={ () => dispatch(reset()) }>Reset logs</button>
            <h3>Logs :</h3>
          </>
  */}

        {/*
          debugger_.map((action, idx) => <pre key={idx}>{JSON.stringify(action, null, 2)}</pre>)
*/}
      </div>

    </>
  )
}

export default App
