// src/contexts/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext); // Correct context name

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
