import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import useHttp from '../../hooks/useHttp';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import api from '../../services/api';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const mutation = useMutation((body) => api({endpoint: 'orders', method: 'POST', body}), {
    onSuccess: () => {
      setDidSubmit(true)
      cartCtx.clearCart()
    }})


  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    mutation.mutate(userData)
  }

  const modalActions = isCheckout ? <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/> : (   <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>)

  const cardModalContent = (<>{cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {modalActions}</>)

  const isLoadingContent = <p>Sending order...</p>
  const didSubmitContent = (
  <>
  <p>Successfully sent the order</p>
  <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
  </div>
  </>
)
  return (
    <Modal onClose={props.onClose}>
      {!mutation.isLoading && !didSubmit && cardModalContent}
      {mutation.isLoading && isLoadingContent}
      {didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
