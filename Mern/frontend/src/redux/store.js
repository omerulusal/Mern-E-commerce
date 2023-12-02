import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import generalSlice from './generalSlice'
import userSlice from './userSlice'
import cartSlice from './cartSlice'

export const store = configureStore({
    reducer: {
        products: productSlice,
        general: generalSlice,
        user: userSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(/* ... */), // Redux Thunk middleware'ini ekleyin
})