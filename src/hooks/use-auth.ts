import { useAppSelector } from "./redux-hooks";

export const useAuth = () => {
    const {id, accessToken, email} = useAppSelector(state => state.user)

    return {
        isAuth: !!email,
        id,
        accessToken,
        email
    }
}