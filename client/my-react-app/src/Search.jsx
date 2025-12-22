import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "./javascript/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Bookcart.css";

export default function Search() {
  const [book, setBook] = useState([]);
  const {key} = useParams()
  useEffect(() => {
    async function getBook2() {
      const books = await getBook(key)
      setBook(books);
    }
    getBook2();
  }, []);
  return (
    <div className="book-page min-vh-100">

      {/* ====== HEADER ====== */}
      <div id="book-list" className="text-center my-5">
        <h2 className="fw-bold display-6 text-primary header-title">
          📚 Khám Phá Kho Tàng Tri Thức {key}
        </h2>
        <p className="text-muted fs-5">
          Hàng ngàn cuốn sách hay đang chờ bạn khám phá 💫
        </p>
        <hr className="mx-auto header-line" />
      </div>

      {/* ====== LIST BOOKS ====== */}
      <div className="container pb-5">
        <div className="row g-4 justify-content-center">
          {book.map((item, index) => (
            <div
              className="col-12 col-md-6 col-lg-3 d-flex justify-content-center"
              key={index}
            >
              <div className="card border-0 shadow-lg h-100 position-relative overflow-hidden book-card">
                {/* ẢNH */}
                <div className="overflow-hidden position-relative book-image-container">
                  <img
                    src={`${item.img}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-3 py-2 rounded-pill shadow-sm">
                    Mới ✨
                  </span>
                </div>

                {/* NỘI DUNG */}
                <div className="card-body text-center p-4">
                  <h5 className="card-title fw-bold text-dark">{item.name}</h5>
                  <p className="card-text fs-5 fw-semibold text-success mb-4">
                    {item.price} ₫
                  </p>

                  <a href={`/detail/${item._id}`} style={{ textDecoration: "none" }}>
                    <button className="btn w-100 fw-semibold text-white py-2 btn-buy">
                      🛒 Mua ngay
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
