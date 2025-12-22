import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Profile.css";
import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Infor, changePassword, updateGender, uploadFile } from "./javascript/Infor";
import { cartContent } from './Home';
export default function Profile() {
  const navigate = useNavigate()
  const {setAvatar} = useContext(cartContent)
  const [infor, setInfor] = useState({});
  const [gender, setGender] = useState('')
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(false);
  const [message2, setMessage2] = useState(false);
  async function getUser() {
    const response = await Infor();
    setInfor(response.user);
    setGender(response.user.gender ? response.user.gender : "");
  }
  useEffect(() => {
    getUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      return setMessage(true);
    } else {
      setMessage(false);
    }
    const response = await changePassword(password);
    if (!response.message) {
      setGender(response.gender)
      setMessage2(true);

    } else {
      navigate('/login')
    }

  }
  async function handleChangeGender() {
    try {
      const response = await updateGender(gender)
      if (response.message) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      } else {
        alert('Không thành công')
      }
    } catch (err) {
      console.log('Lỗi tại hàm handleChanegeGender' + err)
    }
  }
  return (
    <div className="profile-page">
      <div className="container">
        <h2 className="text-centert mt-5">
          👤 Trang Cá Nhân
        </h2>

        <div className="row justify-content-center align-items-start g-4">
          <div className="col-12 text-center mb-4">
            {infor.avatar ? (
              <img
                src={infor.avatar.includes('.com') ? infor.avatar : `http://localhost:5000${infor.avatar}`}
                alt="Avatar"
                className="rounded-circle shadow-sm mb-3"
                width="120"
                height="120"
                style={{ objectFit: "cover", border: "3px solid #0d6efd" }}
              />
            ) : (
              <div
                className="rounded-circle shadow-sm mb-3 d-flex align-items-center justify-content-center bg-light mx-auto"
                style={{
                  width: "120px",
                  height: "120px",
                  border: "3px solid #0d6efd",
                }}
              >
                <i
                  className="bi bi-person-circle text-primary"
                  style={{ fontSize: "70px" }}
                ></i>
              </div>
            )}

            <div>
              <label
                htmlFor="avatarUpload"
                className="btn btn-outline-primary btn-sm rounded-pill fw-semibold"
                style={{ cursor: "pointer" }}
              >
                📷 Chọn ảnh mới
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className="d-none"
                onChange={async (e) => {
                  const response = await uploadFile(e.target.files[0])
                  if (response.success) {
                    setInfor({...infor,avatar:response.avatar})
                    setAvatar(response.avatar)
                  }
                }}
              />
            </div>
          </div>
          {/* 🩵 Thông tin cá nhân */}
          <div className="col-lg-5">
            <div className="info-card shadow p-4 rounded-4">
              <h5 className="fw-bold text-primary mb-4">Thông Tin Cá Nhân</h5>
              <div className="mb-3">
                <label className="form-label fw-semibold">Họ và tên</label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  value={infor.name || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  value={infor.email || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Giới tính</label>
                <select
                  className="form-select rounded-pill"
                  value={gender}
                  onChange={(e) => { setGender(e.target.value) }}
                >
                  <option value="" disabled>Chưa xác định</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>

              </div>
            </div>
            <button className="btn btn-gradient w-100 fw-semibold py-2 mt-2"
              onClick={handleChangeGender}
            >
              Cập nhật thông tin
            </button>
          </div>

          {/* 🔒 Đổi mật khẩu */}
          <div className="col-lg-5">
            <div className="password-card shadow p-4 rounded-4">
              <h5 className="fw-bold text-success mb-4">Đổi Mật Khẩu</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    name="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    onChange={handleChange}
                  />
                  {message2 && (
                    <p className="text-danger mt-2">
                      ⚠️ Mật khẩu hiện tại không đúng!
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    name="newPassword"
                    placeholder="Nhập mật khẩu mới"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu mới"
                    onChange={handleChange}
                    required
                  />
                  {message && (
                    <p className="text-danger mt-2">
                      ⚠️ Mật khẩu xác nhận không khớp!
                    </p>
                  )}
                </div>

                <button type="submit" className="btn btn-gradient w-100 fw-semibold py-2 mt-2"
                >
                  💾 Cập nhật mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {success &&
        <div
          className="alert alert-success text-center fw-semibold position-fixed top-50 start-50 translate-middle shadow-lg"
          style={{ zIndex: 1055, width: "280px", borderRadius: "12px" }}
          role="alert"
        >
          ✅ Cập nhật thành công!
        </div>
      }
    </div>
  );
}
