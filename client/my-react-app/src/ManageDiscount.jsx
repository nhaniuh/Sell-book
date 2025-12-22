import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { addDiscount, getDiscount } from "./javascript/adminDiscount";
import AdminDeleteDiscount from "./adminDeleteDiscount";
import EditDiscount from "./EditDiscount";
export default function ManageDiscount() {
    const [showModal, setShowModal] = useState(false);
    const [discounts, setDicounts] = useState([])
    const [showDelete, setShowDelete] = useState(false)
    const [id_Discount, setId_Discount] = useState('')
    const [infoDiscount, setInfoDiscount] = useState({
        name: "",
        code: "",
        percent: 0,
        startDate: "",
        endDate: ""
    })
    const [showEdit, setShowEdit] = useState(false)
    const [item, setItem] = useState()
    async function discount() {
        const response = await getDiscount()
        setDicounts(response)
    }
    console.log(discounts)
    useEffect(() => {
        discount()
    }, [])
    function handleChange(e) {
        const { name, value } = e.target
        setInfoDiscount({ ...infoDiscount, [name]: value })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const response = await addDiscount(infoDiscount)
        if (response.message) {
            discount()
            setShowModal(!showModal)
        }
    }
    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-primary">🎁 Quản lý khuyến mãi</h4>
                <button
                    className="btn btn-success fw-semibold"
                    onClick={() => setShowModal(true)}
                >
                    <i className="bi bi-plus-circle me-2"></i> Thêm khuyến mãi
                </button>
            </div>

            {/* Discount List Table */}
            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body">
                    <table className="table align-middle table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Tên khuyến mãi</th>
                                <th>Mã giảm giá</th>
                                <th>Phần trăm (%)</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Dữ liệu mẫu */}
                            {discounts.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.code}</td>
                                        <td>{item.percent}%</td>
                                        <td>{new Date(item.startDate).toLocaleDateString('vi-Vn')}</td>
                                        <td>{new Date(item.endDate).toLocaleDateString('vi-Vn')}</td>
                                        <td>
                                            {item.isActive ?
                                                <span className="badge bg-success">Đang hoạt động</span>
                                                :<span className="badge bg-danger">Hết hạn</span>
                                            }
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => { setShowEdit(!showEdit), setItem(item) }}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger"
                                                onClick={() => { setShowDelete(!showDelete), setId_Discount(item._id) }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Thêm/Sửa */}
            {showModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">Thêm khuyến mãi</h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Tên khuyến mãi</label>
                                        <input type="text" name="name" className="form-control" placeholder="Nhập tên..." required
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Mã giảm giá</label>
                                        <input type="text" name="code" className="form-control" placeholder="Ví dụ: SALE2025" required
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Phần trăm giảm (%)</label>
                                        <input type="number" name="percent" className="form-control" placeholder="Nhập % giảm" required
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label fw-semibold">Ngày bắt đầu</label>
                                            <input type="date" name="startDate" className="form-control" required
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                        <div className="col">
                                            <label className="form-label fw-semibold">Ngày kết thúc</label>
                                            <input type="date" name="endDate" className="form-control" required
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Đóng
                                        </button>
                                        <button type="submit" className="btn btn-primary">Lưu khuyến mãi</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <AdminDeleteDiscount
                show={showDelete}
                onClose={() => setShowDelete(!showDelete)}
                id_Discount={id_Discount}
                onUpdate={() => discount()}
            >
            </AdminDeleteDiscount>
            <EditDiscount
                show={showEdit}
                onClose={() => { setShowEdit(!showEdit) }}
                item={item}
                onUpdate={() => discount()}
            >
            </EditDiscount>
        </div>
    );
}
