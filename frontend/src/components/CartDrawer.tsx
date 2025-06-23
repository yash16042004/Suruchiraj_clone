import React from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useRecoilValue } from 'recoil';
import { authStateAtom } from '../state/state' // adjust path if needed
import { useLoginModal } from '../context/LoginModalContext'; // ✅ Modal context
import { useLocation, useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react';

interface CartDrawerProps {
  children: React.ReactNode;
  userEmail: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose}) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const authState = useRecoilValue(authStateAtom);
  const { openModal } = useLoginModal(); // ✅ Use modal context

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
  if (location.pathname === '/checkout') {
    onClose(); // ✅ Automatically close the drawer when on checkout page
  }
  }, [location.pathname]);
    const handleCheckout = () => {
      if (!authState) {
        // 🔒 Not logged in - open modal
        openModal();
      } else {
        // ✅ Logged in - proceed
        navigate('/checkout');
      }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
        <button onClick={onClose} aria-label="Close cart drawer">
          <FiX className="text-2xl text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <div className="p-4 text-gray-500 text-center">Your cart is empty</div>
      ) : (
        <>
          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border rounded-lg p-3 shadow-sm bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="text-sm px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove item"
                  aria-label={`Remove ${item.name}`}
                >
                  <FiTrash2 className="text-xl" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-4 bg-white shadow-inner">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">Total:</span>
              <span className="text-lg font-semibold text-green-600">₹{totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`w-full py-2 rounded-lg font-medium transition ${
                cart.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {authState ? 'Checkout' : 'Login to Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDrawer;
