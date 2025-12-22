import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteDiscount } from "./javascript/adminDiscount";
export default function AdminDeleteDiscount({ show, onClose,id_Discount,onUpdate }) {
    if (!show) return null;
    async function deleteDiscounts() {
        const response = await deleteDiscount(id_Discount)
        if(response.message){
            onUpdate(),
            onClose()
        }
    }
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1050 }}
        >
            <div
                className="bg-white rounded-4 shadow p-4 text-center"
                style={{ width: "400px" }}
            >
                <h5 className="fw-bold text-danger mb-3">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Xác nhận hủy
                </h5>
                <p className="text-secondary">
                    Bạn có chắc chắc muốn xóa mã giảm giá này không?<br />
                </p>

                <div className="d-flex justify-content-center mt-4">
                    <button
                        className="btn btn-secondary px-4 me-3"
                        onClick={onClose}
                    >
                        <i className="bi bi-x-circle me-1"></i> Hủy
                    </button>
                    <button
                        className="btn btn-danger px-4"
                        onClick={()=>deleteDiscounts()}
                    >
                        <i className="bi bi-trash3 me-1"></i> Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}
