import { firestore } from '../firebase'
import {  getDoc, doc, collection, query, orderBy, setDoc, limit } from 'firebase/firestore'

// Create order 
export const createOrder = async (order) => {
    await setDoc(doc(firestore, "orders", `${order.orderId}`),  order)
}

// Get Created order details
export const getCreatedOrder = async (id) => {
    const docRef = doc(firestore, "orders", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists) {
        const data = docSnap.data()
        return data
    }  else return null
    
}

// Orders by client id
// const q = query(citiesRef, where("state", "==", "CA"));