import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register from './javascript/Register'; // File JS riêng
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    valid: false,
    value: ''
  });
  const [passMessage, setPassMessage] = useState(false)
  const [formData, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  function handleOnchange(e) {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(formData.password!==formData.confirmPassword){
      setPassMessage(!passMessage) 
      return
    }else{
      setPassMessage(!passMessage)
    }
    const response = await register(formData);
    if (response.message===true) {
      navigate('/login');
    } else {
      setMessage({
        valid: true,
        value: response.message
      });
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
      if (responseData.message) {
        localStorage.setItem('token', responseData.token)
        localStorage.setItem('id', responseData.id)
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
    <div className="register-page d-flex align-items-center justify-content-center min-vh-100">
      {/* --- LEFT SIDE: INTRO --- */}
      <div className="register-left d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="fw-bold mb-3 display-5">📚 BookStore</h1>
        <p className="lead mb-4">
          Chào mừng bạn đến với <strong>BookStore</strong> — thế giới tri thức nơi bạn có thể
          tìm thấy hàng ngàn cuốn sách thú vị từ nhiều lĩnh vực khác nhau.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2972/2972557.png"
          alt="books"
          className="book-image mt-3"
        />
      </div>

      {/* --- RIGHT SIDE: REGISTER FORM --- */}
      <div className="register-right d-flex justify-content-center align-items-center bg-white">
        <form className="register-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4 fw-bold text-primary">Đăng ký tài khoản</h3>

          {/* Họ và tên */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label small fw-semibold text-secondary">
              Họ và tên
            </label>
            <input
              type="text"
              className="form-control form-control-sm rounded-3"
              id="name"
              name="name"
              required
              onChange={handleOnchange}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label small fw-semibold text-secondary">
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-sm rounded-3"
              id="email"
              name="email"
              required
              onChange={handleOnchange}
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label small fw-semibold text-secondary">
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control form-control-sm rounded-3"
              id="password"
              name="password"
              required
              onChange={handleOnchange}
            />
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label small fw-semibold text-secondary">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="form-control form-control-sm rounded-3"
              id="confirmPassword"
              name="confirmPassword"
              required
              onChange={handleOnchange}
            />
          </div>
          {passMessage && <p className="text-danger small mt-1 mb-0">Yêu cầu nhập lại mật khẩu</p>}
          {/* Giới tính */}
          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Giới tính</label>
            <select
              className="form-select form-select-sm rounded-3"
              name="gender"
              required
              onChange={handleOnchange}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            {message.valid && <p className="text-danger small mt-1 mb-0">{message.value}</p>}
          </div>
          <button type="submit" className="btn btn-register w-100 fw-semibold text-white">
            Đăng ký
          </button>

          <div className="text-center mt-3">
            <small>
              Đã có tài khoản?{' '}
              <a href="/login" className="text-primary fw-semibold text-decoration-none">
                Đăng nhập
              </a>
            </small>
          </div>
          <GoogleOAuthProvider clientId="893162782594-ukjabpfjmm7d3bst281g5e8luheujm05.apps.googleusercontent.com">
            <GoogleLogin onSuccess={onSuccess} onError={handleError} />
          </GoogleOAuthProvider>
        </form>
      </div>
    </div>
  );
}
