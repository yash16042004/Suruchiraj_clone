// src/pages/CheckoutPage.tsx
import React, { useState } from 'react';

const CheckoutPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚚 Shipping Address:', form);
    // ➡️ Here, send to backend or move to payment step
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold font-heading mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded font-body"
        />
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
          placeholder="Address Line 2"
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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-xl font-bold font-heading"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
