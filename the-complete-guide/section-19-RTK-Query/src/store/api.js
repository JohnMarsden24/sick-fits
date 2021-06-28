import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const copyData = data => ({
  items: data.items.map(item => {
    return { ...item }
  }),
  totalQuantity: data.totalQuantity,
})

const addItemToCart = ({ newItem, data }) => {
  const newData = copyData(data)
  newData.totalQuantity++

  const existingItem = newData.items.find(item => item.id === newItem.id)

  if (!existingItem) {
    newData.items.push({
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

  return newData
}

const removeItemFromCart = ({ id, data }) => {
  const newData = copyData(data)
  newData.totalQuantity--

  const existingItem = newData.items.find(item => item.id === id)

  if (existingItem.quantity === 1) {
    newData.items = newData.items.filter(item => item.id !== id)
  } else {
    existingItem.quantity--
    existingItem.totalPrice -= existingItem.price
  }

  return newData
}

const firebaseUrl =
  "https://react-hooks-update-5b844-default-rtdb.firebaseio.com/"

// Define a service using a base URL and expected endpoints
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: firebaseUrl }),
  tagTypes: ["cart"],
  endpoints: builder => ({
    getCart: builder.query({
      query: () => "cart.json",
      transformResponse: response => {
        return {
          items: response?.items || [],
          totalQuantity: response?.totalQuantity || 0,
        }
      },
      providesTags: ["cart"],
    }),
    updateCart: builder.mutation({
      query: options => ({
        url: "cart.json",
        method: "PUT",
        body:
          options.type === "add"
            ? addItemToCart(options)
            : removeItemFromCart(options),
      }),
      invalidatesTags: ["cart"],
    }),
  }),
})

export const { useGetCartQuery, useUpdateCartMutation } = api

export default api
