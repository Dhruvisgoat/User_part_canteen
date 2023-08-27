import React, { createContext, useContext, useState } from 'react';
// Create a context
export const CartContext = createContext();
import { useEffect } from 'react';

// Create a provider component

const storedCartData = localStorage.getItem('cart');
const initialCart = storedCartData ? JSON.parse(storedCartData) : [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart);

  const handleAddToCart = (food) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(item => item.id === food.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].count += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...food, count: 1 }];
      }
    });
  };

  const handleSubtractToCart = (foodId) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const itemIndex = updatedCart.findIndex(item => item.id === foodId);

      if (itemIndex !== -1) {
        if (updatedCart[itemIndex].count === 1) {
          updatedCart.splice(itemIndex, 1);
        } else {
          updatedCart[itemIndex].count -= 1;
        }
      }
      return updatedCart;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    console.log('cleared cart');
  };
   // Save cart data to localStorage whenever the cart changes
   useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('updated Cart');
  }, [cart]);

  // Provide the cart state and functions through context
  const contextValue = {
    cart,
    handleAddToCart,
    handleSubtractToCart,
    handleClearCart 
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the context values
export const useCart = () => {
  return useContext(CartContext);
};
