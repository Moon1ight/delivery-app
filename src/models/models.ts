export interface IUser {
    id: string | null,
    accessToken: string | null,
    email: string | null,
    photoUrl: string | null,
}

export interface IFood {
    id: string, 
    title: string,
    description: string,
    price: number,
    foodPhoto: string,
    isAddedToOrder?: boolean
}

type OrderType = {
    0: string,
    1: number
}

export interface IOrder {
    userId: string,
    orderId: string, 
    deliveryAddress: string,
    orders: OrderType[],
    payment: string,
    totalPrice: number
}