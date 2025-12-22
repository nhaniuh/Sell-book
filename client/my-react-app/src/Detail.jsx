import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import { getDetail_Book, addCart } from "./javascript/Detail";
import { cartContent } from "./Home";
import Comment from "./Detailcomment";
import "./css/Detail.css";

export default function ProductDetail() {
  const { setCart, userCheck } = useContext(cartContent);
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("")

  useEffect(() => {
    async function getBook() {
      const response = await getDetail_Book(id);
      console.log(response)
      setBook(response);
    }
    getBook();
  }, [id]);

  function handleChange(e) {
    setQuantity(e.target.value);
  }

  async function handleAdd() {
    if (!userCheck) {
      navigate('/login')
      return
    }
    const response = await addCart(id, quantity);
    if (response.text === "Đã thêm vào giỏ hàng" && !response.valid) {
      setCart((prev) => prev + 1);
    } else if (response.text === "Đã thêm vào giỏ hàng") {
    }
    setSuccess(true);
    setText(response.text)
    clearTimeout(window.successTimeout);
    window.successTimeout = setTimeout(() => setSuccess(false), 2500);
  }
  function handlePayment() {
    if (Number(quantity) > Number(book.inventory)) {
      setSuccess(true);
      setText("Số lượng tồn kho không đủ vui lòng nhập lại")
      clearTimeout(window.successTimeout);
      window.successTimeout = setTimeout(() => setSuccess(false), 2500);
    } else {
      navigate(`/payment/${book._id}/${quantity}`)
    }
  }
  return (
    <>
      <div className="detail-container">
        <div className="container detail-card">
          <div className="row g-4 align-items-center">
            {/* ẢNH SÁCH */}
            <div className="col-md-5 text-center">
              <img src={`${book.img}`} alt={book.name} className="detail-img" />
            </div>

            {/* THÔNG TIN */}
            <div className="col-md-7 detail-info">
              <h2>{book.name}</h2>
              <p className="text-muted">✍️ Tác giả: {book.author && book.author.length > 0 ? book.author[0] : "Đang cập nhật"}</p>
              {/* <h4 className="detail-price">💰 {book.price}</h4> */}
              {book.discount&& book.discount.isActive?
                (
                  <div className="mb-3">
                    <div className="text-decoration-line-through text-muted mb-1">
                      {book.price} ₫
                    </div>
                    <div className="fs-5 fw-bold text-danger">
                      {Number(Number(book.price * 1000) - (Number(book.price * 1000) * Number(book.discount.percent)) / 100).toLocaleString('vi-VN')} ₫
                    </div>
                    <span className="badge bg-danger px-3 py-1">-{book.discount.percent}%</span>
                  </div>
                )
                : < h4 className="detail-price">💰 {book.price}</h4>}
              <div className="detail-quantity mb-4">
                <div>Hàng tồn kho: <strong>{book.inventory}</strong></div>
                <label className="form-label fw-semibold small text-secondary">
                  Số lượng:
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm rounded-3 border-1"
                  min="1"
                  defaultValue="1"
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex flex-wrap gap-3">
                <button
                  className={`btn btn-buy-now ${book.inventory == 0 ? "disabled" : ""}`}
                  disabled={book.inventory == 0}
                  onClick={()=>{handlePayment()}}
                >
                  {book.inventory == 0 ? "Hết hàng" : "🛒 Mua ngay"}
                </button>
                <button className="btn btn-add-cart" onClick={handleAdd}>
                  ➕ Thêm vào giỏ
                </button>
                <button
                  className="btn btn-outline-secondary btn-back"
                  onClick={() => navigate("/")}
                >
                  ⬅ Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>

        {success && (
          <div className="alert text-center fw-semibold detail-alert">
            ✅ {text}
          </div>
        )}
        <Comment
          id_Book={id}
        ></Comment>
      </div >
    </>

  );
}
