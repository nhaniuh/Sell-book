import { useState } from "react"
import { editDiscount } from "./javascript/EditDiscount";
export default function EditDiscount({ item, show, onClose, onUpdate }) {
    if (!show) return null
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const [inforItem, setInfoItem] = useState({
        id: item._id,
        name: item.name,
        code: item.code,
        percent: item.percent,
        isActive: item.isActive,
        startDate: formatDate(item.startDate),
        endDate: formatDate(item.endDate)
    })
    function handleChange(e) {
    const { name, value } = e.target;

    setInfoItem({
        ...inforItem,
        [name]: name === "isActive" ? value === "true" : value
    });
}
    async function handleSubmit(e) {
        e.preventDefault()
        const response = await editDiscount(inforItem)
        if (response.message) {
            onClose()
            onUpdate()
        }
    }
    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit khuyến mãi</h5>
                            <button
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Tên khuyến mãi</label>
                                    <input type="text" name="name" value={inforItem.name} className="form-control" placeholder="Nhập tên..." required
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Mã giảm giá</label>
                                    <input type="text" name="code" value={inforItem.code} className="form-control" placeholder="Ví dụ: SALE2025" required
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Phần trăm giảm (%)</label>
                                    <input type="number" name="percent" value={inforItem.percent} className="form-control" placeholder="Nhập % giảm" required
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Trạng thái mã giảm</label>
                                    <select name="isActive" className="form-select"
                                    value={inforItem.isActive?"true":"false"}
                                    onChange={(e)=> handleChange(e)} 
                                    >
                                        <option value="true">Đang hoạt động</option>
                                        <option value="false">Hết hạn</option>
                                    </select>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label fw-semibold">Ngày bắt đầu</label>
                                        <input type="date" name="startDate" value={inforItem.startDate} className="form-control" required
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label fw-semibold">Ngày kết thúc</label>
                                        <input type="date" name="endDate" value={inforItem.endDate} className="form-control" required
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={onClose}
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
        </>
    )
}