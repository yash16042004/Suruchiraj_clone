// ✅ Moved AuthButton outside Navbar to prevent unnecessary re-renders
import React, { useState, useEffect } from 'react';
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useLoginModal } from '../context/LoginModalContext';
import clsx from 'clsx';
import CartDrawer from './CartDrawer';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authStateAtom, userInfoAtom } from '../state/state';

const AuthButton = () => {
  const isLoggedIn = useRecoilValue(authStateAtom);
  const userData = useRecoilValue(userInfoAtom);
  const setAuthState = useSetRecoilState(authStateAtom);
  const setUserData = useSetRecoilState(userInfoAtom);
  const openLoginModal = useLoginModal().openModal;

  const handleLogout = () => {
    setAuthState(null);
    setUserData({ name: null, email: null, photo: null });
    window.location.href = `${import.meta.env.VITE_domainName}/auth/logout`;
  };

  return isLoggedIn ? (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-white hover:text-red-400 transition">
        {userData?.photo ? (
          <img
            src={userData.photo}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">{userData?.name?.[0]}</span>
          </div>
        )}
        <span className="text-sm hidden md:inline">{userData?.name?.split(' ')[0]}</span>
      </button>
      <div className="absolute right-0 mt-2 w-60 bg-white text-black rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 divide-y divide-gray-200">
        <div className="flex items-center p-4">
          <img
            src={userData.photo || "/user.png"}
            alt="profile"
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <div>
            <div className="font-semibold text-sm">{userData.name}</div>
            <div className="text-xs text-gray-500 truncate">{userData.email}</div>
          </div>
        </div>
        <div className="p-2 space-y-2">
          <Link to="/user/dashboard/profile" className="block text-sm hover:text-red-500">
            👤 Profile
          </Link>
          <Link to="/user/dashboard/orders" className="block text-sm hover:text-red-500">
            📦 My Orders
          </Link>
        </div>
        <div className="p-2">
          <button
            onClick={handleLogout}
            className="block w-full text-sm text-red-600 hover:text-red-800 text-left"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <button
      onClick={openLoginModal}
      className="flex items-center space-x-1 text-gray-300 hover:text-red-500 transition"
    >
      <FiUser className="text-xl" />
      <span className="text-sm hidden md:inline">Sign In</span>
    </button>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const trendingMasalas = [
    'Dhaniya Masala',
    'Turmeric Powder',
    'Red Chili Powder',
    'Cumin Powder',
    'Dummy Masala',
    'Chole Masala',
    'Pav Bhaji Masala',
    'Kitchen King',
    'Biryani Masala',
    'Sabzi Masala',
    'Sambar Masala',
    'Paneer Butter Masala',
  ];
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/sub-products' },
    { name: 'Contact', href: '#footer' },
    { name: 'About Us', href: '#footer' },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % trendingMasalas.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className={clsx('sticky top-0 z-50 transition-all duration-300', scrolled ? 'bg-black/50 backdrop-blur-md shadow-md' : 'bg-black')}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between font-roboto font-semibold">
          {/* Mobile */}
          <div className="flex w-full items-center justify-between md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX className="text-2xl text-yellow-400" /> : <FiMenu className="text-2xl text-yellow-400" />}
            </button>
            <Link to="/" className="text-2xl font-bold text-white hover:text-red-500 transition">Suruchiraj</Link>
            <div className="flex items-center space-x-4 text-yellow-400">
              <AuthButton />
              <button onClick={() => setIsCartOpen(true)} className="relative">
                <FiShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between w-full">
            <Link to="/" className="text-2xl font-bold text-white hover:text-red-500 transition">Suruchiraj</Link>
            <div className="flex items-center space-x-4 ml-80">
              <nav className="flex space-x-6">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.href} className="text-gray-300 hover:text-red-500 transition duration-200">{link.name}</Link>
                ))}
              </nav>
              <div className="relative w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={`Search for "${trendingMasalas[placeholderIndex]}"`}
                  className="w-full px-4 pr-1 py-2 rounded-full border font-normal border-gray-500 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                />
                <img src="search.png" alt="search" onClick={handleSearch} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <AuthButton />
              <button onClick={() => setIsCartOpen(true)} className="relative flex items-center space-x-1 text-gray-300 hover:text-red-500 transition">
                <FiShoppingCart className="text-xl" />
                <span className="text-sm">My Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden px-4 pb-4 bg-black text-white">
            <nav className="flex flex-col space-y-2 mb-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="hover:text-red-500 transition duration-200">{link.name}</Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile search */}
      <div className="md:hidden bg-black px-4 pt-3 pb-4">
        <div className="relative flex items-center">
          <div className="absolute left-3">
            <img src="search.png" alt="search" className="w-6 h-6" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={`Search for "${trendingMasalas[placeholderIndex]}"`}
            className="w-full pl-10 pr-10 py-2 rounded-full text-sm text-gray-800 bg-white focus:outline-none"
          />
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
