// src/pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress, type Address, type AddressFormData } from '../services/addressService';
import { createOrderAndInitiatePayment } from '../services/paymentService';
import toast from 'react-hot-toast';

const CheckoutPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [form, setForm] = useState<AddressFormData>({
    addressName: '',
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const fetchedAddresses = await getAddresses();
      setAddresses(fetchedAddresses);
      
      // Set the default address as selected if available
      const defaultAddress = fetchedAddresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      } else if (fetchedAddresses.length > 0) {
        setSelectedAddress(fetchedAddresses[0]._id);
      }
    } catch (error) {
      toast.error('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setForm({
      addressName: '',
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
    setEditingAddress(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setFormLoading(true);
      
      if (editingAddress) {
        await updateAddress(editingAddress._id, form);
        toast.success('Address updated successfully');
      } else {
        await addAddress(form);
        toast.success('Address added successfully');
      }
      
      resetForm();
      fetchAddresses();
    } catch (error) {
      toast.error(editingAddress ? 'Failed to update address' : 'Failed to add address');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setForm({
      addressName: address.addressName,
      name: address.name,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      isDefault: address.isDefault,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (addressId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
        toast.success('Address deleted successfully');
        fetchAddresses();
      } catch (error) {
        toast.error('Failed to delete address');
      }
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      await setDefaultAddress(addressId);
      toast.success('Default address updated');
      fetchAddresses();
    } catch (error) {
      toast.error('Failed to set default address');
    }
  };

  const handleContinueToPayment = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    try {
      setPaymentLoading(true);
      toast.loading('Creating order and initiating payment...');
      
      const paymentResponse = await createOrderAndInitiatePayment(selectedAddress);
      
      toast.dismiss();
      toast.success('Redirecting to PhonePe payment...');
      
      // Redirect to PhonePe payment page
      window.location.href = paymentResponse.redirectUrl;
      
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to initiate payment. Please try again.');
      console.error('Payment initiation error:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading addresses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold font-heading mb-6">Delivery Address</h2>
      
      {/* Existing Addresses */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Saved Addresses</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiPlus />
            Add New Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No addresses saved yet. Add your first address to continue.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                  selectedAddress === address._id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedAddress(address._id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">{address.addressName}</span>
                    {address.isDefault && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Default</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(address);
                      }}
                      className="p-1 text-gray-600 hover:text-blue-600"
                      title="Edit address"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(address._id);
                      }}
                      className="p-1 text-gray-600 hover:text-red-600"
                      title="Delete address"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>{address.name}</strong></p>
                  <p>{address.phone}</p>
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>{address.city}, {address.state} - {address.pincode}</p>
                </div>

                {!address.isDefault && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetDefault(address._id);
                    }}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Set as default
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Address Form */}
      {showAddForm && (
        <div className="border rounded-lg p-6 bg-gray-50 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="addressName"
                placeholder="Address Name (e.g., Home, Work, Other)"
                value={form.addressName}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded font-body"
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded font-body"
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded font-sans font-normal"
            />

            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              value={form.addressLine1}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded font-body"
            />

            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2 (Optional)"
              value={form.addressLine2}
              onChange={handleChange}
              className="w-full border p-3 rounded font-body"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded font-body"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded font-body"
              />
            </div>

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded font-sans"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isDefault"
                id="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label htmlFor="isDefault" className="text-sm text-gray-700">
                Set as default address
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={formLoading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
              >
                {formLoading ? 'Saving...' : editingAddress ? 'Update Address' : 'Save Address'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Continue to Payment Button */}
      {addresses.length > 0 && selectedAddress && (
        <div className="border-t pt-6">
          <button
            onClick={handleContinueToPayment}
            disabled={paymentLoading}
            className={`w-full py-3 rounded-lg text-xl font-bold font-heading transition ${
              paymentLoading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {paymentLoading ? 'Processing...' : 'Continue to Payment'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
