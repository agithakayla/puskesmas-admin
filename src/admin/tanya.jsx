import React, { useEffect, useState } from "react";
import "./tanya.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [poli, setPoli] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");
  const [userEdit, setUserEdit] = useState(null);

  const API_URL = import.meta.env.VITE_TANYA_URL;
  const navigate = useNavigate();

  // Set favicon dan title
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = "/image/logo.png";
    document.title = "Puskesmas Pondok Rumput";
  }, []);

  // Ambil data dari API
  useEffect(() => {
    getALLData();
  }, );

  async function getALLData() {
    try {
      const response = await axios.get(API_URL);
      console.log("Data dari API:", response.data);

      // Validasi bentuk data
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (Array.isArray(response.data.data)) {
        setUsers(response.data.data); // Jika dalam key "data"
      } else {
        console.error("Format data tidak sesuai:", response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  }

  async function addData(e) {
    e.preventDefault();
    if (!name || !pertanyaan || !poli) {
      alert("Semua field harus diisi!");
      return;
    }
    try {
      await axios.post(API_URL, { name, pertanyaan, poli });
      resetForm();
      getALLData();
    } catch (error) {
      console.error("Gagal tambah data:", error);
    }
  }

  function editData(data) {
    setUserEdit(data);
    setName(data.name);
    setPertanyaan(data.pertanyaan);
    setPoli(data.poli);
  }

  async function updateData() {
    try {
      await axios.put(`${API_URL}/${userEdit.id}`, {
        name,
        pertanyaan,
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
    setPoli("");
    setPertanyaan("");
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
    <div className="tanya-container">
      <div style={{ margin: "1rem" }}>
        <button onClick={() => navigate("/")} className="tanya-btn tanya-secondary">
          Kembali ke Dashboard
        </button>
      </div>

      <section className="tanya-form-section">
        <h2>{userEdit ? "Edit Pertanyaan" : "Tambah Pertanyaan Pasien"}</h2>
        <form onSubmit={handleClick} className="tanya-form-box">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="tanya-input-field"
          />
          <select
            className="tanya-input-field"
            value={poli}
            onChange={(e) => setPoli(e.target.value)}
          >
            <option value="">Pilih Poli</option>
            <option value="Umum">Poli Umum</option>
            <option value="Gigi">Poli Gigi</option>
            <option value="Anak">Poli Anak</option>
            <option value="Kandungan">Poli Kandungan</option>
            <option value="Lansia">Poli Lansia</option>
          </select>
          <textarea
            placeholder="Pertanyaan"
            value={pertanyaan}
            onChange={(e) => setPertanyaan(e.target.value)}
            rows={4}
            className="tanya-input-field tanya-textarea-field"
          />
          <div className="tanya-button-group">
            <button type="submit" className="tanya-btn tanya-primary">
              {userEdit ? "Update Data" : "Tambah Pertanyaan"}
            </button>
            <button
              type="button"
              className="tanya-btn tanya-secondary"
              onClick={() => {
                resetForm();
                setUserEdit(null);
              }}
            >
              Batal
            </button>
          </div>
        </form>
      </section>

      <section className="tanya-list-section">
        <h2>Daftar Pertanyaan Pasien</h2>
        {Array.isArray(users) && users.length === 0 && <p>Belum ada data pasien.</p>}
        <ul className="tanya-user-list">
          {Array.isArray(users) &&
            users.map((user) => (
              <li key={user.id} className="tanya-user-card">
                <div className="tanya-user-info">
                  <p><strong>Nama:</strong> {user.name}</p>
                  <p><strong>Poli:</strong> {user.poli}</p>
                  <p><strong>Pertanyaan:</strong> {user.pertanyaan}</p>
                  <p><strong>Jawaban:</strong> {user.jawaban || "-"}</p>
                </div>
                <div className="tanya-action-buttons">
                  <button className="tanya-btn tanya-edit-btn" onClick={() => editData(user)}>
                    Edit
                  </button>
                  <button
                    className="tanya-btn tanya-delete-btn"
                    onClick={() => deleteData(user.id)}
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
