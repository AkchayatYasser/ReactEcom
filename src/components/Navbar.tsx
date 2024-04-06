import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

interface NavbarProps {
  onShoppingCartClick: () => void;
  cartItems: Product[];
}

const Navbar: React.FC<NavbarProps> = ({ onShoppingCartClick, cartItems, }) => {
  return (
    <div className="max-w-screen">
      <nav className="border-gray-200 bg-blue-700">
        <div className="flex flex-wrap items-center justify-between p-4">
          <a href="/" className="flex items-center text-white uppercase font-bold">ReactStore</a>
          <div id="navbar-default">
            <a className="text-white uppercase font-bold cursor-pointer flex" onClick={onShoppingCartClick}>
                <svg className="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clipRule="evenodd"/>
                </svg>
                {cartItems.length > 0 && <p className="bg-red-500 rounded-full pb-2 pl-1 w-5 h-5 absolute text-s top-1 right-2"> {cartItems.length} </p>}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
