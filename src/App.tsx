import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import ShoppingCartSidebar from './components/ShoppingCartSidebar';

import './App.css';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

function App() {
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const toggleShoppingCart = () => {
    setIsShoppingCartOpen(!isShoppingCartOpen);
  };

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Navbar onShoppingCartClick={toggleShoppingCart} cartItems={cartItems} />
      <Products addToCart={addToCart} />
      <ShoppingCartSidebar
        isOpen={isShoppingCartOpen}
        onClose={toggleShoppingCart}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
    </>
  );
}

export default App;
