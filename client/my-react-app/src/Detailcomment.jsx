import { useEffect, useState } from "react"
import { getComment, sendComment } from "./javascript/DetailComment"
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useNavigate} from "react-router-dom"
import moment from 'moment'
import 'moment/locale/vi'
export default function Comment({ id_Book }) {
    moment.locale('vi');
    const [comments, setComment] = useState([])
    const navigate = useNavigate()
    const [content, setContent] = useState('')
    async function comment() {
        const response = await getComment(id_Book)
        setComment(response)
    }
    useEffect(() => {
        comment()
    }, [])
    async function handleSubmit() {
        const response = await sendComment(content, id_Book)
        if (response.message) {
            setContent('')
            comment()
        }
        if(response.text){
            navigate('/login')
        }
    }
    return (
        <div className="container mt-5">
            <h4 className="fw-bold mb-4 border-bottom pb-2">💬 Bình luận</h4>

            {/* Form nhập bình luận */}
            <div className="mb-4">
                <label className="form-label fw-semibold">Viết bình luận của bạn:</label>
                <textarea
                    className="form-control rounded-3"
                    rows="3"
                    value={content}
                    placeholder="Nhập nội dung bình luận..."
                    onChange={(e) => { setContent(e.target.value) }}
                ></textarea>
                <div className="text-end mt-2">
                    <button className="btn btn-primary px-4 rounded-3" onClick={handleSubmit}>
                        Gửi bình luận
                    </button>
                </div>
            </div>

            {/* Danh sách bình luận */}
            <div className="comment-list">
                {comments.map((item, index) => (
                    <div key={index} className="comment-item p-3 mb-3 border rounded-3">
                        <div className="d-flex align-items-center mb-2">
                            {item.UserId.avatar ? (
                                <img
                                    src={item.UserId.avatar}
                                    alt="Avatar"
                                    className="rounded-circle me-2"
                                    width="40"
                                    height="40"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'inline';
                                    }}
                                />
                            ) : (
                                <i
                                    className="bi bi-person-circle text-secondary me-2"
                                    style={{ fontSize: '40px' }}
                                ></i>
                            )}

                            {/* Icon dự phòng nếu ảnh bị lỗi */}
                            <i
                                className="bi bi-person-circle text-secondary me-2"
                                style={{ fontSize: '40px', display: 'none' }}
                            ></i>

                            <div>
                                <strong>{item.UserId?.name || 'Người dùng'}</strong>
                                <div className="text-muted small">{moment(item.createdAt).locale('vi').fromNow()}</div>
                            </div>
                        </div>

                        <p className="mb-0">{item.content}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}