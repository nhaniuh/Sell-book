import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDetail_Order } from "./javascript/OrderDetailBox";
import { orderUpdate } from "./javascript/OrderUpdateBox";
export default function OrderUpdateBox({ show, onClose, id_Order,onUpdate }) {
    if (!show) return null;
    const [order, setOrder] = useState(null)
    useEffect(()=>{
        async function getOrder() {
            const response = await getDetail_Order(id_Order)
            setOrder(response)
        }
        getOrder()
    },[])
    async function update(){
        const response = await orderUpdate(order)
        if(response.message){
            onClose()
            onUpdate()
        }
    }
    if(!order) return null
    return (
        <div
            className="position-fixed top-0 start-0 w-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                zIndex: 1050,
                height: "100vh",
            }}
        >
            <div
                className="bg-white p-4 rounded shadow-lg"
                style={{ width: "500px", maxHeight: "90vh", overflowY: "auto" }}
            >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-primary">
                        ✏️ Cập nhật Đơn hàng
                    </h5>
                    <button
                        className="btn-close"
                        onClick={onClose}
                        aria-label="Close"
                    ></button>
                </div>
                <form>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Mã đơn hàng
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={order.orderNumber}
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Khách hàng
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={order.customerId.name}
                            placeholder="Tên khách hàng..."
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Ngày Đặt Hàng
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={new Date(order.createdAt).toLocaleString('vi-Vn')}
                            placeholder="Ngày đặt hàng..."
                            disabled
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Trạng thái đơn hàng
                        </label>
                        <select className="form-select" value={order.status} onChange={(e)=>{setOrder({...order,status: e.target.value})}}>
                            <option value="pending">Chờ xác nhận</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="packaging">Đang đóng gói</option>
                            <option value="shipping">Đang giao</option>
                            <option value="delivered">Đã giao</option>
                            <option value="completed">Hoàn tất</option>
                            <option value="cancelled">Đã hủy</option>
                            <option value="returned">Đã trả hàng</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Ghi chú
                        </label>
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Nhập ghi chú cho đơn hàng..."
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Tổng tiền
                        </label>
                        <input
                            className="form-control"
                            value={order.totalPrice}
                            placeholder="Nhập tổng tiền..."
                            disabled
                        />
                    </div>

                    {/* Footer */}
                    <div className="d-flex justify-content-end mt-4">
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button type="button" className="btn btn-success"
                        onClick={update}
                        >
                            <i className="bi bi-check2-circle me-1"></i> Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
