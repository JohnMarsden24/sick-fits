import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

export default function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => setCartOpen((prev) => !prev);

  const closeCart = () => setCartOpen(false);

  const openCart = () => setCartOpen(true);

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const context = useContext(LocalStateContext);

  return context;
}

export { useCart };
