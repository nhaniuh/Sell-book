import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDetail_Order } from "./javascript/OrderDetailBox";
export default function OrderDetailBox({ show, onClose, id_Order }) {
    if (!show) return null; // Ẩn box khi chưa bật
    const [order, setOrder] = useState(null)
    useEffect(() => {
        async function getOrder() {
            const response = await getDetail_Order(id_Order)
            setOrder(response)
        }
        getOrder()
    }, [])
    console.log(id_Order)
    // console.log(order)
    if(!order) return null
    return (<div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.4)",
        zIndex: 1050,
      }}
    >
      <div
        className="bg-white shadow-lg rounded-4 p-4"
        style={{ width: "700px", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Tiêu đề */}
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h5 className="fw-bold text-primary mb-0">
            📋 Chi tiết đơn hàng <span className="text-muted">{order.orderNumber}</span>
          </h5>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onClose}
          >
            ✖ Đóng
          </button>
        </div>

        {/* Thông tin khách hàng */}
        <div className="mb-4">
          <h6 className="fw-bold text-secondary border-bottom pb-1">
            👤 Thông tin khách hàng
          </h6>
          <p className="mb-1"><strong>Tên: </strong> {order.customerId.name}</p>
          <p className="mb-1"><strong>Email: </strong> {order.customerId.email}</p>
          <p className="mb-1"><strong>Số điện thoại: </strong>{order.phoneNumber}</p>
          <p className="mb-1"><strong>Địa chỉ: </strong> {order.address}</p>
        </div>

        {/* Sản phẩm trong đơn */}
        <div className="mb-4">
          <h6 className="fw-bold text-secondary border-bottom pb-1">
            📦 Sản phẩm trong đơn
          </h6>
          <table className="table table-striped align-middle text-center mt-2">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Giảm giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{order.bookId.name}</td>
                <td>{order.quantity}</td>
                <td>{order.priceBook} VND</td>
                {order.currentDiscount?<td>{order.currentDiscount}%</td>:<td>Không có</td>}
                <td>{order.totalPrice} VND</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Thông tin đơn hàng */}
        <div>
          <h6 className="fw-bold text-secondary border-bottom pb-1">
            🧾 Thông tin đơn hàng
          </h6>
          <p className="mb-1"><strong>Trạng thái: </strong> <span className="badge bg-warning text-dark">{order.status}</span></p>
          <p className="mb-1"><strong>Ngày đặt: </strong> {new Date(order.createdAt).toLocaleString('vi-Vn')}</p>
          <p className="mb-1"><strong>Hình thức thanh toán: </strong> {order.method}</p>
          <p className="mb-1"><strong>Tổng tiền: </strong> <span className="fw-bold text-success">{order.totalPrice} VND</span></p>
        </div>
      </div>
    </div>)
}
