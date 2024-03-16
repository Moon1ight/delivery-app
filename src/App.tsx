import React, { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import HomePage from "./pages/homePage/HomePage"
import LoginPage from "./pages/authPages/LoginPage"
import RegisterPage from "./pages/authPages/RegisterPage"
import Header from "./components/header/Header"
import MenuPage from "./pages/menuPage/MenuPage"
import OrderPage from "./pages/orderPage/OrderPage"
import { useAppDispatch } from "./hooks/redux-hooks"
import CreatedOrderPage from "./pages/createdOrderPage/CreatedOrderPage"
import { useTranslation } from "react-i18next"
import { useAuth } from "./hooks/use-auth"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { setUser } from "./store/slices/userSlice"

function App() {
    const dispatch = useAppDispatch()
    const {i18n} = useTranslation()
    const navigate = useNavigate()
    const {isAuth} = useAuth()

    useEffect(()=>{
        const lng = navigator.language
        i18n.changeLanguage(lng)

        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userUpd = {
                    id: user.uid,
                    email: user.email,
                    photoUrl: user.photoURL
                } 
              dispatch(setUser(userUpd))
            } else {
                navigate('/')
            }
          }); 
    }, [])

    
    
    return (
        <div className="delivery-app">
            <Header />
            <div className="delivery-app-container container">
                {!isAuth && (
                <Routes>
                    <Route path='/' Component={HomePage} />
                    <Route path='/login' Component={LoginPage} />
                    <Route path='/register' Component={RegisterPage} />
                </Routes>
                )}
                {isAuth && (
                    <Routes>
                        <Route path='/' Component={MenuPage} />
                        <Route path='/menu' Component={MenuPage} />
                        <Route path='/order' Component={OrderPage} />
                        <Route path='/order/:id' Component={CreatedOrderPage} />
                        <Route path="*"  Component={MenuPage} />
                    </Routes>
                )}
            </div>
        </div>
        
    )
}

export default App
