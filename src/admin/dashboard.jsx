// Import React untuk membuat komponen
import React, { useEffect } from 'react';

// Import Link untuk navigasi antar halaman, useNavigate untuk navigasi programatik
import { Link, useNavigate } from 'react-router-dom';
// Import file CSS khusus untuk tampilan dashboard
import './dash.css';

const Dashboard = () => {
  useEffect(() => {
    let link = document.querySelector;
    link.href = './public/image/logo.png';  //logo buat di tab
    
    //  judul tab 
    document.title = 'Admin | Puskesmas Pondok Rumput';
  }, []);


  const navigate = useNavigate();

  return (
    <div className="container fullscreen">
      {/* Bagian Navbar */}
      <nav className="navbar">
        <div className="logo">Puskesmas Pondok Rumput</div>

        <div className="nav-buttons">
          {/* Tombol Login akan menavigasi ke halaman /login saat diklik */}
          <button className="login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
          {/* Tombol Daftar - belum dikaitkan ke halaman tertentu */}
          <button className="signup-btn">Daftar</button>
        </div>
      </nav>

      {/* Bagian Hero - biasanya untuk headline utama */}
      <section className="hero">
        <div className="hero-text">
          <h1>Tempat Terbaik untuk Konsultasi Medis dan Perawatan Anda</h1>
          <p>
            Kami memahami bahwa keluhan kesehatan bisa datang tiba-tiba. Tim dokter kami siap membantu menjawab pertanyaan dan memberikan saran medis kapan saja.
          </p>

          {/* Tombol untuk membuat janji temu, menggunakan Link */}
          <Link to="/janji" className="appointment-btn">
            Buat Janji Temu
          </Link>

          {/* Statistik singkat */}
          <div className="stats">
            <div><strong>24/7</strong> Emergency Service</div>
            <div><strong>80+</strong> Specialist Doctor</div>
            <div><strong>100k+</strong> Happy Patient</div>
          </div>
        </div>

        {/* Gambar utama hero */}
        <div className="hero-image">
          <img src="/image/dokter.png" alt="Doctor" />
        </div>
      </section>

      {/* Bagian Tentang Kami */}
      <section class="about">
        <h1>Tentang Kami</h1>
        <p>
          Puskesmas Pondok Rumput merupakan pusat pelayanan kesehatan masyarakat tingkat pertama yang berkomitmen untuk memberikan pelayanan kesehatan terbaik kepada masyarakat.
        </p>
        <p>
          Dengan tenaga medis profesional dan fasilitas yang memadai, kami menyediakan berbagai layanan seperti pemeriksaan umum, imunisasi, layanan ibu dan anak, serta kesehatan gigi dan mulut.
        </p>
        <h1>Visi Misi Kami</h1>
        <p>
          Visi kami adalah menjadi Puskesmas yang terpercaya dan ramah masyarakat. Misi kami adalah memberikan layanan yang cepat, tepat, dan terjangkau bagi seluruh lapisan masyarakat.
        </p>
      </section>

      {/* Bagian Layanan */}
      <section class="services">
        <h1>Layanan Kami</h1>
        <p>
          Menjaga kesehatan adalah langkah penting dalam menjalani kehidupan yang produktif dan berkualitas. Jika Anda memiliki keluhan atau pertanyaan seputar kondisi kesehatan, jangan ragu untuk melakukan konsultasi dengan kami. 
          Melalui konsultasi, Anda dapat memperoleh penanganan yang tepat, informasi yang akurat, serta rekomendasi perawatan yang sesuai. 
          Segera kunjungi Puskesmas kami untuk mendapatkan pelayanan yang Anda butuhkan. Kesehatan Anda adalah prioritas kami.
        </p>
      </section>

      {/* Bagian untuk menuju halaman Tanya Dokter */}
      <h2>Tanya Dokter</h2>
      <section className="info-cards">
        <Link to="/tanya" className="card">
          Konsultasi
        </Link>
      </section>

      {/* Bagian footer / kaki halaman */}
      <footer className="footer">
        <div>Partnered with: agitha, azizah, nabila</div>
      </footer>
    </div>
  );
};

// Ekspor komponen agar bisa digunakan di file lain
export default Dashboard;
