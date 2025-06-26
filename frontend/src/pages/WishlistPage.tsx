import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, moveWishlistItemToCart } = useWishlist();
  const { loading: cartLoading } = useCart();

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-heading mb-8 text-yellow-400"><span className='text-white'>Your</span> Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p>Your wishlist is empty.</p>
            <Link to="/sub-products" className="text-yellow-400 underline mt-4 inline-block">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 rounded-xl shadow-md border border-white/10 flex flex-col justify-between min-h-[250px] p-3"
              >
                {/* Product Image */}
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  className="w-20 h-20 object-contain mx-auto mb-2"
                />

                {/* Product Name */}
                <h2 className="font-heading text-white text-sm text-center mb-1 break-words leading-tight line-clamp-2">
                  {item.name}
                </h2>

                {/* Price */}
                <p className="text-yellow-400 font-bold font-body text-sm text-right mb-2">
                  ₹{item.price}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-1 w-full mt-auto">
                  <button
                    className="bg-yellow-400 text-black font-button px-2 py-[3px] text-xs rounded-full hover:bg-yellow-300 transition"
                    onClick={() => moveWishlistItemToCart(String(item.id))}
                    disabled={cartLoading}
                  >
                    Move to Cart
                  </button>
                  <button
                    className="bg-red-500 text-white font-button px-2 py-[3px] text-xs rounded-full hover:bg-red-400 transition"
                    onClick={() => removeFromWishlist(String(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default WishlistPage; 