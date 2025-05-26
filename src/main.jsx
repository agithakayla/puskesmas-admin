// Import React core untuk membuat komponen React
import React from 'react';
// Import ReactDOM untuk merender aplikasi ke DOM
import ReactDOM from 'react-dom/client';
// Import komponen routing dari React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import  halaman 
import App from './admin/App';
import Dashboard from './admin/dashboard';
import Login from './admin/login';
import Janji from './admin/janji';
import Tanya from './admin/tanya';

// Mulai merender React ke elemen root di HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  // Membungkus semua route dalam <BrowserRouter> agar React Router bisa bekerja
  <BrowserRouter>
    {/* <Routes> berisi daftar <Route> untuk tiap path */}
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/janji" element={<Janji />} />
      <Route path="/tanya" element={<Tanya />} />
    </Routes>
  </BrowserRouter>
);
