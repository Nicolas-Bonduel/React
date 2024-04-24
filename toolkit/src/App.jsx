import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path={'/'} element={<Home />} />

        <Route path={'*'} element={<div>Not found!</div>} />
      </Routes>

    </>
  )
}

export default App
