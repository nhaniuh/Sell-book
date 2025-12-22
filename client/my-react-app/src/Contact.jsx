import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Contact.css";

export default function Contact() {
    return (
        <div className="contact-page">
            <div className="container py-5">
                <p className="text-center text-secondary mb-5 fs-5">
                    Chúng tôi luôn sẵn sàng lắng nghe mọi phản hồi và câu hỏi của bạn 💬
                </p>

                <div className="row justify-content-center align-items-start">
                    <div className="col-lg-6 mb-4">
                        <div className="contact-card shadow-lg p-4 border-0 rounded-4">
                            <h5 className="fw-bold mb-3 text-primary">Gửi tin nhắn 📧</h5>

                            <form>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Họ và tên</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-pill"
                                        placeholder="Nhập họ và tên..."
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input
                                        type="email"
                                        className="form-control rounded-pill"
                                        placeholder="Nhập địa chỉ email..."
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Nội dung</label>
                                    <textarea
                                        className="form-control rounded-4"
                                        rows="4"
                                        placeholder="Nhập nội dung bạn muốn gửi..."
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-gradient w-100 fw-semibold py-2 mt-2"
                                >
                                    ✉️ Gửi tin nhắn
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="info-card shadow-lg p-4 rounded-4">
                            <h5 className="fw-bold text-success mb-3">
                                Thông tin liên hệ 📞
                            </h5>
                            <ul className="list-unstyled fs-6 text-secondary">
                                <li className="mb-3">
                                    <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                                    12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-telephone-fill text-success me-2"></i>
                                    0909 123 456
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-envelope-fill text-danger me-2"></i>
                                    support@bookworld.vn
                                </li>
                                <li>
                                    <i className="bi bi-globe2 text-info me-2"></i>
                                    www.bookworld.vn
                                </li>
                            </ul>

                            <div className="social-icons mt-4">
                                <a href="http://facebook.com" className="social facebook">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="https://www.instagram.com/" className="social instagram">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="https://x.com/" className="social twitter">
                                    <i className="bi bi-twitter"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
