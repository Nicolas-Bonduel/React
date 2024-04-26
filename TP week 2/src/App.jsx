import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import PostDetail from './components/PostDetail.jsx'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/detail/:postId'} element={<PostDetail />} />

        <Route path={'*'} element={<div>Not found!</div>} />
      </Routes>

    </>
  )
}

export default App
