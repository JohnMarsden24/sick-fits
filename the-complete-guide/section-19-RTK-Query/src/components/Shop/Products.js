import { useGetCartQuery, useUpdateCartMutation } from "../../store/api"

import ProductItem from "./ProductItem"
import classes from "./Products.module.css"

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My first book",
    description: "My first book",
  },
  {
    id: "p2",
    price: 8,
    title: "My second book",
    description: "My second book",
  },
]

const Products = props => {
  const { data, error, isLoading } = useGetCartQuery()

  const [updateCart] = useUpdateCartMutation()

  const addItemToCart = newItem => {
    updateCart({ type: "add", data, newItem })
  }

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            onAdd={addItemToCart}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products
