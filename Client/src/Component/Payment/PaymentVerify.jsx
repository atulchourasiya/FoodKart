import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { logoutUser } from "../Navbar/NavbarFunc";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../Login/loginFunc";
import "./PaymentVerify.css";
import { deleteAllCartProduct } from "../../Redux/Slices/cartSlice";

const PaymentVerify = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authState);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const handlePaymentVerify = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/order/getpaymentstatus`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ razorpay_order_id: orderId }),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        setPaymentStatus(
          res.paymentStatus === "success" ? "success" : "failed"
        );
        return res;
      } else if (response.status === 401) {
        showToast(
          "warning",
          "Your login session is expired login again to continue"
        );
        logoutUser(dispatch);
        setPaymentStatus("failed");
      } else throw new Error("Something went wrong!");
    } catch (error) {
      console.error(error);
      setPaymentStatus("failed");
      showToast("error", "Something went wrong while sending message.");
    }
  };

  useEffect(() => {
    if (!orderId) {
      setPaymentStatus("failed");
      return;
    } else handlePaymentVerify();
  }, []);
  return (
    <div className='d-flex flex-column vh-100 justify-content-center align-items-center'>
      <div className='d-flex flex-column justify-content-center align-items-center payment-content'>
        {paymentStatus === "success" && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='green'
            class='bi bi-check-circle-fill'
            viewBox='0 0 16 16'>
            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
          </svg>
        )}
        {paymentStatus === "failed" && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='red'
            class='bi bi-x'
            viewBox='0 0 16 16'>
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
          </svg>
        )}

        <p className='text-dark p-2'>
          {paymentStatus === "pending" && "Fetching Payment Details"}
          {paymentStatus === "failed" && "Payment Not Found"}
          {paymentStatus === "success" && "Thankyou For Making Payment"}
        </p>
      </div>
      <div>
        <button
          className='button px-2 mx-2'
          style={{ fontFamily: "sans-serif" }}
          onClick={() => {
            dispatch(deleteAllCartProduct(user?.email));
            navigate("/");
          }}>
          Discard Item In Cart
        </button>
        <button
          className='button px-2 mx-2'
          style={{ fontFamily: "sans-serif" }}
          onClick={() => {
            navigate("/");
          }}>
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default PaymentVerify;
