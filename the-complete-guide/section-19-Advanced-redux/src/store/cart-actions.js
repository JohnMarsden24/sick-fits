import { createAsyncThunk } from "@reduxjs/toolkit"

/*
 * USING ASYNC THUNK
 */

const firebaseUrl =
  "https://react-hooks-update-5b844-default-rtdb.firebaseio.com/cart.json"

export const fetchCartData = createAsyncThunk("cart/fetchData", async () => {
  const response = await fetch(firebaseUrl)
  if (!response.ok) throw new Error()
  const data = await response.json()
  return {
    items: data?.items || [],
    totalQuantity: data?.totalQuantity || 0,
  }
})

export const sendCartData = createAsyncThunk("cart/sendData", async cart => {
  const config = {
    method: "PUT",
    body: JSON.stringify({
      items: cart.items,
      totalQuantity: cart.totalQuantity,
    }),
  }
  const response = await fetch(firebaseUrl, config)
  if (!response.ok) throw new Error()
})

/*
 * USING CALLBACKS
 */

// import { uiActions } from "./ui"
// import { cartActions } from "./cart"

// export const fetchCartData = () => {
//   return async dispatch => {
//     const fetchData = async () => {
//       const response = await fetch(
//         "https://react-hooks-update-5b844-default-rtdb.firebaseio.com/cart.json"
//       )

//       if (!response.ok) {
//         throw new Error("Failed to get cart data")
//       }

//       return response.json()
//     }

//     try {
//       const data = await fetchData()
//       dispatch(
//         cartActions.replaceCart({
//           items: data.items || [],
//           totalQuantity: data.totalQuantity,
//         })
//       )
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: "errror",
//           title: "Error",
//           message: "Getting cart data failed",
//         })
//       )
//     }
//   }
// }

// export const sendCartData = cart => {
//   return async dispatch => {
//     dispatch(
//       uiActions.showNotification({
//         status: "pending",
//         title: "Sending...",
//         message: "Sending cart data",
//       })
//     )

//     const sendRequest = async () => {
//       const response = await fetch(
//         "https://react-hooks-update-5b844-default-rtdb.firebaseio.com/cart.json",
//         {
//           method: "PUT",
//           body: JSON.stringify({
//             items: cart.items,
//             totalQuantity: cart.totalQuantity,
//           }),
//         }
//       )

//       if (!response.ok) {
//         throw new Error("Sending cart data failed")
//       }
//     }

//     try {
//       await sendRequest()

//       dispatch(
//         uiActions.showNotification({
//           status: "success",
//           title: "Success",
//           message: "Sent cart data successfully",
//         })
//       )
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: "errror",
//           title: "Error",
//           message: "Sending cart data failed",
//         })
//       )
//     }
//   }
// }
