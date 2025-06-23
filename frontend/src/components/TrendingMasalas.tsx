import React, { useEffect, useRef, useState } from 'react';
import {
  FiHeart,
  FiPlus,
  FiMinus,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/pagination';

interface Product {
  id: number;
  name: string;
  image: string;
  bgColor: string;
  price: number;
  mrp: number;
}

const products: Product[] = [
  { id: 1, name: 'Turmeric Powder', image: '/trending masalas/turmeric.png', bgColor: 'bg-[#FFD343]', price: 49, mrp: 80 },
  { id: 2, name: 'Red Powder', image: '/trending masalas/chilli.png', bgColor: 'bg-[#C94C45]', price: 49, mrp: 80 },
  { id: 3, name: 'Dhaniya Powder', image: '/trending masalas/dhaniya.png', bgColor: 'bg-[#A89A5D]', price: 49, mrp: 80 },
  { id: 4, name: 'Dummy Masala', image: '/trending masalas/turmeric.png', bgColor: 'bg-[#eab308]', price: 49, mrp: 80 },
  { id: 5, name: 'Dummy Masala', image: '/trending masalas/chilli.png', bgColor: 'bg-[#f87171]', price: 49, mrp: 80 },
  { id: 6, name: 'Dummy Masala', image: '/trending masalas/dhaniya.png', bgColor: 'bg-[#60a5fa]', price: 49, mrp: 80 },
];

const TrendingMasalas: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [showQuantitySelector, setShowQuantitySelector] = useState<{ [key: number]: boolean }>({});
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    const initialQty: { [key: number]: number } = {};
    const initialSelector: { [key: number]: boolean } = {};
    products.forEach((product) => {
      initialQty[product.id] = 1;
      initialSelector[product.id] = false;
    });
    setQuantities(initialQty);
    setShowQuantitySelector(initialSelector);
  }, []);

  const handleWishlistToggle = (product: Product) => {
    toggleWishlist(product);
    toast.success(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    addToCart({
      id: product.id,
      name: product.name,
      quantity: qty,
      price: product.price,
    });
    toast.success(`${product.name} (x${qty}) added to cart!`);
  };

  const handleIncrement = (id: number, product: Product) => {
    setQuantities((q) => ({ ...q, [id]: (q[id] || 1) + 1 }));
    handleAddToCart(product);
  };

  const handleDecrement = (id: number) => {
    setQuantities((q) => {
      const newQty = (q[id] || 1) - 1;
      if (newQty <= 0) {
        setShowQuantitySelector((s) => ({ ...s, [id]: false }));
        return { ...q, [id]: 1 };
      }
      return { ...q, [id]: newQty };
    });
  };

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <section id="trending" className="px-4 md:px-8 text-center relative font-heading">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-10 text-white">
        Trending <span className="text-yellow-400">Masalas</span>
      </h2>

      {/* Navigation Buttons - Desktop Only */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isBeginning}
        className={`hidden md:flex absolute left-1 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full transition ${
          isBeginning
            ? 'bg-white/10 text-gray-400 cursor-not-allowed'
            : 'bg-white/20 text-white hover:bg-yellow-400 hover:text-black'
        }`}
      >
        <FiChevronLeft className="text-2xl" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
        className={`hidden md:flex absolute right-1 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full transition ${
          isEnd
            ? 'bg-white/10 text-gray-400 cursor-not-allowed'
            : 'bg-white/20 text-white hover:bg-yellow-400 hover:text-black'
        }`}
      >
        <FiChevronRight className="text-2xl" />
      </button>

      <div className="relative max-w-6xl mx-auto overflow-visible">
        <Swiper
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          spaceBetween={10}
          slidesPerGroup={1}
          grabCursor={false}
          loop={false}
          pagination={{ clickable: true }}
          navigation={false}
          modules={[Navigation, Pagination]}
          className="pb-10"
          breakpoints={{
            0: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="relative w-full overflow-visible transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* Mobile Version */}
              <div className="block md:hidden w-full max-w-[96vw] mx-auto">
                <div className="relative w-full aspect-[3/4]">
                  {product.image && (
                    <div className="relative w-full h-full rounded-t-3xl overflow-hidden">
                      <Link to={`/product/${product.id}`}>
                        <img src={product.image} alt={product.name} className="w-full h-[80%] object-cover drop-shadow-xl pointer-events-none" />
                      </Link>

                      {/* Wishlist Icon */}
                      <div
                        className="absolute top-[1vw] right-[2vw] z-50 cursor-pointer"
                        onClick={() => handleWishlistToggle(product)}
                      >
                        <FiHeart
                          className={`text-[3vw] transition ${
                            isWishlisted(product.id) ? 'text-red-500 fill-red-500' : 'text-white'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Card */}
                <div className="-mt-[12vw] w-full bg-white/10 backdrop-blur-md border-l border-r border-b border-[#6B0073]/60 rounded-b-3xl px-[3vw] py-[4vw] text-white">
                  {/* Product Name + 50g */}
                  <div className="w-full mb-[1.5vw]">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-[2.8vw] font-semibold font-body truncate">
                        {product.name}
                      </h3>
                      <span className="text-[2vw] text-gray-300 font-sans font-medium mt-[0.5vw] block">
                        50g
                      </span>
                    </Link>
                  </div>

                  {/* Price + Discount */}
                  <div className="w-full flex items-center justify-between mb-[2vw]">
                    <div className="text-[3vw] font-semibold font-sans text-white">
                      ₹<span className="line-through text-gray-300">{product.mrp}</span>{' '}
                      <span className="text-white">{product.price}</span>
                    </div>
                    <div className="text-[2vw] bg-lime-400 text-black font-semibold px-[1.5vw] py-[0.5vw] rounded-full w-fit font-button">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                    </div>
                  </div>

                  {/* Add to Cart or Quantity Controls */}
                  <div className="w-full">
                    {!showQuantitySelector[product.id] ? (
                      <button
                        onClick={() => {
                          setShowQuantitySelector((s) => ({ ...s, [product.id]: true }));
                          setQuantities((q) => ({ ...q, [product.id]: 1 }));
                          handleAddToCart(product);
                        }}
                        className="w-full h-[7vw] bg-yellow-400 hover:bg-yellow-300 text-black font-semibold font-button rounded-full flex items-center justify-center text-[3.5vw] shadow-md transition-all duration-200 ease-in-out"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex justify-between items-center w-full bg-yellow-400 text-black rounded-full px-[3vw] py-[1vw] text-[3.5vw] font-semibold font-button shadow-md">
                        <button onClick={() => handleDecrement(product.id)}><FiMinus /></button>
                        <span>{quantities[product.id]}</span>
                        <button onClick={() => handleIncrement(product.id, product)}><FiPlus /></button>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Desktop Version */}
              <div className="hidden md:block">
                <div className="absolute -top-0 inset-x-0 z-40 px-2 pointer-events-drag cursor-pointer">
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} className="h-full w-full object-fill drop-shadow-xl pointer-events-none cursor-pointer" />
                    </Link>
                    <div
                      className="absolute top-1 right-2 z-50 cursor-pointer"
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <FiHeart
                        className={`text-xl transition ${
                          isWishlisted(product.id) ? 'text-red-500 fill-red-500' : 'text-white'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-[200px] px-2 pt-0">
                  <div className="bg-transparent backdrop-blur-xl border-l border-r border-b border-[#6B0073]/60 rounded-b-3xl p-4 pb-5 text-white relative w-full">
                    
                    {/* Price + Discount */}
                    <div className="flex items-center justify-between w-full mb-1">
                      <div className="text-lg text-white font-sans">
                        ₹ <span className="line-through text-gray-400">{product.mrp}</span>{' '}
                        <span className="font-semibold">{product.price}</span>
                      </div>
                      <div className="text-xs bg-lime-400 text-black font-semibold px-2 py-0.5 rounded-full font-button">
                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                      </div>
                    </div>

                    {/* Product Name */}
                    <div className="mb-2 w-full">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-base font-semibold font-body truncate w-full text-left flex items-center gap-2">
                          {product.name}
                          <span className="text-sm text-gray-300 font-sans font-normal">(50g)</span>
                        </h3>
                      </Link>
                    </div>

                    {/* Add to Cart or Quantity Buttons */}
                    <div className="w-full">
                      {!showQuantitySelector[product.id] ? (
                        <button
                          onClick={() => {
                            setShowQuantitySelector((s) => ({ ...s, [product.id]: true }));
                            setQuantities((q) => ({ ...q, [product.id]: 1 }));
                            handleAddToCart(product);
                          }}
                          className="w-full bg-yellow-400 text-black px-3 py-1 text-sm rounded-full font-semibold hover:brightness-110 transition font-button"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex justify-between items-center w-full bg-yellow-400 rounded-full px-4 py-1 text-black text-sm font-button">
                          <button onClick={() => handleDecrement(product.id)}><FiMinus /></button>
                          <span>{quantities[product.id]}</span>
                          <button onClick={() => handleIncrement(product.id, product)}><FiPlus /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingMasalas;
