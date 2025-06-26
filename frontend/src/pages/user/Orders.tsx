// src/pages/user/Orders.tsx
import React, { useState, useEffect } from 'react';
import { userApi } from '../../api/userApi';
import { toast } from 'react-hot-toast';

interface OrderItem {
  productName: string;
  price: number;
  quantity: number;
}

interface DeliveryAddress {
  addressName: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: DeliveryAddress;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'N/A';
  createdAt: string;
  updatedAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await userApi.getOrders();
      setOrders(response.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'text-green-500 bg-green-100';
      case 'pending':
      case 'confirmed':
        return 'text-yellow-500 bg-yellow-100';
      case 'shipped':
        return 'text-blue-500 bg-blue-100';
      case 'failed':
      case 'cancelled':
        return 'text-red-500 bg-red-100';
      case 'N/A':
        return 'text-gray-500 bg-gray-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    if (status === 'N/A') return 'N/A';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-6 font-heading text-white">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 font-body">
            <div className="text-gray-200 text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-600">Start shopping to see your order history here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Orders List */}
            <div className="grid gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => handleOrderClick(order)}
                  className="bg-white p-6 font-body rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold font-sans text-gray-800">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-gray-600 font-sans text-sm">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-800 font-sans">
                        ₹{order.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-sm font-sans text-gray-600">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="flex space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Payment:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus)}`}>
                        {getStatusText(order.paymentStatus)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Delivery:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {getStatusText(order.orderStatus)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="space-y-2">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {item.productName} x {item.quantity}
                        </span>
                        <span className="text-gray-800 font-medium font-sans">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-gray-600 text-sm">
                        +{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-yellow-600 text-sm font-medium">
                      Click to view details →
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-200 font-body rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold font-body text-gray-800">
                    Order Details
                  </h2>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Order Header */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-sans font-semibold text-gray-800">
                        Order #{selectedOrder._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Placed on {formatDate(selectedOrder.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold font-sans  text-gray-800">
                        ₹{selectedOrder.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Payment Status</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.paymentStatus)}`}>
                      {getStatusText(selectedOrder.paymentStatus)}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Delivery Status</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.orderStatus)}`}>
                      {getStatusText(selectedOrder.orderStatus)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Order Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{item.productName}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold font-sans text-gray-800">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Delivery Address</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-800">{selectedOrder.deliveryAddress.name}</p>
                    <p className="text-gray-600 font-sans">{selectedOrder.deliveryAddress.phone}</p>
                    <p className="text-gray-700">{selectedOrder.deliveryAddress.addressLine1}</p>
                    {selectedOrder.deliveryAddress.addressLine2 && (
                      <p className="text-gray-700">{selectedOrder.deliveryAddress.addressLine2}</p>
                    )}
                    <p className="text-gray-700">
                      {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} - {selectedOrder.deliveryAddress.pincode}
                    </p>
                  </div>
                </div>

                {/* Order Timeline */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Order Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-gray-800 font-medium">Order Placed</p>
                        <p className="text-gray-600 font-sans text-sm">{formatDate(selectedOrder.createdAt)}</p>
                      </div>
                    </div>
                    {selectedOrder.orderStatus !== 'pending' && selectedOrder.orderStatus !== 'N/A' && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-gray-800 font-medium">Order Confirmed</p>
                          <p className="text-gray-600 text-sm">{formatDate(selectedOrder.updatedAt)}</p>
                        </div>
                      </div>
                    )}
                    {selectedOrder.orderStatus === 'N/A' && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div>
                          <p className="text-gray-800 font-medium">Delivery Partner Not Integrated</p>
                          <p className="text-gray-600 text-sm">Delivery service will be available soon</p>
                        </div>
                      </div>
                    )}
                    {selectedOrder.orderStatus === 'shipped' && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="text-gray-800 font-medium">Order Shipped</p>
                          <p className="text-gray-600 text-sm">In transit</p>
                        </div>
                      </div>
                    )}
                    {selectedOrder.orderStatus === 'delivered' && (
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-gray-800 font-medium">Order Delivered</p>
                          <p className="text-gray-600 text-sm">Successfully delivered</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
