const { default: axios } = require("axios")
const Order = require("../../../model/orderSchema")
const User = require("../../../model/userModel")




exports.initialKhaltiPayment = async(req, res)=>{
    const {orderId, amount} = req.body
 //   console.log(orderId, amount)
    if(!orderId || !amount){
        return res.status(400).json({
            message : 'Please provide orderId, amount'
        })
    }

    const order = await Order.findById(orderId)
if(!order){
    return res.status(404).json({
        message:"Order not found with that id"
    })
}

//check if paid amount is same as total amount


if(order.totalAmount !== amount){
    return res.status(400).json({
        message:"Amount must be equal to totalAmount"
    })
}


    const data = {
        return_url : "http://localhost:5173/success",
        purchase_order_id : orderId,
        amount : amount * 10, // yaa jamma *10 garnu ko karan chai 10 dekhi 1000 line vaera  //khalti le paisa ma liney vako le
        website_url : "http://localhost:3000/",
        purchase_order_name : "orderName_" + orderId

    }

    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
        headers : {
            'Authorization' : 'key b83a705cae3a4403ad044e276d24f839'
        }

    })
// console.log(response)

order.paymentDetails.pidx = response.data.pidx
await order.save()
    res.status(200).json({
        message:"Payment successful",
        paymentUrl : response.data.payment_url
    })  //frontend ma backend le redirect garxa yo api call garda

}


exports.verifyPidx = async(req, res)=>{
    const pidx = req.body.pidx
 const response =  await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},{
    headers : {
        'Authorization' : 'key b83a705cae3a4403ad044e276d24f839'
    }

})
//res.send(response.data)
    if(response.data.status == 'Completed'){
        //database ma modificaton
        let order = await Order.find({'paymentDetails.pidx' : pidx})
        order[0].paymentDetails.method = 'khalti'
        order[0].paymentDetails.status = "paid"
        await order[0].save()
        
        res.status(200).json({
            message : "Payment Verified Successfully"
        })
        
    }
}




