import React, { useState } from 'react'
import './styles.scss'
import Button from '../button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { removeUser } from '../../store/slices/userSlice'
import { useAuth } from '../../hooks/use-auth'
import { NavLink } from 'react-router-dom'
import CartIcon from '../Icons/CartIcon'
import { useTranslation } from 'react-i18next'
import MenuBurger from '../Icons/MenuBurger'
import { getAuth, signOut } from 'firebase/auth'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuth } = useAuth()
  const user = useAppSelector(state => state.user)
  const {orders} = useAppSelector(state => state.orders)
  const dispatch = useAppDispatch()
  const auth = getAuth()
  const {t, i18n} = useTranslation()

  const changeLanguage = (language: any) => {
    i18n.changeLanguage(language)
  }  

  const logoutHandler = () => {
    signOut(auth).then(() => {
      dispatch(removeUser())
      setIsOpen(false)
    })
  }

  return (
    <div className='delivery-header'>
     <div className='delivery-header-container'>
      <div className='delivery-header-logo'>
          <div>APPTRIX</div>
        </div>
        {isAuth && (
          <>
            <div className={isOpen ? 'delivery-header-mobile-links' : 'delivery-header-links'}>
              <NavLink 
                className={({isActive}) => isActive ? "link-active" : "link"} 
                to="/menu" 
                onClick={() => setIsOpen(false)}
              >
                {t("menu")}
              </NavLink>
              <NavLink 
                className={({isActive}) => isActive ? "link-active" : "link"} 
                to="/order"
                onClick={() => setIsOpen(false)}
              >
                {CartIcon()} <div>{orders?.length}</div>
              </NavLink>
              <div className='delivery-header-language'>
                  <button onClick={() => changeLanguage("ru")}>ru</button>
                  <button onClick={() => changeLanguage("en")}>en</button>
              </div>
              <div className='delivery-header-links-auth'>
                {isAuth  &&
                  <Button title={t("logout")} onClick={() => logoutHandler()}/> 
                }
              </div>
              
              {user.photoUrl && (
                  <div className='delivery-header-links-user'>
                    <img alt="user avatar" src={user?.photoUrl} />
                  </div>
              )}
            </div>
            <button className='delivery-header-mobile-btn' onClick={() => setIsOpen((prev) => !prev)}>
              {MenuBurger()}
            </button>
          </>
        )}
     </div>
    </div>
  )
}

export default Header