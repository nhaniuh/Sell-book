import { useEffect, useState } from "react";
import { getBook } from "./javascript/Categories";
import EditBook from "./EditBook";
import RemoveBook from "./Remove";
export default function ManageBook() {
    const [book, setBook] = useState([]);
    const [category, setCategory] = useState("all");
    const [page, setPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState(null);
    const [remove,setRemove] = useState(null)
    async function getBooks() {
        const response = await getBook(category);
        setBook(response);
        setPage(1);
    }
    useEffect(() => {
        getBooks();
    }, [category]);

    const handleNext = () => {
        if (page < Math.ceil(book.length / 5)) setPage((pre) => pre + 1);
    };
    const handlePrev = () => {
        if (page > 1) setPage((pre) => pre - 1);
    };
    const handleClick = (num) => {
        setPage(num);
    };
    const start = (page - 1) * 5;
    const stop = page * 5;
    const arrayBook = book.slice(start, stop);
    const numberPage = Math.ceil(book.length / 5);

    // ====== PHÂN NHÓM TRANG (1-10, 11-20, ...) ======
    const pageGroupSize = 10;
    const currentGroup = Math.floor((page - 1) / pageGroupSize);
    const startPage = currentGroup * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize - 1, numberPage);

    const pagesToShow = [];
    for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
    }
    const handleEdit = (item) => {
        setSelectedBook({ ...item });
    };

    return (
        <div>
            <h4 className="fw-bold mb-3">📖 Quản lý Sách</h4>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-primary">
                    <i className="bi bi-plus-circle"></i> Thêm sách mới
                </button>

                <div className="d-flex align-items-center">
                    <label className="me-2 fw-bold">Thể loại:</label>
                    <select
                        className="form-select"
                        style={{ width: "200px" }}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="all">Tất cả</option>
                        <option value="Lịch sử">Lịch sử</option>
                        <option value="Thiếu Nhi">Thiếu nhi</option>
                        <option value="Địa lý">Địa lý</option>
                        <option value="Văn học">Văn học</option>
                        <option value="Chính trị">Chính trị</option>
                        <option value="Viễn tưởng">Viễn tưởng</option>
                    </select>
                </div>
            </div>
            <table className="table table-striped table-bordered align-middle">
                <thead className="table-primary">
                    <tr>
                        <th>#</th>
                        <th>Tên sách</th>
                        <th>Tác giả</th>
                        <th>Giá</th>
                        <th>Thể loại</th>
                        <th>Tồn kho</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {arrayBook.map((item, index) => (
                        <tr key={index}>
                            <td>{start + index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.author}</td>
                            <td>{item.price}</td>
                            <td>{item.categories}</td>
                            <td>{item.inventory}</td>
                            <td style={{ display: "flex" }}>
                                <button
                                    className="btn btn-sm btn-outline-success me-2"
                                    onClick={() => handleEdit(item)}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger"
                                onClick={() => {setRemove(item)}}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* PHÂN TRANG */}
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={handlePrev}>
                                ←
                            </button>
                        </li>

                        {pagesToShow.map((num) => (
                            <li
                                key={num}
                                className={`page-item ${page === num ? "active" : ""}`}
                            >
                                <button
                                    className="page-link fw-semibold"
                                    onClick={() => handleClick(num)}
                                >
                                    {num}
                                </button>
                            </li>
                        ))}

                        <li
                            className={`page-item ${page === numberPage ? "disabled" : ""
                                }`}
                        >
                            <button className="page-link" onClick={handleNext}>
                                →
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <EditBook
                bookData={selectedBook}
                onClose={() => setSelectedBook(null)}
                onSave={()=> getBooks()}
            ></EditBook>
            <RemoveBook
                bookData = {remove}
                onClose= {()=>setRemove(null)}
                onRemove= {()=>getBooks()}
            ></RemoveBook>
        </div>
    );
}
