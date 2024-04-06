import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  toggleDetails: () => void;
  addToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, toggleDetails, addToCart }) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure className="h-32">
        <img src={product.image} alt={product.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title" onClick={toggleDetails}>
          {product.title}
        </h2>
        <p>${product.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
