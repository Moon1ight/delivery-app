import React from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Form from "./form/Form"
import { setUser } from "../store/slices/userSlice"
import { useAppDispatch } from "../hooks/redux-hooks"
import { useTranslation } from "react-i18next"

const SignUp = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {t} = useTranslation()

    const handleRegister = (email: string, password: string) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        id: user.uid,
                        token: user.refreshToken,
                        email: user.email,
                    })
                )
                navigate("/menu")
            })
            .catch(() => alert("Указаны неверные email или пароль"))
    }

    return <Form title={t("signUp")} handleClick={handleRegister} />
}

export default SignUp
