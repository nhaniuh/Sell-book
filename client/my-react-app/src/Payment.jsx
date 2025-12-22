import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getPayment, payment } from "./javascript/Payment";
import { useParams, useNavigate } from "react-router-dom";
import { cartContent } from "./Home";
export default function Checkout() {
  const navigate = useNavigate();
  const { setOrder, userCheck } = useContext(cartContent)
  const { id, quantity } = useParams();
  const [book, setBook] = useState({});
  const [user, setUser] = useState({});
  const [valid, setValid] = useState(true);
  const [success, setSuccess] = useState(false);
  const [detailPercent, setDetailPercent] = useState({
    code: "",
    percent: ""
  })
  const [infor, setInfor] = useState({
    phoneNumber: "",
    address: "",
    method: "",
  });

  useEffect(() => {
    if (!userCheck) {
      navigate('/login')
    }
    async function getPayment2() {
      const data = await getPayment(id);
      setBook(data.book);
      setUser(data.user);
      setInfor({ phoneNumber: data.user.phoneNumber, address: data.user.address, method: data.user.method })
      if (data.book.discount) {
        setDetailPercent({ code: data.book.discount.code, percent: data.book.discount.percent })
      } else {
        setDetailPercent(null)
      }
    }
    getPayment2();
  }, [id]);
  console.log(detailPercent)
  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
    setInfor({ ...infor, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const phoneRegex = /^(0|\+84)(\d{9})$/;
    if (!user.phoneNumber || !phoneRegex.test(user.phoneNumber)) {
      setValid(false);
      return;
    }
    setValid(true);
    const response = await payment(id, quantity, infor, detailPercent);
    if (response.message) {
      setSuccess(true);
      setOrder(pre => pre += 1)
      setTimeout(() => {
        setSuccess(false);
        navigate("/orders");
      }, 2000);
    }
  }

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f7ff 0%, #e1f7f1 100%)",
      }}
    >
      <h2
        className="text-center fw-bold mb-5"
        style={{ color: "#007bff", letterSpacing: "0.5px" }}
      >
        🛍️ Thanh Toán Đơn Hàng
      </h2>

      <div className="row justify-content-center">
        {/* Cột trái */}
        <div className="col-md-5 mb-4">
          <div
            className="card border-0 shadow-lg p-4"
            style={{ borderRadius: "16px" }}
          >
            <h5 className="mb-4 text-primary fw-bold">
              Thông tin giao hàng
            </h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.name || ""}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập số điện thoại..."
                  name="phoneNumber"
                  required
                  onChange={handleChange}
                  value={user.phoneNumber}
                />
                {!valid && (
                  <div className="text-danger small mt-1">
                    ⚠️ Vui lòng nhập số điện thoại hợp lệ.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Địa chỉ</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Nhập địa chỉ giao hàng..."
                  name="address"
                  required
                  onChange={handleChange}
                  value={user.address}
                  style={{ color: "#000" }}
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Phương thức thanh toán
                </label>
                <select
                  className="form-select"
                  name="method"
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn phương thức --</option>
                  <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng (COD)</option>
                  <option value="Chuyển khoản ngân hàng">Chuyển khoản ngân hàng</option>
                  <option value="Thanh toán qua momo">Thanh toán qua Momo</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn w-100 py-2 fw-bold text-white"
                style={{
                  background:
                    "linear-gradient(90deg, #007bff 0%, #00c897 100%)",
                  borderRadius: "10px",
                }}
              >
                Đặt hàng
              </button>
            </form>
          </div>
        </div>

        {/* Cột phải */}
        <div className="col-md-5 mb-4">
          <div
            className="card border-0 shadow-lg p-4"
            style={{ borderRadius: "16px" }}
          >
            <h5 className="mb-4 text-primary fw-bold">Đơn hàng của bạn</h5>

            <table className="table table-bordered text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  {book.discount && book.discount.isActive? <th>Giảm giá</th>:""}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-start">{book.name}</td>
                  <td>{quantity}</td>
                  <td>{book.price}</td>
                  {book.discount && book.discount.isActive? <td>-{book.discount.percent}%</td>:""}
                </tr>
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <h6 className="fw-bold mb-0">Tổng cộng:</h6>
              <h5 className="text-danger fw-bold mb-0">
                {book.discount && book.discount.isActive
                  ? (
                    (Number(book.price.split(".")[0]) *
                      Number(quantity) *
                      1000) -
                    ((Number(book.price.split(".")[0]) *
                      Number(quantity) *
                      1000) * Number(book.discount.percent) / 100)
                  ).toLocaleString("vi-VN") + " VND"
                  : (Number(book.price) *
                      Number(quantity) *
                      1000).toLocaleString("vi-VN") + " VND"}
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Hiệu ứng thông báo thành công */}
      {success && (
        <div
          className="alert alert-success text-center fw-semibold position-fixed top-50 start-50 translate-middle shadow-lg"
          style={{ zIndex: 1055, width: "280px", borderRadius: "12px" }}
          role="alert"
        >
          ✅ Đặt hàng thành công!
        </div>
      )}
    </div>
  );
}
