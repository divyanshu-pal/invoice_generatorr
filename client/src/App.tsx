import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import GeneratePDF from './pages/GeneratePdf';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/"      Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/add-product" Component={AddProduct} />
          <Route path="/generate-pdf" Component={GeneratePDF} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
