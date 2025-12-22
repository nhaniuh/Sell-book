import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "./javascript/Categories";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Bookcart.css";

export default function Categories() {
  const [book, setBook] = useState([]);
  const { category } = useParams();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function getBook2() {
      const books = await getBook(category);
      setBook(books);
    }
    getBook2();
  }, [category]);

  const handleClick = (page) => {
    setPageNumber(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (pageNumber < quantity) {
      setPageNumber((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const start = (pageNumber - 1) * 20;
  const stop = start + 20;
  const finalBook = book.slice(start, stop);

  let quantity = Math.ceil(book.length / 20);
  let arrayLink = Array.from({ length: quantity });

  return (
    <div className="book-page min-vh-100">

      {/* ====== HEADER ====== */}
      <div id="book-list" className="text-center my-5">
        <h2 className="fw-bold display-6 text-primary header-title">
          📚 Khám Phá Kho Tàng Tri Thức {category}
        </h2>
        <p className="text-muted fs-5">
          Hàng ngàn cuốn sách hay đang chờ bạn khám phá 💫
        </p>
        <hr className="mx-auto header-line" />
      </div>

      {/* ====== LIST BOOKS ====== */}
      <div className="container pb-5">
        <div className="row g-4 justify-content-center">
          {finalBook.map((item, index) => (
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
                  {item.discount ? (
                        <div className="mb-3">
                          <div className="text-decoration-line-through text-muted mb-1">
                            {item.price} ₫
                          </div>
                          <div className="fs-5 fw-bold text-danger">
                            {Number(Number(item.price*1000) - (Number(item.price*1000) * Number(item.discount.percent)) / 100).toLocaleString('vi-VN')} ₫
                          </div>
                          <span className="badge bg-danger px-3 py-1">-{item.discount.percent}%</span>
                        </div>
                      ) : (
                        <p className="card-text fs-5 fw-semibold text-success mb-4">
                          {item.price} ₫
                        </p>
                      )}

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

      {/* ====== PHÂN TRANG ====== */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {/* Nút mũi tên trái */}
            <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePrev}>
                ←
              </button>
            </li>

            {/* Các số trang */}
            {arrayLink.map((_, index) => (
              <li
                key={index}
                className={`page-item ${pageNumber === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link fw-semibold"
                  onClick={() => handleClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Nút mũi tên phải */}
            <li className={`page-item ${pageNumber === quantity ? "disabled" : ""}`}>
              <button className="page-link" onClick={handleNext}>
                →
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
