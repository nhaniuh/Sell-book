import React from "react";
import { removeBook } from "./javascript/RemoveBook";
export default function RemoveBook({bookData, onClose, onRemove}) {
  if(!bookData) return null
  async function handleRemove(){
     const response = await removeBook(bookData)
     console.log(response)
     if(response.message){
        onClose()
        onRemove()
     }
  }
  return (
    <div
      className="position-fixed top-0 start-0 w-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 200,
        height: "100%",
      }}
    >
      <div
        className="bg-white p-4 rounded shadow-lg text-center"
        style={{ width: "400px" }}
      >
        <h5 className="fw-bold mb-3 text-danger">⚠️ Xác nhận xóa sách</h5>
        <p>Bạn có chắc chắn muốn xóa cuốn sách này không?</p>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-secondary me-3" onClick={onClose}>
            Hủy
          </button>
          <button className="btn btn-danger" onClick={handleRemove}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
