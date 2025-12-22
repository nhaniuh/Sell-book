import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Dashboard.css";
import ManageBook from "./ManageBook";
import ManageOrder from "./MângerOrder";
import { useNavigate } from "react-router-dom";
import ManageCustomer from "./ManageCustomer";
import ReportsDashboard from "./ReportDashboard";
import ManageDiscount from "./ManageDiscount";
export default function AdminDashboard() {
    const navigate = useNavigate()
    const [activeMenu, setActiveMenu] = useState("reports");

    const menuItems = [
        { id: "reports", icon: "bi bi-graph-up", label: "Báo cáo - Thống kê" },
        { id: "books", icon: "bi bi-book", label: "Quản lý Sách" },
        { id: "orders", icon: "bi bi-cart-check", label: "Quản lý Đơn hàng" },
        { id: "customers", icon: "bi bi-people", label: "Khách hàng" },
        { id: "shippers", icon: "bi bi-truck", label: "Shipper" },
        { id: "discounts", icon: "bi bi-percent", label: "Khuyến mãi" }
    ];
    
    return (
        <div className="admin-container">
            {/* SIDEBAR */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h4>📚 BookStore Admin</h4>
                </div>
                <ul className="nav flex-column">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className={`nav-item ${activeMenu === item.id ? "active" : "reports"}`}
                            onClick={() => setActiveMenu(item.id)}
                        >
                            <i className={`${item.icon} me-2`}></i>
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* MAIN CONTENT */}
            <div className="main-content">
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
                    <div className="container-fluid">
                        <h5 className="mb-0 fw-bold text-primary">Trang quản trị</h5>
                        <div>
                            <button className="btn btn-outline-secondary bg-success text-white btn-sm me-2"
                            onClick={()=>{navigate('/')}}
                            >
                                <i className="bi bi-house"></i> Quay về trang chủ
                            </button>
                            
                        </div>
                    </div>
                </nav>

                <div className="content-wrapper p-4">
                    {/* ========== DASHBOARD ========== */}
                    
                    {activeMenu === "books" && (
                        <ManageBook></ManageBook>
                    )}
                    {activeMenu ==="orders"&&(
                        <ManageOrder></ManageOrder>
                    )}
                    {activeMenu ==="customers"&&(
                        <ManageCustomer></ManageCustomer>
                    )}
                    {activeMenu ==="reports"&&(
                        <ReportsDashboard></ReportsDashboard>
                    )}
                    {activeMenu ==="discounts"&&(
                        <ManageDiscount></ManageDiscount>
                    )}
                </div>
            </div>
        </div>
    );
}
