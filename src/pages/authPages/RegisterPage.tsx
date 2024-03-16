import React from "react"
import { Link } from "react-router-dom"
import SignUp from "../../components/SignUp"
import { useTranslation } from "react-i18next"
import './styles.scss'

const RegisterPage = () => {
    const {t} = useTranslation()

    return (
        <div className="delivery-auth">
            <h2>{t("signUp")}</h2>
            <SignUp />
            <p>
                {t("alreadyHaveAnAccount")} <Link to='/login'>{t("signIn")}</Link>
            </p>
        </div>
    )
}

export default RegisterPage
