import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '../../Component/Navbar/NavbarFunc';
import { showToast } from '../../Component/Login/loginFunc';
import { addOrder } from './orderSlice';


const initialState = {
   payment: false
};

export const initializePayment = createAsyncThunk('payment/initializePayment', async (order, { dispatch }) => {
   try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/payment/initializepayment`, {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ amount: order.amount })
      });
      if (response.status === 200) {
         const res = await response.json();
         dispatch(
            addOrder({
               ...order,
               razorpay_order_id : res.id,
               paymentAmount : Number(res.amount),
               paymentStatus: 'pending',
            })
         );
         const options = {
            "key": res.key,
            "amount": res.amount,
            "currency": "INR",
            "name": "FoodKart",
            "description": "Money will not be deducted hence it is a test order",
            "order_id": res.id,
            "callback_url": `${process.env.REACT_APP_API_HOST}/payment/verifypayment`,
            "theme": {
               "color": "#ffff75",
            }
         };
         const razorpay = new window.Razorpay(options);
         razorpay.open();
         return res;
      } else if (response.status === 401) {
         showToast('warning', 'Your login session is expired login again to continue');
         logoutUser(dispatch);
      } else throw new Error('Something went wrong!');
   } catch (error) {
      console.error(error);
      showToast('error', 'Something went wrong while sending message.');
   }
});


const paymentSlice = createSlice({
   name: 'Payment',
   initialState,
   reducers: {
      setPayment: (state, action) => {
         state.payment = action.payload;
      }
   }

});

export const { setPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
