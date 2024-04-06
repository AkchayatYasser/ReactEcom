import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

interface ProductsProps {
  addToCart: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleDetails = (product: Product) => {
    setSelectedProduct(product === selectedProduct ? null : product);
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="p-2">Products</h1>
      <label className="input input-bordered flex items-center gap-2">
        <input
          className="grow"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="grid grid-cols-1 gap-4 mt-7 md:grid-cols-2 lg:grid-cols-3">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={product === selectedProduct}
              toggleDetails={() => toggleDetails(product)}
              addToCart={() => addToCart(product)} 
            />
          ))}
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-80">
            <h2 className='text-gray-900 font-bold'>{selectedProduct.title}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} className='h-32' />
            <p className='text-gray-700 font-semibold'>${selectedProduct.price}</p>
            <p className='text-gray-900'>{selectedProduct.description}</p>
            <button className="bg-gray-900 p-2 mt-2 rounded" onClick={() => toggleDetails(selectedProduct)}>Close</button>
            </div>
        </div>
        )}

    </div>
  );
};

export default Products;
