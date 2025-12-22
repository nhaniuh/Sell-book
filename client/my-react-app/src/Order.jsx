import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Order.css";
import { useEffect, useState } from "react";
import { getOrders } from "./javascript/Order";
import { useNavigate } from "react-router-dom";
import Userdeleteorder from "./Userdeleteorder";
export default function Orders() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [showDelete, setShowDelete] = useState(false)
  const [id_Order,setId_Order] = useState('')
  async function getUser() {
      const response = await getOrders();
      setData(response);
    }
  useEffect(() => {
    getUser();
  }, []);
  function getStatusBadgeClass(status) {
    switch (status) {
      case "pending":
        return "bg-warning text-dark"; // Chờ xác nhận
      case "confirmed":
        return "bg-primary text-white"; // Đã xác nhận
      case "packaging":
        return "bg-info text-dark"; // Đang đóng gói
      case "shipping":
        return "bg-secondary text-dark"; // Đang giao
      case "delivered":
        return "bg-success text-white"; // Đã giao
      case "completed":
        return "bg-success text-white"; // Hoàn tất
      case "cancelled":
        return "bg-danger text-white"; // Đã hủy
      case "returned":
        return "bg-dark text-white"; // Đã trả hàng
      default:
        return "bg-light text-dark"; // Mặc định
    }
  }
  function changeStatus(status) {
    switch (status) {
      case "pending":
        return "Chờ giải quyết"
      case "confirmed":
        return "Đã xác nhận"; // Đã xác nhận
      case "packaging":
        return "Đang đóng gói"; // Đang đóng gói
      case "shipping":
        return "Đang giao"; // Đang giao
      case "delivered":
        return "Đã giao"; // Đã giao
      case "completed":
        return "Hoàn tất"; // Hoàn tất
      case "cancelled":
        return "Đã Hủy"; // Đã hủy
      case "returned":
        return "Đã trả hàng"; // Đã trả hàng
      default:
        return "Lỗi"; // Mặc định
    }
  }
  return (
    <div
      className="orders-page"
      style={{
        background: "linear-gradient(135deg, #f0f7ff 0%, #e1f7f1 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container py-5">
        {/* Tiêu đề — không có gạch ngang */}
        <h2
          className="fw-bold mb-5 text-center"
          style={{
            color: "#007bff",
            letterSpacing: "0.5px",
          }}
        >
          📦 Đơn hàng của bạn
        </h2>

        <div
          className="card shadow-lg border-0"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div className="card-body px-4 py-4">
            <table className="table table-hover align-middle text-center mb-0">
              <thead
                style={{
                  background: "#f8f9fa",
                  borderBottom: "none", // Bỏ gạch ngang đầu bảng
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Mã đơn hàng</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Tổng tiền</th>
                  <th>Sản phẩm</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index} className="orders-row">
                      <td>{index + 1}</td>
                      <td className="fw-semibold text-primary">
                        {item.orderNumber}
                      </td>
                      <td>
                        {new Date(item.createdAt).toLocaleString("vi-VN")}
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(item.status)} shadow-sm`}>
                          {changeStatus(item.status)}
                        </span>
                      </td>
                      <td className="fw-bold text-success">
                        {Number(item.totalPrice).toLocaleString('vi-VN')} VND
                      </td>
                      <td className="text-start">
                        <ul className="mb-0 list-unstyled">
                          <li>{item.bookId.name}</li>
                        </ul>
                      </td>
                      <td>
                        {(item.status==="pending"||item.status==="confirmed")?<button
                          className="btn btn-sm fw-semibold text-white"
                          style={{
                            background:
                              "linear-gradient(90deg, #f03838ff 0%, #e12222ff 100%)",
                            border: "none",
                            borderRadius: "8px",
                          }}
                          onClick={() => { setShowDelete(!showDelete),setId_Order(item._id) }}
                        >
                          Hủy
                        </button>:<button
                          className="btn btn-sm fw-semibold text-white"
                          style={{
                            background:
                              "linear-gradient(90deg, #007bff 0%, #00c897 100%)",
                            border: "none",
                            borderRadius: "8px",
                          }}
                          onClick={() => { navigate('/detail/' + item.bookId._id) }}
                        >
                          Đặt lại 
                        </button>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-muted py-4">
                      Bạn chưa có đơn hàng nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Userdeleteorder
      show = {showDelete}
      onClose={()=>setShowDelete(!showDelete)}
      id_Order={id_Order}
      onUpdate={()=>getUser()}
      ></Userdeleteorder>
    </div>
  );
}
