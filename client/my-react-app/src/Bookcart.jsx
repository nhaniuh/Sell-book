import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Bookcart.css";

export default function BookCard() {
  const [books, setBooks] = useState({
    book1: [],
    book2: [],
    book3: [],
    book4: [],
    book5: [],
    book6: [],
  });

  useEffect(() => {
    async function getBook() {
      const res = await fetch("http://localhost:5000/data-book");
      const data = await res.json();
      setBooks(data);
    }
    getBook();
  }, []);

  // Danh sách thể loại (đặt tên theo dữ liệu bạn)
  const categories = [
    { key: "book1", title: "📘 Thiếu Nhi", link: "/category/Thiếu Nhi" },
    { key: "book2", title: "📗 Lịch Sử", link: "/category/Lịch Sử" },
    { key: "book3", title: "📙 Chính Trị", link: "/category/Chính Trị" },
    { key: "book4", title: "📕 Viễn Tưởng", link: "/category/Viễn Tưởng" },
    { key: "book5", title: "📔 Địa Lý", link: "/category/Địa Lý" },
    { key: "book6", title: "📓 Văn Học", link: "/category/Văn Học" },
  ];

  return (
    <div className="book-page min-vh-100">
      {/* ====== BANNER ====== */}
      <div className="banner position-relative text-center text-white d-flex align-items-center justify-content-center">
        <div className="banner-overlay position-absolute top-0 start-0 w-100 h-100"></div>
        <div className="banner-content position-relative text-center">
          <h1 className="fw-bold display-4 mb-3 animate__animated animate__fadeInDown">
            Chào mừng đến với <span className="text-warning">BookWorld</span> 📖
          </h1>
          <p className="lead mb-4 fs-5">
            Nơi hội tụ hàng ngàn cuốn sách hay – chạm đến tri thức và cảm xúc 🌟
          </p>
          <a href="#book-list">
            <button className="btn btn-lg fw-semibold px-4 text-white btn-banner">
              🚀 Khám phá ngay
            </button>
          </a>
        </div>
      </div>

      {/* ====== HEADER ====== */}
      <div id="book-list" className="text-center my-5">
        <h2 className="fw-bold display-6 text-primary header-title">
          📚 Khám Phá Kho Tàng Tri Thức
        </h2>
        <p className="text-muted fs-5">
          Hàng ngàn cuốn sách hay đang chờ bạn khám phá 💫
        </p>
        <hr className="mx-auto header-line" />
      </div>

      {/* ====== LIST BOOKS THEO TỪNG THỂ LOẠI ====== */}
      <div className="container pb-5">
        {categories.map((cat, idx) => (
          <div key={idx} className="mb-5">
            {/* Tiêu đề thể loại */}
            <h3 className="fw-bold text-dark mb-4 ps-3 category-title titleCategories">
              {cat.title}
            </h3>

            {/* Danh sách 8 sách */}
            <div className="row g-4 justify-content-center">
              {books[cat.key]?.slice(0, 8).map((item, index) => (
                <div
                  className="col-12 col-md-6 col-lg-3 d-flex justify-content-center"
                  key={index}
                >
                  <div className="card border-0 shadow-lg h-100 position-relative overflow-hidden book-card">
                    {/* ẢNH */}
                    <div className="overflow-hidden position-relative book-image-container">
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt={item.name}
                      />
                      <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-3 py-2 rounded-pill shadow-sm">
                        Mới ✨
                      </span>
                    </div>

                    {/* NỘI DUNG */}
                    <div className="card-body text-center p-4">
                      <h5 className="card-title fw-bold text-dark">
                        {item.name}
                      </h5>
                      {item.discount && item.discount.isActive? (
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
                      <a
                        href={`/detail/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <button className="btn w-100 fw-semibold text-white py-2 btn-buy">
                          🛒 Mua ngay
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <a
                href={cat.link}
                className="see-more-link d-inline-block fw-bold fs-5 text-decoration-none"
              >
                Xem thêm →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
