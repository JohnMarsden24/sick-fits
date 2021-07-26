import { createSlice } from "@reduxjs/toolkit"

import { fetchCartData } from "./cart-actions"

const initialState = { items: [], totalQuantity: 0, changed: false }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // replaceCart(state, action) {
    //   state.totalQuantity = action.payload.totalQuantity
    //   state.items = action.payload.items
    // },
    addItemToCart(state, action) {
      state.totalQuantity++
      state.changed = true

      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
      }
    },
    removeItemFromCart(state, action) {
      state.totalQuantity--
      state.changed = true

      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
    },
  },
  extraReducers: {
    [fetchCartData.fulfilled]: (state, action) => {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
