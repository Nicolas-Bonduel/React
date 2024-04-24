import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import { useSelector } from 'react-redux'

function App() {

  const debugger_ = useSelector((state) => state.debugger.actions);

  return (
    <>
      <Header />

      <Routes>
        <Route path={'/'} element={<Home />} />

        <Route path={'*'} element={<div>Not found!</div>} />
      </Routes>

      <div id="logs">
        <h3>Logs :</h3>
        {
          debugger_.map((action) => <pre>{JSON.stringify(action, null, 2)}</pre>)
        }
      </div>

    </>
  )
}

export default App
