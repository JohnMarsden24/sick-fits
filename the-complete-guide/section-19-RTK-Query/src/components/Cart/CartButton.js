import classes from "./CartButton.module.css"

import { useDispatch } from "react-redux"
import { uiActions } from "../../store/ui"

import { useGetCartQuery } from "../../store/api"

const CartButton = props => {
  const dispatch = useDispatch()
  const { data } = useGetCartQuery()
  const cartQuantity = data?.totalQuantity

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  )
}

export default CartButton
