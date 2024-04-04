import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

interface ShoppingCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

const ShoppingCartSidebar: React.FC<ShoppingCartSidebarProps> = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'} `}>
      <div className="absolute right-0 top-0 w-80 bg-white h-full shadow-lg overflow-auto">
        <button className="absolute top-1 right-4 px-1 py-1 bg-slate-800 hover:bg-slate-900 rounded" onClick={onClose}>
          X
        </button>
        <h2 className="text-xl font-bold px-4 py-2 border-b text-gray-900">Shopping Cart</h2>
        <div className="px-4 py-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center justify-between mb-2 bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
                <div>
                  <p className="font-bold ">{item.title}</p>
                  <p className="text-gray-400">${item.price}</p>
                  <div className="flex items-center">
                    <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 text-gray-800 rounded-md" > - </button>
                    <p className="px-2">{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 text-gray-800 rounded-md" > + </button>
                  </div>
                </div>
              </div>
              <p className="font-semibold text-gray-400">Product total: ${item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700"> Remove </button>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <p className="font-semibold text-gray-900">Total:</p>
            <p className="font-semibold text-gray-900">${getTotalPrice().toFixed(2)}</p>
          </div>
          <button onClick={clearCart} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md ">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartSidebar;
