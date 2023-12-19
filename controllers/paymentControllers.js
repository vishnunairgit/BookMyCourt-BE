
const COURT_SCHEDULES=require('../models/courtSchedules')
const Razorpay = require("razorpay");
const crypto = require("crypto")
const nodemailer = require("nodemailer");
// const COURTS_SCHEMA = require("../models/courtSchema");


const orders = async (req,res) =>{
    console.log('inside payment controller',req.body.slotId);
    const slotData = await COURT_SCHEDULES.findOne({_id:req.body.slotId})
    if (slotData?.bookedBy) {
        res.status(400).json({message:'slot alredy booked'})
    }else{
        try {
            const instance = new Razorpay({
                key_id: 'rzp_test_PDgtn0gQI671ND',
                key_secret: 'dBLE9nMEQVUXa9rtVlqob6SO',
            });
    
            const options = {
                amount: slotData.cost*100, // amount in smallest currency unit
                currency: "INR",
                receipt: slotData._id,
            };
    
            const order = await instance.orders.create(options);
    
            if (!order) return res.status(500).send("Some error occured");
    
            res.json(order);
        } catch (error) {

            res.status(500).send(error);
        }
    }
}



const paymentSuccess=async (req,res)=>{
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            slotId,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "dBLE9nMEQVUXa9rtVlqob6SO");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

      await COURT_SCHEDULES.updateOne({_id:slotId},{$set:{bookedBy:req.userID},$push:{ paymentOrder:{userID:req.userID,razorpayPaymentId, timeStamp:new Date()} } })
      initiateEmail(slotId, razorpayPaymentId)

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
};

const initiateEmail=async(_id, razorpayPaymentId) =>{
    const slotData = await COURT_SCHEDULES.findOne({_id:_id}).populate('bookedBy').populate('courtId')

    // const slotData = await COURT_SCHEDULES.findOne({_id:_id}).populate('bookedBy').populate('courtId')
    // here we are spredding the data {slotData.bookedBy.email. its will convert to bookedBy.email. }
    const {date,slot,bookedBy,courtId,cost}= slotData; 
// nodemailer
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "infovishnunair@gmail.com",
      pass: "zdah oepq hlyi uhct",
    },
  });
//   async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from:"infovishnunair@gmail.com", // sender address
      to: [ bookedBy.email, "infovishnunair@gmail.com ","infovishnuac@gmail.com" ], // list of receivers
      subject: "Booking Confirmed ✔", // Subject line
      text: "Thanks for the booking", // plain text body
      html: `<b>Hellow ${bookedBy.fname} ${bookedBy.lname}</b> <p> your Booking at ${courtId.CourtName}   on ${new Date(date)}   at${slot.name}  `   , // html body
    });
    console.log("Message sent: %s", info.messageId)

}




module.exports={orders,paymentSuccess}

// bookedB