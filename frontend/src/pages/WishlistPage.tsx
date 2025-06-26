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
        <h1 className="text-3xl font-bold mb-8 text-yellow-400">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p>Your wishlist is empty.</p>
            <Link to="/sub-products" className="text-yellow-400 underline mt-4 inline-block">Browse Products</Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="flex items-center bg-[#181818] rounded-xl p-4 shadow-md">
                <img src={item.image || '/placeholder.png'} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-6" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                  <p className="text-yellow-400 font-bold text-lg mb-2">₹{item.price}</p>
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold hover:bg-yellow-300 transition"
                      onClick={() => moveWishlistItemToCart(String(item.id))}
                      disabled={cartLoading}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded-full font-semibold hover:bg-red-400 transition"
                      onClick={() => removeFromWishlist(String(item.id))}
                    >
                      Remove
                    </button>
                  </div>
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