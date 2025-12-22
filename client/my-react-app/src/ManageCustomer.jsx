import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAdminUser } from "./javascript/ManageCustomer";
import Userdeletebox from "./Userdeletebox";

export default function ManageCustomer() {
  const [users, setUsers] = useState([]);
  const [checkDelete, setCheckDelete] = useState(false);
  const [user, setUser] = useState({ id: "", name: "" });
  const [search, setSearch] = useState(null)
  // ✅ State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // mỗi trang 5 người

  // ✅ Lấy danh sách khách hàng
  async function getUser() {
    const response = await getAdminUser();
    setUsers(response);
  }

  useEffect(() => {
    getUser();
  }, []);

  // ✅ Tính toán phân trang
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  // ✅ Hàm đổi trang
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="manage-customer container-fluid">
      <h4 className="fw-bold mb-4 text-primary">👥 Quản lý Khách hàng</h4>

      {/* Thanh tìm kiếm */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Tìm kiếm theo tên hoặc email..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bảng danh sách khách hàng */}
      <div className="table-responsive shadow-sm">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Tên khách hàng</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Đơn hàng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {!search ?
              currentUsers.map((item, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber || "-"}</td>
                  <td>{item.address || "-"}</td>
                  <td>
                    <span className="badge bg-success">{item.orders?.length || 0}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        setCheckDelete(true);
                        setUser({ id: item._id, name: item.name });
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              )) :
              currentUsers.map((item, index) => {
                if (item.name === search.trim() || item.email === search.trim()) {
                  return <tr key={index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber || "-"}</td>
                    <td>{item.address || "-"}</td>
                    <td>
                      <span className="badge bg-success">{item.orders?.length || 0}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          setCheckDelete(true);
                          setUser({ id: item._id, name: item.name });
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                }
              })
            }
          </tbody>
        </table>
      </div>

      {/* ✅ Phân trang */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          ‹
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn mx-1 ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-secondary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          ›
        </button>
      </div>

      {/* ✅ Hộp xác nhận xóa */}
      <Userdeletebox
        show={checkDelete}
        onClose={() => setCheckDelete(false)}
        user={user}
        onUpdate={() => getUser()}
      />
    </div>
  );
}
