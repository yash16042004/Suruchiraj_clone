import { useState, useEffect } from 'react';
import { FiFilter, FiHeart, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getAllProducts } from '../services/productService';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { searchTermAtom } from '../state/state';
import type { Product } from '../types/product';

const filters = {
  quantity: ['50 g', '100 g', '500 g'],
  categories: [
    'Veg', 'Non Veg', 'Maharashtrian', 'Snacks', 'Beverages',
    'Rice', 'Pickle', 'South Indian', 'Soups', 'American',
    'Chinese', 'Italian', 'Mexican', 'Thai', 'Other',
  ],
};

const SubProducts = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, removeFromCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const searchTerm = useRecoilValue(searchTermAtom);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleWishlistToggle = (product: Product) => {
    toggleWishlist(product);
    const msg = isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist';
    toast.success(msg);
  };

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-black text-white min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      {/* Mobile Filter Toggle */}
      <div className="sm:hidden flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-yellow-400">Products</h1>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="text-white flex items-center space-x-1 text-sm border px-3 py-1 rounded-full"
        >
          <FiFilter />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar (Desktop Only) */}
        <aside className="w-60 bg-black text-white hidden sm:block">
          <h2 className="text-2xl font-medium text-yellow-400 font-body mb-4">Filters</h2>
          <div className="mb-6 font-body">
            <h3 className="font-semibold font-heading text-xl mb-2">Quantity</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {filters.quantity.map((qty) => (
                <li key={qty}>
                  <label className="inline-flex items-center space-x-2">
                    <input type="checkbox" className="w-5 h-5 appearance-none border-2 border-yellow-400 rounded bg-black checked:bg-yellow-400 checked:border-yellow-400 transition-colors duration-200" />
                    <span>{qty}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-heading text-xl mb-2">Category</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {filters.categories.map((cat) => (
                <li key={cat}>
                  <label className="inline-flex items-center space-x-2">
                    <input type="checkbox" className="w-5 h-5 appearance-none border-2 border-yellow-400 rounded bg-black checked:bg-yellow-400 checked:border-yellow-400 transition-colors duration-200" />
                    <span>{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 font-body">
          <div className="hidden sm:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Products</h1>
            <span className="text-sm text-white font-medium cursor-pointer">All Categories</span>
          </div>

          {loading ? (
            <p className="text-white text-center">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {filteredProducts.map((product) => {
                const quantity = cart[product.id]?.quantity || 0;

                return (
                  <div
                    key={product.id}
                    className="bg-[#141414] rounded-2xl overflow-hidden relative group transition transform hover:-translate-y-1"
                  >
                    {/* Wishlist Icon */}
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={() => handleWishlistToggle(product)}
                        className="text-white text-sm"
                      >
                        <FiHeart
                          className={`text-lg transition ${
                            isWishlisted(product.id)
                              ? 'text-red-500 fill-red-500'
                              : 'text-white'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-36 object-cover"
                    />

                    {/* Product Info */}
                    <div className="p-3 pt-4 text-white bg-[#141414]">
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <div className="flex items-center font-sans space-x-2 text-sm mt-1">
                        <span className="text-green-400 font-semibold">
                          ₹{Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                        </span>
                        <span className="line-through text-gray-400">₹{product.mrp}</span>
                        <span className="font-semibold">₹{product.price}</span>
                      </div>
                      <div className="text-xs font-sans text-gray-300 mt-1">{product.weight}</div>

                      {quantity === 0 ? (
                        <button
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                            })
                          }
                          className="mt-3 w-full bg-yellow-400 text-black text-sm font-semibold py-1.5 rounded-full hover:bg-yellow-300 transition"
                        >
                          Add Cart
                        </button>
                      ) : (
                        <div className="mt-3 flex items-center justify-between bg-yellow-400 rounded-full px-3 py-1.5 text-black font-semibold text-sm">
                          <button
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                              })
                            }
                            className="px-2"
                          >
                            +
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="px-2"
                          >
                            −
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 sm:hidden flex justify-end"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="bg-black w-3/4 max-w-xs p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold font-heading">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-white hover:text-red-400"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mb-6 font-body">
              <h3 className="font-medium font-heading text-xl mb-2">Quantity</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {filters.quantity.map((qty) => (
                  <li key={qty}>
                    <label className="inline-flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox accent-yellow-400" />
                      <span>{qty}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold font-heading text-xl mb-2">Category</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {filters.categories.map((cat) => (
                  <li key={cat}>
                    <span className="cursor-pointer hover:text-yellow-400">{cat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubProducts;
