import { createSlice } from "@reduxjs/toolkit";
import { IFood } from "../../models/models";

type MenuState = {
    food: IFood[],
    status: null | string,
    error: any
}

const initialState = {
    food: [],
    status: null,
    error: null
} as MenuState

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setIsFoodAdded(state, action){
            const changeFoodItem = state.food.find(item => item.id === action.payload)
            if (changeFoodItem) {
                changeFoodItem.isAddedToOrder = !changeFoodItem.isAddedToOrder
            }
        },
    }
})

export const {setIsFoodAdded} = menuSlice.actions
export default menuSlice.reducer