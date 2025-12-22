import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Cart.css";
import { useState, useContext, useEffect } from "react";
import { getCart, removeCart } from "./javascript/Cart";
import { useParams, useNavigate } from "react-router-dom";
import { cartContent } from "./Home";

export default function Cart() {
  const { setCart } = useContext(cartContent);
  const navigate = useNavigate();
  const id = useParams();
  const [book, setBook] = useState([]);
  const [state, setState] = useState({value:false,index:0,id_book:'',quantity:0})
  useEffect(() => {
    async function takeCart() {
      const response = await getCart(id);
      setBook(response);
    }
    takeCart();
  }, [id]);

  function handleHome() {
    navigate("/");
  }
  
  function handleRemove(id_book) {
    async function reCart() {
      const response = await removeCart(id, id_book);
      if (response.message === true) {
        setCart((pre) => pre - 1);
      }
    }
    reCart();
  }
  console.log(state)
  return (
    <div
      className="cart-page"
      style={{
        background: "linear-gradient(135deg, #f0f7ff 0%, #e1f7f1 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container py-5">
        <h2
          className="fw-bold mb-5 text-center"
          style={{
            color: "#007bff",
            letterSpacing: "0.5px",
          }}
        >
          🛒 Giỏ hàng của bạn
        </h2>

        <div
          className="card shadow-lg border-0"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div className="card-body px-4 py-4">
            <table className="table align-middle text-center table-hover  mb-0">
              <thead
                style={{
                  backgroundColor: "#f8f9fa",
                  borderBottom: "none", // bỏ gạch ngang trên
                }}
              >
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sách</th>
                  <th>Tác giả</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {book?.books?.length > 0 ? (
                  book.books.map((item, index) => (
                    <tr key={index} 
                    className={`table-row ${state.value&&state.index===index ?"active-row":""}`}
                    onClick={()=>{setState({value:true,index,id_book:item.book._id,quantity:item.quantity})}}
                    >
                      <td>
                        <img
                          src={`${item.book.img}`}
                          alt={item.book.name}
                          style={{
                            width: "70px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        />
                      </td>
                      <td className="fw-semibold">{item.book.name}</td>
                      <td>{item.book.author[0]}</td>
                      <td className="text-success fw-bold">
                        {item.book.price.toLocaleString("vi-VN")}₫
                      </td>
                      <td>{item.quantity}</td>
                      <td className="fw-semibold">
                        {(item.totalPrice * 1000).toLocaleString("vi-VN")}₫
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemove(item.book._id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          🗑 Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-muted py-4">
                      Giỏ hàng của bạn đang trống.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={handleHome}
              >
                ⬅ Tiếp tục mua sắm
              </button>

              <div className="text-end">
                <h5 className="fw-bold">
                  Tổng cộng:{" "}
                  <span className="text-success">
                    {book.total
                      ? Number(book.total * 1000).toLocaleString("vi-VN") + "₫"
                      : "0₫"}
                  </span>
                </h5>
                <button
                  className={`btn text-white mt-2 px-4 py-2 fw-semibold ${!state.value ? "disabled":""}`}
                  style={{
                    background:
                      "linear-gradient(90deg, #007bff 0%, #00c897 100%)",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  onClick={()=>{navigate(`/payment/${state.id_book}/${state.quantity}`)}}
                >
                  💳 Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
