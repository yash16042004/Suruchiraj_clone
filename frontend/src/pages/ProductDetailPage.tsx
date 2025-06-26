import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiHeart, FiMinus, FiPlus } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import DeliveryLocation from '../components/DeliveryLocation';

const products = [
  { id: 1, name: 'Turmeric Powder', image: '/trending masalas/turmeric.png', price: 49, mrp: 80 },
  { id: 2, name: 'Red Powder', image: '/trending masalas/chilli.png', price: 49, mrp: 80 },
  { id: 3, name: 'Dhaniya Powder', image: '/trending masalas/dhaniya.png', price: 49, mrp: 80 },
  { id: 4, name: 'Dummy Masala', image: '/trending masalas/turmeric.png', price: 49, mrp: 80 },
  { id: 5, name: 'Dummy Masala', image: '/trending masalas/chilli.png', price: 49, mrp: 80 },
  { id: 6, name: 'Dummy Masala', image: '/trending masalas/dhaniya.png', price: 49, mrp: 80 },
];

const placeholder = '/placeholder.png';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(product?.image || placeholder);
  const [quantity, setQuantity] = useState(1);

  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return <div className="text-center text-red-500 mt-10">Product not found.</div>;

  const wishlisted = isWishlisted(product.id);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      quantity,
      price: product.price,
    });
    toast.success(`${product.name} (x${quantity}) added to cart!`);
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-6">
        {/* Left image section */}
        <div className="col-span-5 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails (mobile below, desktop left) */}
          <div className="flex md:flex-col gap-2 justify-center">
            {[product.image, placeholder, placeholder, placeholder].map((img, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer border-2 transition-all duration-200 ${
                  selectedImage === img ? 'border-yellow-400' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`thumbnail-${idx}`} className="w-8 h-8 object-contain" />
              </div>
            ))}
          </div>

          {/* Main image */}
          <div className="relative w-full sm:w-[90vw] md:w-full h-[300px] sm:h-[400px] bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
            <FiHeart
              className={`absolute top-4 right-4 text-2xl cursor-pointer transition-all ${
                wishlisted ? 'text-yellow-400' : 'text-white'
              }`}
              onClick={handleWishlistToggle}
            />
            <img src={selectedImage} alt={product.name} className="h-3/4 object-contain" />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-span-7">
          <h1 className="text-2xl sm:text-3xl font-bold font-heading mb-2">{product.name}</h1>
          <p className="text-yellow-400 font-body mb-2">12 sold in last 10 hours</p>
          <p className="text-xl font-semibold font-sans mb-3">₹{Math.round(product.price)}</p>

          <div className="mb-4">
            <p className="mb-1 font-medium font-body">Select Unit</p>
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-2 border rounded-2xl font-button border-yellow-400 text-yellow-400">
                100g<br /><span className="text-xs font-body">7% off</span>
              </button>
              <button className="px-4 py-2 border rounded-2xl font-button border-red-400 text-red-400">
                50g<br /><span className="text-xs font-body">Out of stock</span>
              </button>
              <button className="px-4 py-2 border rounded-2xl font-button border-yellow-400 text-yellow-400">
                200g<br /><span className="text-xs font-body">10% off</span>
              </button>
            </div>
          </div>

          <p className="mb-2 text-xl font-sans font-semibold">
            <span className="text-white text-2xl font-heading">Subtotal</span>:- ₹{Math.round(product.price * quantity)}
          </p>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <p className="font-semibold text-2xl font-heading">Quantity</p>
            <div className="flex items-center border font-button border-white rounded-full px-4 py-1 gap-3">
              <button onClick={() => handleQuantityChange(-1)}><FiMinus /></button>
              <span className="font-sans">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}><FiPlus /></button>
            </div>
            <button
              className="text-white font-button font-normal px-4 py-1 rounded-full border border-yellow-400 hover:brightness-125 transition duration-200"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          <button className="bg-yellow-400 w-full sm:w-1/2 py-3 text-black rounded-full font-button font-semibold">
            Buy Now
          </button>

          {/* Delivery & Policy */}
          <div className="font-body mt-6 space-y-4 text-sm">
            <p>
              <span className="text-yellow-400 font-heading text-lg font-semibold">Delivery Info:</span>{" "}
              Delivery within <span className="font-sans">15</span> days
            </p>
            <DeliveryLocation />
            <p>
              <span className="text-yellow-400 font-heading text-lg font-semibold">Manufactured by:</span>{" "}
              Suruchiraj Spices, Pune
            </p>
            <p>
              <span className="text-yellow-400 font-heading text-lg font-semibold">Customer Care:</span>{" "}
              <span className="font-sans">+91 9867104406</span>
            </p>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="font-body text-lg max-w-7xl mx-auto mt-12">
        <h2 className="text-2xl font-heading font-semibold mb-2">Product Details</h2>
        <p className="text-yellow-400 font-semibold">Ingredients</p>
        <p className="mb-2">
          Coriander, Cumin, Black Pepper, Clove, Cinnamon, Cardamom, Bay Leaf,
          Star Anise, Nutmeg, Mace, Chilli, Salt, Turmeric, Dry Ginger.
        </p>
        <p className="text-yellow-400 font-semibold">No Preservatives</p>
        <p className="text-yellow-400 font-semibold">Unit</p>
        <span className="font-sans">50g</span>
        <p className="text-yellow-400 font-semibold">Why You'll Love It</p>
        <ul className="list-disc list-inside mb-2">
          <li>Full of rich biryani aroma and taste</li>
          <li>Made with carefully selected spices</li>
          <li>Perfect for veg or non-veg biryani at home</li>
        </ul>
        <p className="text-yellow-400 font-semibold">How to Use (Simple Recipe)</p>
        <ol className="list-decimal list-inside mb-2">
          <li>Mix <span className="font-sans">1</span> cup curd with <span className="font-sans">2</span> tsp Biryani Masala. Add chicken or veggies.</li>
          <li>Marinate for <span className="font-sans">1</span> hour.</li>
          <li>Heat marinated mix in a pan for <span className="font-sans">5</span> mins.</li>
          <li>Add <span className="font-sans">1.5</span> cups cooked rice. Spread rice and masala in layers.</li>
          <li>Add lemon juice, mint, fried onion, and a little ghee.</li>
          <li>Cover and cook on low for <span className="font-sans">10</span> minutes.</li>
        </ol>
        <p><span className="text-yellow-400 font-semibold">Shelf Life</span> <span className="font-sans">12</span> Months</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
