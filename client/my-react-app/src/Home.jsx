import { useState, createContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { getLengthCart } from './javascript/Home'
import Header from './Header'
import BookCard from './Bookcart'
import Login from './Login'
import Register from './Register'
import Profile from './Infor'
import ProductDetail from './Detail'
import Cart from './Cart'
import Footer from './Footer'
import Checkout from './Payment'
import Orders from './Order'
import About from './About'
import Contact from './Contact'
import postLogin from './javascript/Header'
import Categories from './Categories'
import Search from './Search'
import AdminDashboard from './Dasboard'

const cartContent = createContext()

// ✅ Component này được đặt *trong* BrowserRouter, nên có thể dùng useLocation
function LayoutRoutes() {
  const location = useLocation()
  const hideHeaderFooter = location.pathname.startsWith('/dashboard')

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<BookCard />} />
        <Route path='/infor/:id' element={<Profile />} />
        <Route path='/detail/:id' element={<ProductDetail />} />
        <Route path='/cart/:id' element={<Cart />} />
        <Route path='/payment/:id/:quantity' element={<Checkout />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/category/:category' element={<Categories />} />
        <Route path='/search/:key' element={<Search />} />
        <Route path='/dashboard' element={<AdminDashboard />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default function Home() {
  const [userCheck, checkUser] = useState(false)
  const [avatar, setAvatar] = useState("")
  const [cart, setCart] = useState(0)
  const [order, setOrder] = useState(0)
  const id_user = localStorage.getItem('id')

  useEffect(() => {
    async function getUser() {
      if (id_user) {
        const response = await getLengthCart(id_user)
        setCart(response.user.cart.length)
        setOrder(response.countOrder)
        setAvatar(response.user.avatar)
      }
    }
    async function checkUser2() {
      const response = await postLogin()
      checkUser(response.message)
    }
    getUser()
    checkUser2()
  }, [])

  return (
    <BrowserRouter>
      <cartContent.Provider value={{ cart, order, userCheck,avatar, setCart, setOrder,setAvatar }}>
        {/* ✅ useLocation nằm trong BrowserRouter nên không lỗi */}
        <LayoutRoutes />
      </cartContent.Provider>
    </BrowserRouter>
  )
}

export { cartContent }
