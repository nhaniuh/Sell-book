import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="bg-dark text-white pt-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Cột 1: Thông tin website */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">MyWebsite</h5>
            
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Liên kết nhanh</h5>
            <ul className="list-unstyled">
              <li><a href="#" onClick={()=> navigate('/')} className="text-white text-decoration-none">Trang chủ</a></li>
              <li><a href="#" onClick={()=> navigate('/about')} className="text-white text-decoration-none">Giới thiệu</a></li>
              <li><a href="#" onClick={()=> navigate('/contact')} className="text-white text-decoration-none">Liên hệ</a></li>
            </ul>
          </div>

          {/* Cột 3: Mạng xã hội */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Theo dõi chúng tôi</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">
              <a href="https://facebook.com" className="text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://github.com" className="text-white">
                <FaGithub size={24} />
              </a>
              <a href="https://instagram.com" className="text-white">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="text-center text-secondary mt-4 border-top pt-3">
          <small>© 2025 MyWebsite. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
