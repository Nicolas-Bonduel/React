import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import Product from './pages/Product.jsx'
import User from './pages/User.jsx'
import { useDispatch } from 'react-redux'
import { getItems } from './store/slice/itemsSlice.js'
import { useEffect } from 'react'

import './App.css'

function App() {

  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [location.pathname])

  return (
    <>
      <Header />

      <span className="fixed-header-height"></span>

      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/cart'} element={<Cart />} />
        <Route path={'/user'} element={<User />} />
        <Route exact path={'/product/:id'} element={<Product />} />
        <Route path={'*'} element={<div>Not found!</div>} />
      </Routes>
    </>
  )
}

export default App
