import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Swiper as SwiperType } from 'swiper/types';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';

interface Cuisine {
  label: string;
  image: string;
  path: string;
}

const cuisines: Cuisine[] = [
  { label: 'American', image: '/international cuisine/American Cuisine.png', path: '/cuisines/american' },
  { label: 'Chinese', image: '/international cuisine/Chinese Cuisine.png', path: '/cuisines/chinese' },
  { label: 'Mexican', image: '/international cuisine/Mexican Cuisine.png', path: '/cuisines/mexican' },
  { label: 'Thai', image: '/international cuisine/Thai Cuisine1.png', path: '/cuisines/thai' },
  { label: 'Italian', image: '/international cuisine/Italian Cuisine.png', path: '/cuisines/italian' },
  { label: 'Other', image: '/international cuisine/American Cuisine.png', path: '/cuisines/other' },
];

const InternationalCuisine: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const navigate = useNavigate();

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  const handleCuisineClick = (path: string) => {
    navigate(path);
  };

  return (
    <section id="cuisines" className="md:-mt-4 px-4 md:px-8 text-center relative font-heading -mt-7">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-10 text-white">
        International <span className="text-yellow-400">Cuisines</span>
      </h2>

      {/* ✅ MOBILE LAYOUT: Swiper Carousel View */}
      <Swiper
        spaceBetween={12}
        slidesPerView={'auto'}
        className="md:hidden px-[1vw]"
      >
        {cuisines.map((cuisine, index) => (
          <SwiperSlide key={index} style={{ width: '7rem' }}>
            <div
              onClick={() => handleCuisineClick(cuisine.path)}
              className="relative h-36 w-30 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg cursor-pointer overflow-hidden"
            >
              <div className="absolute -top-[6vw] -left-[5vw] w-[32vw] h-[32vw] rounded-full overflow-hidden">
                <img
                  src={cuisine.image}
                  alt={cuisine.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-[1.5vw] w-full text-end px-[1.5vw] text-[4vw] font-semibold text-white font-body">
                {cuisine.label}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ DESKTOP LAYOUT: Swiper */}
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

      <div className="relative max-w-5xl mx-auto overflow-visible hidden md:block">
        <Swiper
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          spaceBetween={20}
          slidesPerGroup={1}
          grabCursor={false}
          loop={false}
          pagination={{ clickable: true }}
          navigation={false}
          modules={[Navigation, Pagination]}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
          className="pb-10"
        >
          {cuisines.map((cuisine, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full overflow-visible transition-transform duration-300 hover:scale-[1.03]"
            >
              <div
                onClick={() => handleCuisineClick(cuisine.path)}
                className="relative cursor-pointer h-[240px] w-[180px] bg-transparent backdrop-blur-md rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03] border border-white/10"
              >
                <div className="absolute -top-6 -left-10 w-52 h-52 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:opacity-90">
                  <img
                    src={cuisine.image}
                    alt={cuisine.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 right-4 text-white text-lg font-semibold font-body text-right opacity-90">
                  {cuisine.label}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 pointer-events-none" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InternationalCuisine;
