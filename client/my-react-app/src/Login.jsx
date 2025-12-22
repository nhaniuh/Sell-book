import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css';
import { useState } from 'react';
import login from './javascript/Login';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setForm] = useState({ email: '', password: '' });
  const [checkUser, setUser] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await login(formData);
    if (!response.message) {
      setUser(false);
    } else {
      window.location.href = '/';
    }
  }
  async function onSuccess(credentialResponse) {
    try {
      const token = credentialResponse.credential
      const response = await fetch('http://localhost:5000/auth/google', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          token
        })
      })
      const responseData = await response.json()
      if(responseData.message){
        localStorage.setItem('token',responseData.token)
        localStorage.setItem('id',responseData.id)
        window.location.href = '/'
      }
    } catch (err) {
      console.log(err)
    }
  }
   const handleError = () => {
    console.log("Đăng nhập Google thất bại!");
  };
  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row shadow-lg rounded-4 overflow-hidden bg-white login-box">

          {/* ==== BÊN TRÁI: GIỚI THIỆU WEBSITE ==== */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white p-5 login-left">
            <h1 className="fw-bold mb-3 display-6">📚 BookStore</h1>
            <p className="fs-5 text-light text-center mb-4" style={{ maxWidth: '400px' }}>
              Nơi hội tụ của tri thức, cảm hứng và đam mê đọc sách.
              Hãy khám phá hàng ngàn tựa sách chất lượng, từ tiểu thuyết đến công nghệ! 🌟
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2983/2983788.png"
              alt="Book Illustration"
              className="book-image"
            />
          </div>

          {/* ==== BÊN PHẢI: FORM LOGIN ==== */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 bg-light login-right">
            <h2 className="fw-bold text-primary mb-4 title-login">
              🔐 Đăng nhập tài khoản
            </h2>

            <form className="w-100 p-4 bg-white shadow-sm rounded-4 login-form" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold text-secondary">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg rounded-3"
                  id="email"
                  name="email"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold text-secondary">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg rounded-3"
                  id="password"
                  name="password"
                  required
                  onChange={handleChange}
                />
              </div>

              {!checkUser && (
                <p className="text-danger small mb-3">
                  ⚠️ Email hoặc mật khẩu không đúng, vui lòng thử lại!
                </p>
              )}

              <button type="submit" className="btn w-100 py-2 fw-semibold text-white btn-login">
                Đăng nhập
              </button>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Chưa có tài khoản?{' '}
                  <a href="/register" className="text-primary fw-semibold text-decoration-none">
                    Đăng ký ngay
                  </a>
                </p>
              </div>
              <GoogleOAuthProvider clientId="893162782594-ukjabpfjmm7d3bst281g5e8luheujm05.apps.googleusercontent.com">
                <GoogleLogin onSuccess={onSuccess} onError={handleError} />
              </GoogleOAuthProvider>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
