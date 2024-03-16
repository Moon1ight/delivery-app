import React from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Form from "./form/Form"
import { setUser } from "../store/slices/userSlice"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks/redux-hooks"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Button from "./button/Button"
import { useTranslation } from "react-i18next"


const SignIn = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {t} = useTranslation()

    const provider = new GoogleAuthProvider();
    const auth = getAuth()

    const handleLogin = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        id: user.uid,
                        photoUrl: user.photoURL,
                        token: user.refreshToken,
                        email: user.email,
                    })
                )
                navigate("/menu")
            })
            .catch(() => alert("Неправильный Email или пароль"))
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                dispatch(
                    setUser({
                        id: user.uid,
                        photoUrl: user.photoURL,
                        accessToken: token,
                        email: user.email,
                    })
                )
                navigate("/menu")
            })
    }

    return <div>
        <Form title={t("signIn")} handleClick={handleLogin} />
        <Button title={t("signInWithGoogle")} onClick={() => handleGoogleLogin()} />
    </div>
}

export default SignIn
