import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from './slices/userSlice'
import menuReducer from "./slices/menuSlice";
import ordersReducer from "./slices/orderSlice";
import {foodApi} from './foodApi'
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export const store = configureStore({
    reducer: {
        user: userReducer,
        menu: menuReducer,
        orders: ordersReducer,
        [foodApi.reducerPath]: foodApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(foodApi.middleware)
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>