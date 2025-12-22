import "bootstrap/dist/css/bootstrap.min.css";
import "./css/About.css";
import { useNavigate } from "react-router-dom";
export default function About() {
    const navigate = useNavigate()
    return (
        <div className="about-page">
            {/* ====== HERO SECTION ====== */}
            <section className="about-hero text-center text-white py-5">
                <h1 className="fw-bold display-5">
                    📚 Chào mừng đến với <span className="text-warning">BookWorld</span>
                </h1>
                <p className="fs-5 mt-3 text-white-50">
                    Nơi tri thức được lan tỏa – Mỗi cuốn sách là một hành trình khám phá.
                </p>
            </section>

            <div className="container py-5">
                {/* ====== SỨ MỆNH ====== */}
                <div className="row align-items-center mb-5">
                    <div className="col-md-6">
                        <img
                            src="/sach1About.jpg"
                            alt="Books"
                            className="img-fluid rounded shadow-lg"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="fw-bold text-primary mb-3">Sứ mệnh của chúng tôi</h2>
                        <p className="fs-5 text-secondary">
                            <strong>BookWorld</strong> được thành lập với khát vọng mang đến cho mọi người
                            cơ hội tiếp cận tri thức dễ dàng hơn bao giờ hết. Chúng tôi không chỉ bán sách —
                            chúng tôi kết nối tri thức, truyền cảm hứng đọc và khuyến khích học hỏi suốt đời.
                        </p>
                        <button onClick={()=>{navigate('/')}} className="btn btn-success px-4 mt-2 shadow-sm">Khám phá ngay</button>
                    </div>
                </div>

                {/* ====== GIÁ TRỊ CỐT LÕI ====== */}
                <h2 className="fw-bold text-center text-primary mb-4">Giá trị cốt lõi</h2>
                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="core-card bg-light-blue">
                            <div className="fs-1 text-primary mb-3">📚</div>
                            <h5 className="fw-bold text-dark mb-2">Kho sách đa dạng</h5>
                            <p className="text-secondary">
                                Hơn <strong>10.000+</strong> đầu sách trong mọi lĩnh vực — văn học, công nghệ,
                                kỹ năng sống, kinh tế và hơn thế nữa!
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="core-card bg-light-yellow">
                            <div className="fs-1 text-warning mb-3">⚡</div>
                            <h5 className="fw-bold text-dark mb-2">Giao hàng siêu tốc</h5>
                            <p className="text-secondary">
                                Đặt sách hôm nay — nhận ngay trong 24h!
                                Chúng tôi hợp tác cùng các đơn vị vận chuyển hàng đầu toàn quốc.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="core-card bg-light-green">
                            <div className="fs-1 text-success mb-3">💚</div>
                            <h5 className="fw-bold text-dark mb-2">Dịch vụ tận tâm</h5>
                            <p className="text-secondary">
                                Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ,
                                giúp bạn chọn sách, đổi trả hoặc gợi ý theo sở thích.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ====== TẦM NHÌN ====== */}
                <div className="vision-card shadow-sm mb-5">
                    <div className="card-body p-5">
                        <h3 className="fw-bold text-success mb-3">Tầm nhìn của BookWorld</h3>
                        <p className="fs-5 text-secondary">
                            Chúng tôi hướng đến việc trở thành <strong>nền tảng đọc sách hàng đầu Việt Nam</strong> –
                            nơi người đọc có thể tìm thấy tri thức phù hợp với mọi giai đoạn cuộc sống.
                            BookWorld không chỉ là cửa hàng, mà là một <strong>cộng đồng yêu sách</strong>,
                            nơi lan tỏa niềm đam mê và cảm hứng học hỏi.
                        </p>
                    </div>
                </div>

                {/* ====== ĐỘI NGŨ PHÁT TRIỂN ====== */}
                <h2 className="fw-bold text-center text-primary mb-4">👨‍💻 Đội ngũ phát triển</h2>
                <div className="row g-4 justify-content-center mb-5">
                    <div className="col-md-3 col-sm-6">
                        <div className="team-card">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="Founder"
                                className="team-avatar"
                            />
                            <h5 className="fw-bold text-success mb-1">Nguyễn Danh Nhân</h5>
                            <p className="text-muted mb-2">Founder & Fullstack Developer</p>
                            <p className="text-secondary small">
                                Người sáng lập và phát triển hệ thống <strong>BookWorld</strong>.
                                Đam mê lập trình, yêu thích sách và mong muốn kết nối tri thức Việt.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="team-card">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                                alt="Backend Developer"
                                className="team-avatar"
                            />
                            <h5 className="fw-bold text-success mb-1">Châu Văn Thành</h5>
                            <p className="text-muted mb-2">Backend Developer</p>
                            <p className="text-secondary small">
                                Phụ trách phần xử lý dữ liệu và API cho hệ thống.
                                Luôn đảm bảo hiệu suất và bảo mật tối ưu.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ====== LIÊN HỆ ====== */}
                <div className="text-center border-top pt-4 contact-section">
                    <h5 className="fw-semibold text-primary mb-2">📬 Liên hệ với chúng tôi</h5>
                    <p className="text-secondary mb-1">
                        Email:{" "}
                        <a href="mailto:support@bookworld.vn" className="text-decoration-none text-success">
                            support@bookworld.vn
                        </a>
                    </p>
                    <p className="text-secondary">
                        Hotline: <strong className="text-danger">0909 123 456</strong>
                    </p>
                    <p className="text-muted mt-3 mb-0">
                        © {new Date().getFullYear()} <strong>BookWorld</strong> — Nơi tri thức hội tụ 🌟
                    </p>
                </div>
            </div>
        </div>
    );
}
