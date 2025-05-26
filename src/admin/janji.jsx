import React, { useEffect, useState } from "react";
import "./janji.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [jam, setJam] = useState("");
  const [poli, setPoli] = useState("");
  const [userEdit, setUserEdit] = useState(null);
  const API_URL = import.meta.env.VITE_PERSON_URL;
  const navigate = useNavigate();

  useEffect(() => {
    // Set favicon/logo
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = "/image/logo.png";

    // Set tab title
    document.title = "Dashboard | Puskesmas Pondok Rumput";

    // Ambil data dari API
    getALLData();
  }, );

  async function getALLData() {
    try {
      const response = await axios.get(API_URL);
      console.log("DATA API:", response.data);
      
      // Sesuaikan jika datanya berada di nested object
      const data = Array.isArray(response.data) ? response.data : response.data.data;
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Data bukan array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  }

  async function addData(e) {
    e.preventDefault();
    if (!name || !nik || !jadwal || !jam || !poli) {
      alert("Semua field harus diisi!");
      return;
    }
    try {
      await axios.post(API_URL, { name, nik, jadwal, jam, poli });
      resetForm();
      getALLData();
    } catch (error) {
      console.error("Gagal tambah data:", error);
    }
  }

  function editData(data) {
    setUserEdit(data);
    setName(data.name);
    setNik(data.nik);
    setJadwal(data.jadwal);
    setJam(data.jam || "");
    setPoli(data.poli);
  }

  async function updateData() {
    try {
      await axios.put(`${API_URL}/${userEdit.id}`, {
        name,
        nik,
        jadwal,
        jam,
        poli,
      });
      resetForm();
      setUserEdit(null);
      getALLData();
    } catch (error) {
      console.error("Gagal update data:", error);
    }
  }

  async function deleteData(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getALLData();
    } catch (error) {
      console.error("Gagal hapus data:", error);
    }
  }

  function resetForm() {
    setName("");
    setNik("");
    setJadwal("");
    setJam("");
    setPoli("");
  }

  function handleClick(e) {
    e.preventDefault();
    if (userEdit) {
      updateData();
    } else {
      addData(e);
    }
  }

  return (
    <div className="wrapper">
      <div className="header">
        <button onClick={() => navigate("/")} className="tanya-btn tanya-secondary">
          Kembali ke Dashboard
        </button>

        <h3>{userEdit ? "Edit Data Pasien" : "Tambah Pasien"}</h3>
        <form className="input-box" onSubmit={handleClick}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="NIK"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
          />
          <input
            type="date"
            placeholder="Jadwal"
            value={jadwal}
            onChange={(e) => setJadwal(e.target.value)}
          />
          <input
            type="time"
            placeholder="Jam"
            value={jam}
            onChange={(e) => setJam(e.target.value)}
          />
          <select value={poli} onChange={(e) => setPoli(e.target.value)}>
            <option value="">-- Pilih Poli --</option>
            <option value="Poli Umum">Poli Umum</option>
            <option value="Poli Gigi">Poli Gigi</option>
            <option value="Poli Anak">Poli Anak</option>
            <option value="Poli Lansia">Poli Lansia</option>
             <option value="Poli Kandungan">Poli Kandungan</option>
          </select>
          <button type="submit">
            {userEdit ? "Update Data" : "Tambah Data"}
          </button>
        </form>
      </div>

      <div className="data-pengguna">
        <h3>Data Pasien</h3>
        {Array.isArray(users) && users.length > 0 ? (
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <div>
                  <p>Nama : {user.name}</p>
                  <p>NIK : {user.nik}</p>
                  <p>Poli : {user.poli}</p>
                  <p>Jadwal : {user.jadwal} {user.jam}</p>
                </div>
                <div>
                  <a className="edit" onClick={() => editData(user)}>Edit</a> -{" "}
                  <a className="delete" onClick={() => deleteData(user.id)}>Delete</a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Data tidak ditemukan atau belum dimuat.</p>
        )}
      </div>
    </div>
  );
}

export default App;
