import React from "react"
import { Link } from "react-router-dom"
import SignIn from "../../components/SignIn"
import { useTranslation } from "react-i18next"
import './styles.scss'

const LoginPage = () => {
    const {t} = useTranslation()
    return (
        <div className="delivery-auth">
            <h2>{t('signIn')}</h2>
            <SignIn />
            <p>
                {t("or")} <Link to='/register'>{t("signUp")}</Link>
            </p>
        </div>
    )
}

export default LoginPage
