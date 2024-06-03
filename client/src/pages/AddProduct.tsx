

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../features/product/ProductSlice';
import { RootState, AppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';

const AddProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);
  const [rate, setRate] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const { loading, error } = useSelector((state: RootState) => state.product);


  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProduct({ name, qty, rate }))
      .unwrap()
      .then(() => {
       
        setName('');
        setQty(0);
        setRate(0);
      })
      .catch((err: any) => {
        console.error('Add product error:', err);
      });
  };

    const handleNext = () => {
    navigate('/generate-pdf');
  };

  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + product.total, 0);
  };
  const calculateGST = (amount: number) => {
    return (amount * 0.18).toFixed(2);
  };

  const totalAmount = calculateTotal();
  const gstAmount = calculateGST(totalAmount);

  return (
   

    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md flex space-x-8">
      <div className="w-1/2">
        <h2 className="text-2xl mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Rate</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 hover:bg-green-400"
          >
            Add Product
          </button>
          {error && <p className="text-red-500">{error.message}</p>}
        </form>
        <button
          onClick={handleNext}
          disabled={products.length === 0}
          className="w-full mt-4 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-green-400 cursor-pointer"
        >
          Next
        </button>
      </div>
      <div className="w-1/2">
        <h3 className="text-2xl mb-4">Product List</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Product</th>
              <th className="py-2">Qty</th>
              <th className="py-2">Rate</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.qty}</td>
                <td className="py-2">{product.rate}</td>
                <td className="py-2">{product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8">
          <div className="flex justify-between">
            <span>Total:</span>
            <span>INR {totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%):</span>
            <span>INR {gstAmount}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Grand Total:</span>
            <span>INR {(totalAmount + parseFloat(gstAmount)).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddProduct;
