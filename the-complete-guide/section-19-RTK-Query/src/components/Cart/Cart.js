import Card from "../UI/Card"
import classes from "./Cart.module.css"
import CartItem from "./CartItem"

import { useGetCartQuery, useUpdateCartMutation } from "../../store/api"

const Cart = props => {
  const { data, error, isLoading } = useGetCartQuery()

  const [updateCart] = useUpdateCartMutation()

  const addItemToCart = newItem => {
    updateCart({ type: "add", data, newItem })
  }

  const removeItemFromCart = id => {
    updateCart({ type: "remove", data, id })
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {data &&
          data.items.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.name}
              quantity={item.quantity}
              total={item.totalPrice}
              price={item.price}
              onAdd={addItemToCart}
              onRemove={removeItemFromCart}
            />
          ))}
      </ul>
    </Card>
  )
}

export default Cart
