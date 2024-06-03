import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <div className="container mx-auto flex flex-col justify-center items-center  gap-8">
      <h2 className="font-bold text-5xl mt-40">Invoice Generator</h2>
      <div className="flex flex-row gap-6">
        <Link to="/login" className="rounded-md bg-slate-800 text-white px-5 py-3 hover:bg-green-400">Login</Link>
        <Link to="/register" className="rounded-md bg-slate-800 text-white px-5 py-3 hover:bg-green-400">Register</Link>
      </div>
    </div>
  </div>
  );
};

export default Home;
