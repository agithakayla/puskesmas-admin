// Import React
import React from 'react';

// Import komponen-komponen dari react-router-dom untuk routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import halaman-halaman (komponen) yang akan digunakan dalam routing
import Dashboard from './dashboard'; 
import Janji from './janji';         
import Tanya from './tanya'; 

function App() {
  return (
    // Membungkus aplikasi dengan <Router> agar bisa menggunakan fitur routing
    <Router>
      {/* <Routes> digunakan untuk mendefinisikan semua rute/halaman */}
      <Routes>
        {/* Rute ke halaman dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Rute ke halaman janji */}
        <Route path="/janji" element={<Janji />} />

        {/* Rute ke halaman tanya */}
        <Route path="/tanya" element={<Tanya />} />
      </Routes>
    </Router>
  );
}

export default App;
