import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { getTotalData } from "./javascript/adminReports";
import { useState } from "react";
export default function ReportsDashboard() {
  const [data, setData] = useState({

  })
  useEffect(()=>{
      async function getData() {
        const response = await getTotalData()
        setData(response)
      }
      getData()
  },[])
  return (
    <div className="reports-dashboard container-fluid">
      <h4 className="fw-bold mb-4 text-primary">📊 Báo cáo & Thống kê</h4>

      {/* ==== Tổng quan ==== */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <div className="text-muted">Tổng doanh thu</div>
            <h4 className="fw-bold text-success mt-2">{data.totalPrice?data.totalPrice.toLocaleString('vi-VN')+"đ":""}</h4>
            <small className="text-secondary">All</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <div className="text-muted">Tổng đơn hàng</div>
            <h4 className="fw-bold text-primary mt-2">{data.totalOrder}</h4>
            <small className="text-secondary">All</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <div className="text-muted">Số lượng khách hàng </div>
            <h4 className="fw-bold text-info mt-2">{data.totalUser}</h4>
            <small className="text-secondary">All</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3">
            <div className="text-muted">Sách đã bán</div>
            <h4 className="fw-bold text-warning mt-2">{data.totalBook}</h4>
            <small className="text-secondary">Tổng cộng</small>
          </div>
        </div>
      </div>

      {/* ==== Biểu đồ doanh thu ====
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white fw-bold text-primary">
          📈 Doanh thu theo tháng
        </div>
        <div className="card-body">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "250px",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
            }}
          >
            <span className="text-secondary">[Biểu đồ doanh thu sẽ hiển thị ở đây]</span>
          </div>
        </div>
      </div> */}

      {/* ==== Top sản phẩm bán chạy ==== */}
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white fw-bold text-success">
              🏆 Top 5 sản phẩm bán chạy
            </div>
            <div className="card-body">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Tên sách</th>
                    <th>Số lượng</th>
                    <th>Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Clean Code</td>
                    <td>120</td>
                    <td>₫12.000.000</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Atomic Habits</td>
                    <td>95</td>
                    <td>₫9.500.000</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Deep Work</td>
                    <td>76</td>
                    <td>₫7.600.000</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Rich Dad Poor Dad</td>
                    <td>63</td>
                    <td>₫6.300.000</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>The Pragmatic Programmer</td>
                    <td>52</td>
                    <td>₫5.200.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ==== Top khách hàng ==== */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white fw-bold text-info">
              👤 Top 5 khách hàng mua nhiều nhất
            </div>
            <div className="card-body">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Tên khách hàng</th>
                    <th>Tổng đơn</th>
                    <th>Tổng chi tiêu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Nguyễn Văn A</td>
                    <td>12</td>
                    <td>₫15.000.000</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Lê Thị B</td>
                    <td>10</td>
                    <td>₫12.300.000</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Trần Văn C</td>
                    <td>9</td>
                    <td>₫9.800.000</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Phạm Thị D</td>
                    <td>8</td>
                    <td>₫8.400.000</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Đỗ Văn E</td>
                    <td>7</td>
                    <td>₫7.200.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
