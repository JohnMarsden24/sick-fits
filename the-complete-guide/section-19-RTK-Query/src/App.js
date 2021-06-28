import { useSelector } from "react-redux"

import Cart from "./components/Cart/Cart"
import Layout from "./components/Layout/Layout"
import Products from "./components/Shop/Products"
import Notification from "./components/UI/Notification"

import { useGetCartQuery } from "./store/api"

function App() {
  const { error, isLoading } = useGetCartQuery()

  const showCart = useSelector(state => state.ui.showCart)

  return (
    <>
      {(error || isLoading) && (
        <Notification hasError={error} isLoading={isLoading} />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  )
}

export default App
