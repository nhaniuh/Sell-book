import { useState, useEffect } from "react";
import { editBook, getDiscount } from "./javascript/EditBook";

export default function EditBook({ bookData, onClose, onSave }) {
    const [book, setBook] = useState(bookData);
    const [discount, setDiscount] = useState([])
    const [search, setSearch] = useState()
    useEffect(() => {
        async function takeDiscount() {
            const response = await getDiscount()
            setDiscount(response)
        }
        takeDiscount()
    }, [])
    useEffect(() => {
        setBook(bookData);
        if(bookData&&bookData.discount){
            setSearch(bookData.discount._id)
        }else{
            setSearch("")
        }
    }, [bookData]);
    if (!book) return null;

    async function save() {
        const response = await editBook(book);
        if (response.message) {
            onClose();
            onSave();
            setSearch("")
        }
    }
    return (
        <div
            className="position-fixed top-0 start-0 w-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 100, height: "100%" }}
        >
            <div
                className="bg-white p-4 rounded shadow-lg m-3"
                style={{ width: "700px", maxHeight: "90%", overflowY: "auto" }}
            >
                <h5 className="fw-bold mb-4 text-center">✏️ Chỉnh sửa thông tin sách</h5>

                <div className="row g-3">
                    {/* Cột trái */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Tên sách</label>
                            <input
                                type="text"
                                className="form-control"
                                value={book.name}
                                onChange={(e) => setBook({ ...book, name: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Tác giả</label>
                            <input
                                type="text"
                                className="form-control"
                                value={book.author}
                                onChange={(e) => setBook({ ...book, author: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Giá</label>
                            <input
                                type="number"
                                className="form-control"
                                value={book.price}
                                onChange={(e) => setBook({ ...book, price: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Cột phải */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Thể loại</label>
                            <select
                                className="form-select"
                                value={book.categories}
                                onChange={(e) => setBook({ ...book, categories: e.target.value })}
                            >
                                <option value="Lịch sử">Lịch sử</option>
                                <option value="Thiếu nhi">Thiếu nhi</option>
                                <option value="Địa lý">Địa lý</option>
                                <option value="Văn học">Văn học</option>
                                <option value="Chính trị">Chính trị</option>
                                <option value="Viễn tưởng">Viễn tưởng</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Tồn kho</label>
                            <input
                                type="number"
                                className="form-control"
                                value={book.inventory}
                                onChange={(e) => setBook({ ...book, inventory: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Mã giảm giá</label>
                            <select
                                className="form-select"
                                value={search ? search : ""}
                                onChange={(e) => { setSearch(e.target.value), setBook({ ...book, discount: e.target.value === "" ? null : e.target.value }) }}
                            >
                                <option value="">--Không áp dụng--</option>
                                {discount.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}
                                        >{item.code} - {item.percent}% - {item.name} - {item.isActive?" Đang hoạt động":" Hết hạn"}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>


                {/* Nút */}
                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary me-2" onClick={onClose}>
                        Hủy
                    </button>
                    <button className="btn btn-primary" onClick={save}>
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
}
