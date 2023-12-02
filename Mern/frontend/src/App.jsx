import { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//css kodlarının yapisini slick dockstan aldım 
import Detail from "./pages/Detail";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux"
import { profile } from "./redux/userSlice"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Cart from "./pages/Cart"
import Admin from "./pages/Admin"

function App() {
  const dispatch = useDispatch()
  const { user, isAuth } = useSelector(state => state.user)
  console.log(user, isAuth, "userrrr")
  useEffect(() => {
    dispatch(profile())
  }, [dispatch]);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/forgot" element={<ForgotPassword />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/reset/:token" element={<ResetPassword />} />
          <Route element={<ProtectedRoute isAdmin={false} />}>
            {/* Korumalı yonlendirme yaptım */}
            <Route exact path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} user={user} />}>
            <Route exact path="/admin" element={<Admin />} />
          </Route>
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<Detail />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
