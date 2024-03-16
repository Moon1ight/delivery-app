import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderType {
    id: string, 
    title: string,
    price: number,
    foodPhoto: string,
    count: number
}

type StateType = {
    orders: OrderType[],
    totalCount: number
}

const initialState = {
    orders: [],
    totalCount: 1000
} as StateType

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addToOrder(state, action: PayloadAction<OrderType>) {
            state.orders.push(action.payload)
        },
        addOneMore(state, action) {
            const order = state.orders.find(order => order.id === action.payload)
            if (order) {
                order.count = order.count + 1
            }
        },
        removeOneMore(state, action) {
            const order = state.orders.find(order => order.id === action.payload)
            if (order && order.count > 1) {
                order.count = order.count - 1
            }
        },
        removeFromOrder(state, action) {
            state.orders = state.orders.filter(order => order.id !== action.payload)
        },
    }
})

export const {addToOrder, addOneMore,removeOneMore, removeFromOrder} = ordersSlice.actions
export default ordersSlice.reducer