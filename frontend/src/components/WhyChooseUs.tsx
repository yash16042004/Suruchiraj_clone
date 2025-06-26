import React, { useState } from 'react';

interface Feature {
  icon: string;
  text: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '/why choose us/I1.png',
    text: '100% Pure Ingredients',
    description: 'We use only the finest raw spices with no fillers or substitutes.',
  },
  {
    icon: '/why choose us/l2new.png',
    text: 'No Preservative',
    description: 'Our blends are 100% natural with no chemicals or preservatives.',
  },
  {
    icon: '/why choose us/I3new.png',
    text: 'Hygienic Packaging',
    description: 'Packed in clean, food-grade materials to retain freshness.',
  },
  {
    icon: '/why choose us/l4new.png',
    text: 'Traditional Blend',
    description: 'Time-tested recipes crafted by experts for authentic taste.',
  },
];

const WhyChooseUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="px-4 md:px-8 md:mt-10 text-center relative font-heading">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-10 text-white">
        Why <span className="text-yellow-400">Choose Us</span>
      </h2>

      {/* 🖥️ Desktop Layout */}
      <div className="hidden md:flex max-w-4xl mx-auto backdrop-blur-md rounded-3xl p-6 md:p-5 items-center justify-between gap-4 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.3)] bg-transparent">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-white w-full md:w-1/4 font-body"
          >
            <img
              src={feature.icon}
              className="h-20 w-20 object-contain mb-3 transition-transform duration-300 hover:scale-110"
              alt={feature.text}
            />
            <p className="text-sm md:text-base font-medium">{feature.text}</p>
          </div>
        ))}
      </div>

      {/* 📱 Mobile Layout */}
      <div className="md:hidden relative grid grid-cols-2 gap-4 max-w-md mx-auto">
        {features.map((feature, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(isActive ? null : index)}
              className={`flex flex-col items-center justify-center text-white border border-white/20 rounded-2xl backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive
                  ? 'absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 shadow-yellow-400/40 w-[90%] p-6'
                  : 'p-4 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.2)]'
              }`}
            >
              <img
                src={feature.icon}
                className={`object-contain mb-3 transition-all duration-300 ${
                  isActive ? 'h-24 w-24' : 'h-16 w-16'
                }`}
                alt={feature.text}
              />
              <p
                className={`font-medium text-center transition-all duration-300 ${
                  isActive ? 'text-base' : 'text-xs'
                }`}
              >
                {feature.text}
              </p>

              {/* Description shown only when active */}
              {isActive && (
                <p className="mt-2 text-[13px] text-white/90 text-center font-body">
                  {feature.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
