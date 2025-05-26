import React from 'react';

const Login = () => {
  console.log("Komponen Login berhasil dimuat"); 

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
};

export default Login;
