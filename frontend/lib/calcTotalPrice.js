export default function calcTotalPrice(cart) {
  return cart.reduce((prev, curr) => {
    if (!curr.product) return prev;

    return prev + curr.quantity * curr.product.price;
  }, 0);
}
