import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getOrder } from "./javascript/ManageOrders";
import OrderDetailBox from "./Orderdetailbox";
import OrderDeleteBox from "./Orderdeletebox";
import OrderUpdateBox from "./OrderUpdateBox";

export default function ManageOrder() {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [id_Order, setId_Order] = useState("");
    const [showUpdate, setShowUpdate] = useState(false);

    // 🔹 Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    async function takeOrder() {
        const response = await getOrder();
        setOrders(response);
    }

    useEffect(() => {
        takeOrder();
    }, []);

    // 🎨 Chọn màu trạng thái
    function getStatusBadgeClass(status) {
        switch (status) {
            case "pending":
                return "bg-warning text-dark";
            case "packaging":
                return "bg-info text-dark";
            case "shipping":
                return "bg-secondary text-dark";
            case "delivered":
                return "bg-success text-white";
            case "cancelled":
                return "bg-danger text-white";
            case "returned":
                return "bg-dark text-white";
            default:
                return "bg-light text-dark";
        }
    }

    // 🎯 Lọc dữ liệu theo trạng thái hoặc tìm kiếm
    const filteredOrders =
        status !== ""
            ? orders.filter(
                (item) =>
                    item.status === status ||
                    item.customerId.name?.toLowerCase().includes(status.toLowerCase()) ||
                    item.orderNumber?.toLowerCase().includes(status.toLowerCase())
            )
            : orders;

    // 🔹 Tính toán phân trang
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    return (
        <div className="container-fluid">
            <h4 className="fw-bold mb-4 text-primary">📦 Quản lý Đơn hàng</h4>

            {/* Thanh công cụ */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="🔍 Tìm theo mã đơn hàng hoặc khách hàng..."
                        style={{ width: "320px" }}
                        onChange={(e) => setStatus(e.target.value.trim())}
                    />
                    <select
                        className="form-select"
                        style={{ width: "200px" }}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="pending">Chờ xác nhận</option>
                        <option value="packaging">Đang đóng gói</option>
                        <option value="shipping">Đang giao</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                        <option value="returned">Đã trả hàng</option>
                    </select>
                </div>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => window.location.reload()}
                >
                    <i className="bi bi-arrow-clockwise me-1"></i> Làm mới
                </button>
            </div>

            {/* Bảng danh sách đơn hàng */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <table className="table table-hover align-middle text-center">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Mã đơn hàng</th>
                                <th>Khách hàng</th>
                                <th>Ngày đặt</th>
                                <th>Trạng thái</th>
                                <th>Tổng tiền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.length > 0 ? (
                                currentOrders.map((item, index) => (
                                    <tr key={index}>
                                        <td>{indexOfFirstOrder + index + 1}</td>
                                        <td className="fw-semibold text-primary">
                                            {item.orderNumber}
                                        </td>
                                        <td>{item.customerId.name}</td>
                                        <td>
                                            {new Date(item.createdAt).toLocaleString("vi-VN")}
                                        </td>
                                        <td>
                                            <span
                                                className={`badge shadow-sm ${getStatusBadgeClass(
                                                    item.status
                                                )}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="fw-bold text-success">
                                            {item.totalPrice}₫
                                        </td>
                                        <td className="d-flex justify-content-center">
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => {
                                                    setShow(!show);
                                                    setId_Order(item._id);
                                                }}
                                            >
                                                <i className="bi bi-eye"></i> Xem
                                            </button>
                                            <button
                                                className={item.status==="cancelled"||item.status==="completed"?"btn btn-sm btn-outline-success me-2 disabled":"btn btn-sm btn-outline-success me-2"}
                                                onClick={() => {
                                                    setShowUpdate(!showUpdate);
                                                    setId_Order(item._id);
                                                }}
                                            >
                                                <i className="bi bi-pencil"></i> Cập nhật
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => {
                                                    setShowDelete(!showDelete);
                                                    setId_Order(item._id);
                                                }}
                                            >
                                                <i className="bi bi-trash"></i> Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-muted py-4">
                                        Không tìm thấy đơn hàng nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* 🔹 Thanh phân trang */}
                    {totalPages > 1 && (
                        <nav className="d-flex justify-content-center mt-4">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        Trước
                                    </button>
                                </li>

                                {[...Array(totalPages)].map((_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${currentPage === i + 1 ? "active" : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}

                                <li
                                    className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        Sau
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>

            {/* Các hộp chức năng */}
            <OrderDetailBox
                show={show}
                onClose={() => setShow(!show)}
                id_Order={id_Order}
            />
            <OrderDeleteBox
                show={showDelete}
                onClose={() => setShowDelete(!showDelete)}
                id_Order={id_Order}
                onUpdate={() => takeOrder()}
            />
            <OrderUpdateBox
                show={showUpdate}
                onClose={() => setShowUpdate(!showUpdate)}
                id_Order={id_Order}
                onUpdate={() => takeOrder()}
            />
        </div>
    );
}
