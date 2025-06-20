import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiHeart, FiMinus, FiPlus } from 'react-icons/fi';

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

  if (!product) return <div className="text-center text-red-500 mt-10">Product not found.</div>;

  return (
    <div className="bg-black text-white min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-6">
        {/* Left image section */}
        <div className="col-span-5 flex gap-4">
          {/* Thumbnail list */}
          <div className="flex flex-col gap-2">
            {[product.image, placeholder, placeholder, placeholder].map((img, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer border-2 transition-all duration-200 ${
                  selectedImage === img ? 'border-yellow-400' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`thumbnail-${idx}`} className="w-8 h-8 object-contain" />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full sm:w-[90vw] h-[400px] bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
            <FiHeart className="absolute top-4 right-4 text-white text-2xl" />
            <img src={selectedImage} alt={product.name} className="h-3/4 object-contain" />
          </div>
        </div>

        {/* Center Details */}
        <div className="col-span-7">
          <h1 className="text-3xl font-bold font-heading mb-2">{product.name}</h1>
          <p className="text-yellow-400 font-body mb-2">12 sold in last 10 hours</p>
          <p className="text-xl font-semibold font-body mb-3">MRP ₹ {product.price.toFixed(2)}</p>

          <div className="mb-4">
            <p className="mb-1 font-medium font-body">Select Unit</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-2xl font-button border-green-400 text-green-400">
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

          <p className="mb-2 text-xl font-body font-semibold">Subtotal :- MRP ₹ {product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4 mb-6">
            <p className="font-semibold text-2xl font-heading">Quantity</p>
            <div className="flex items-center border font-button border-white rounded-full px-4 py-1 gap-3">
              <FiMinus />
              <span>1</span>
              <FiPlus />
            </div>
            <button className="text-white font-button font-normal px-4 py-1 rounded-full border border-yellow-400 hover:brightness-125 transition duration-200">
              Add to Cart
            </button>
          </div>

          <button className="bg-yellow-400 w-1/2 py-3 text-black rounded-full font-button font-semibold">
            Buy Now
          </button>

          {/* Delivery & Policy */}
          <div className="font-body mt-6 space-y-4 text-sm">
            <p><span className="text-yellow-400 font-heading text-lg font-semibold">Delivery Info:</span>  Delivery within 15 days</p>
            <p><span className="text-yellow-400 font-heading text-lg font-semibold">Deliver to:</span>  MAHARASHTRA – Jalgaon 425201</p>
            <p><span className="text-yellow-400 font-heading text-lg font-semibold">Return Policy:</span>  In 3 days</p>
            <p><span className="text-yellow-400 font-heading text-lg font-semibold">Manufactured by:</span>  Suruchiraj Spices, Pune</p>
            <p><span className="text-yellow-400 font-heading text-lg font-semibold">Customer Care:</span>  +91 9867104406</p>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="font-body text-lg max-w-7xl mx-auto mt-12">
        <h2 className="text-2xl font-heading font-semibold mb-2">Product Details</h2>
        <p className="text-yellow-400 font-semibold">Ingredients</p>
        <p className="mb-2">Coriander, Cumin, Black Pepper, Clove, Cinnamon, Cardamom, Bay Leaf, Star Anise, Nutmeg, Mace, Chilli, Salt, Turmeric, Dry Ginger.</p>
        <p className="text-yellow-400 font-semibold">No Preservatives</p>
        <p className="text-yellow-400 font-semibold">Unit</p>
        <p className="mb-2">50g</p>
        <p className="text-yellow-400 font-semibold">Why You'll Love It</p>
        <ul className="list-disc list-inside mb-2">
          <li>Full of rich biryani aroma and taste</li>
          <li>Made with carefully selected spices</li>
          <li>Perfect for veg or non-veg biryani at home</li>
        </ul>
        <p className="text-yellow-400 font-semibold">How to Use (Simple Recipe)</p>
        <ol className="list-decimal list-inside mb-2">
          <li>Mix 1 cup curd with 2 tsp Biryani Masala. Add chicken or veggies.</li>
          <li>Marinate for 1 hour.</li>
          <li>Heat marinated mix in a pan for 5 mins.</li>
          <li>Add 1.5 cups cooked rice. Spread rice and masala in layers.</li>
          <li>Add lemon juice, mint, fried onion, and a little ghee.</li>
          <li>Cover and cook on low for 10 minutes.</li>
        </ol>
        <p><span className="text-yellow-400 font-semibold">Shelf Life</span> 12 Months</p>
      </div>

      {/* Similar Products */}
      <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-heading font-semibold mb-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(1, 5).map((p) => (
            <div key={p.id} className="bg-[#B91C1C] p-4 rounded-2xl text-white relative">
              <FiHeart className="absolute top-2 right-2 text-white" />
              <img src={p.image || placeholder} alt={p.name} className="w-full h-32 object-contain mb-2" />
              <h3 className="text-sm font-semibold mb-1">{p.name}</h3>
              <p className="text-xs mb-2">200g <span className="ml-2 text-green-400">20% off</span></p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">₹ {p.price}</span>
                <button className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs">Add Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
