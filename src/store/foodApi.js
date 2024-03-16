import {createApi, fakeBaseQuery, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { firestore } from '../firebase'
import { IFood } from '../models/models'

export const foodApi = createApi({
    reducerPath: "foodApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        fetchFood: builder.query({
            async queryFn (limitValue) {
                try {
                    const foodRef = query(collection(firestore, "food"), limit(limitValue))
                    const querySnapshot = await getDocs(foodRef)
                    const filteredData = querySnapshot?.docs?.map((doc) => ({...doc.data(), id: doc.id}))
                    return {data: filteredData}
                } catch (err) {
                    return err
                }
            }
        })
    })
})

export const {useFetchFoodQuery} = foodApi