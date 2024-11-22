
import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import cartReducer from './features/cartSlide'

export const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
})