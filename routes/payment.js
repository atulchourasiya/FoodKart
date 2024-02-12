const express = require('express');
const instance = require('../config.js/payment');
const router = express.Router();
const crypto = require('crypto');
const { auth } = require('../middleware/reqAuth');
const Order = require('../model/Order');

router.post('/initializepayment', auth, async (req, res) => {
   try {
      const { amount } = req.body;
      const options = {
         amount: Number(amount * 100),
         currency: "INR",
      };
      const order = await instance.orders.create(options);
      res.status(200).json({ ...order, key: process.env.KEY_ID });
   } catch (error) {
      console.log(error);
   }
});

router.post('/verifypayment', auth, async (req, res) => {
   try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
         .createHmac("sha256", process.env.KEY_SECRET)
         .update(body.toString())
         .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;
      if (isAuthentic) {
        await Order.updateOne(
            { razorpay_order_id: razorpay_order_id },
            {
               $set: {
                  paymentStatus: "success",
                  razorpay_payment_id,
                  razorpay_signature,
               },
            }
         );
         res.redirect(
            `${process.env.CLIENT_URL}/#/order/${razorpay_order_id}`
         );
      } else {
         res.status(400).json({
            success: false,
         });
      }
   } catch (error) {
      console.log(error);
   }
});


module.exports = router; 