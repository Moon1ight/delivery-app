import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/use-auth"
import { useTranslation } from "react-i18next"
import './styles.scss'

const HomePage = () => {
    const {t} = useTranslation()
    const { isAuth } = useAuth()

    if (!isAuth) return <Navigate to='/login' replace />

    return (
        <div className="delivery-home">
            <div className="delivery-home-banner">
                <div>{t('welcome')}</div>
            </div>
        </div>
    )
}

export default HomePage
