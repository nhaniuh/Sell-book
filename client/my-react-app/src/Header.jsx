import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/Header.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import postLogin from './javascript/Header';
import { cartContent } from './Home';

export default function Header() {
  const { cart, order,avatar } = useContext(cartContent);
  const [check, setCheck] = useState({
    valid: false,
    user: { _id: '', name: '', email: '', cart: [] },
  });
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleRegister() {
    navigate('/register');
  }

  function handleLogin() {
    navigate('/login');
  }

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await postLogin();
        if (response.message) {
          setCheck({ valid: response.message, user: response.user });
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.href = '/';
  }

  function handleInfor() {
    window.location.href = '/infor/' + localStorage.getItem('id');
  }

  function handleCart() {
    navigate('/cart/' + check.user._id);
  }

  function handleHome() {
    navigate('/');
  }

  function handleCategory(category) {
    // navigate(`/category/${category}`);
    window.location.href = `/category/${category}`
  }

  // 👉 Hàm tìm kiếm
  function handleSearch(e) {
    e.preventDefault();
    if (search.trim() !== '') {
      window.location.href = `/search/${encodeURIComponent(search.trim())}`;
      setSearch('');
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top">
      <div className="container py-2">
        {/* ====== Logo + Tên thương hiệu ====== */}
        <a className="navbar-brand" onClick={handleHome} style={{ cursor: 'pointer' }}>
          <i className="bi bi-book-half me-2 fs-3 text-warning"></i>
          <span className="text-white">BookWorld</span>
        </a>

        {/* ====== Nút toggle trên mobile ====== */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-1 text-white"></i>
        </button>

        {/* ====== Menu chính ====== */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* ====== Dropdown Thể loại sách ====== */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white fw-semibold d-flex align-items-center"
                href="#!"
                id="categoryDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-bookmarks me-1"></i>
                Thể loại
              </a>
              <ul className="dropdown-menu shadow-sm" aria-labelledby="categoryDropdown">
                <li><a className="dropdown-item" onClick={() => handleCategory('Lịch Sử')}>Lịch sử</a></li>
                <li><a className="dropdown-item" onClick={() => handleCategory('Thiếu Nhi')}>Thiếu nhi</a></li>
                <li><a className="dropdown-item" onClick={() => handleCategory('Địa Lý')}>Địa lý</a></li>
                <li><a className="dropdown-item" onClick={() => handleCategory('Chính trị')}>Chính trị</a></li>
                <li><a className="dropdown-item" onClick={() => handleCategory('Văn Học')}>Văn học</a></li>
                <li><a className="dropdown-item" onClick={() => handleCategory('Viễn Tưởng')}>Viễn tưởng</a></li>
              </ul>
            </li>


            {/* ====== Các mục khác ====== */}
            <li className="nav-item" style={{ cursor: 'pointer' }}>
              <a className="nav-link d-flex align-items-center" onClick={() => navigate('/about')}>
                <i className="bi bi-info-circle me-1"></i>
                <span>Giới thiệu</span>
              </a>
            </li>
            <li className="nav-item" style={{ cursor: 'pointer' }}>
              <a className="nav-link d-flex align-items-center" onClick={() => navigate('/contact')}>
                <i className="bi bi-bookmark-star me-1"></i>
                <span>Liên hệ</span>
              </a>
            </li>
          </ul>

          {/* ====== Thanh tìm kiếm ====== */}
          <form
            className="d-flex align-items-center me-3"
            onSubmit={handleSearch}
            style={{ maxWidth: '260px' }}
          >
            <input
              type="text"
              className="form-control form-control-sm text-white"
              placeholder="🔍 Tìm sách..."
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-warning btn-sm ms-2 px-2"
              title="Tìm kiếm"
            >
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* ====== Khu vực tài khoản + giỏ hàng ====== */}
          <div className="d-flex align-items-center gap-3">
            {check.valid ? (
              <>
                {/* Đơn hàng */}
                <button
                  onClick={() => navigate('/orders')}
                  className="btn btn-outline-light position-relative"
                  title="Đơn hàng"
                >
                  <i className="bi bi-box-seam fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                    {order}
                  </span>
                </button>

                {/* Giỏ hàng */}
                <button
                  onClick={handleCart}
                  className="btn btn-outline-light position-relative"
                  title="Giỏ hàng"
                >
                  <i className="bi bi-cart-fill fs-5"></i>
                  {cart > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart}
                    </span>
                  )}
                </button>

                {/* Dropdown user */}
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle d-flex align-items-center shadow-sm"
                    type="button"
                    id="userMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {avatar ? (
                      <img
                        src={avatar.includes('.com')?avatar:`http://localhost:5000${avatar}`}
                        alt="Avatar"
                        className="me-2 rounded-circle"
                        style={{ width: "32px", height: "32px", objectFit: "cover" }}
                      />
                    ) : (
                      <i className="bi bi-person-circle fs-5 me-2 text-primary"></i>
                    )}
                    {check.user.name || 'Người dùng'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userMenuButton">
                    <li>
                      <button onClick={handleInfor} className="dropdown-item text-success">
                        <i className="bi bi-person-lines-fill me-2"></i>Thông tin cá nhân
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                      </button>
                    </li>
                    {check.user.role==="admin"&&<li>
                      <button className="dropdown-item text-info" onClick={()=>{navigate('/dashboard')}}>
                        <i className="bi bi-box-arrow-right me-2">DashBoard</i>
                      </button>
                    </li>}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="btn btn-outline-light fw-semibold px-3">
                  <i className="bi bi-box-arrow-in-right me-1"></i>Đăng nhập
                </button>
                <button onClick={handleRegister} className="btn btn-warning fw-semibold px-3">
                  <i className="bi bi-person-plus-fill me-1"></i>Đăng ký
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
