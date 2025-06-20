import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil'; // ✅ NEW: Recoil wrapper
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import TopCategories from './components/TopCategories';
import TrendingMasalas from './components/TrendingMasalas';
import InternationalCuisine from './components/InternationalCuisine';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import SearchResults from './pages/SearchResults';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';

// CONTEXT
import { LoginModalProvider } from './context/LoginModalContext';

// Category Pages
import Veg from './pages/categories/Veg';
import NonVeg from './pages/categories/NonVeg';
import Snacks from './pages/categories/Snacks';
import Soups from './pages/categories/Soups';
import Biryani from './pages/categories/Biryani';
import SouthIndian from './pages/categories/SouthIndian';
import Maharashtrian from './pages/categories/Maharashtrian';
import Beverages from './pages/categories/Beverages';
import Pickle from './pages/categories/Pickle'; 

// Cuisine Pages
import American from './pages/cuisines/American';
import Thai from './pages/cuisines/Thai';
import Mexican from './pages/cuisines/Mexican';
import Italian from './pages/cuisines/Italian';
import Chinese from './pages/cuisines/Chinese';
import Other from './pages/cuisines/Other';

// Sub Products Page
import SubProducts from './pages/SubProducts';

const HomePage: React.FC = () => {
  return (
    <>
      <div
        className="bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/pink-blue.png')" }}
      >
        <div className="bg-black bg-opacity-50">
          <HeroSection />

          <section className="py-5">
            <WhyChooseUs />
          </section>

          <section className="py-5">
            <TopCategories />
          </section>

          <section className="py-5">
            <TrendingMasalas />
          </section>

          <section className="py-5">
            <InternationalCuisine />
          </section>

          <section className="py-5">
            <Testimonials />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <RecoilRoot> {/* ✅ Recoil context added */}
      <Router>
        <LoginModalProvider>
          <div className="font-sans text-gray-900">
            <Navbar />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <LoginModal />

            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* Top Category Pages */}
              <Route path="/categories/Veg" element={<Veg />} />
              <Route path="/categories/NonVeg" element={<NonVeg />} />
              <Route path="/categories/Snacks" element={<Snacks />} />
              <Route path="/categories/Soups" element={<Soups />} />
              <Route path="/categories/biryani" element={<Biryani />} />
              <Route path="/categories/SouthIndian" element={<SouthIndian />} />
              <Route path="/categories/Maharashtrian" element={<Maharashtrian />} />
              <Route path="/categories/Beverages" element={<Beverages />} />
              <Route path="/categories/pickle" element={<Pickle />} />

              {/* International Cuisine Pages */}
              <Route path="/cuisines/american" element={<American />} />
              <Route path="/cuisines/thai" element={<Thai />} />
              <Route path="/cuisines/mexican" element={<Mexican />} />
              <Route path="/cuisines/italian" element={<Italian />} />
              <Route path="/cuisines/chinese" element={<Chinese />} />
              <Route path="/cuisines/other" element={<Other />} />

              {/* Sub Products Page */}
              <Route path="/sub-products" element={<SubProducts />} />

              {/* Search Results Page */}
              <Route path="/search" element={<SearchResults />} />

              {/* Product Detail Page */}
              <Route path="/product/:id" element={<ProductDetailPage />} />

              {/* Checkout Page */}
              <Route path="/checkout" element={<CheckoutPage />} />
              {/* Fallback Route */}
            </Routes>
          </div>
        </LoginModalProvider>
      </Router>
    </RecoilRoot>
  );
};

export default App;
