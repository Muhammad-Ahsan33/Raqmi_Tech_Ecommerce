import OrderModel from '../models/orderModel.js'

const CreateOrder = async (req , res) =>{
    try{
        const { Id , price , userId, productIds } = req.body;
        if(!Id || !userId || !productIds || !price){
            return res.status(400).json({error: 'Data is not provided'});
        }
        const neworder = new OrderModel({Id , price , userId , productIds , orderStatus: 'pending'});
        const saveneworder = await neworder.save();
        if(!saveneworder){
            return res.status(404).json({error: 'cant save the file'});
        }
        res.send('Order Created successfully');
    }
    catch(error){
        res.status(400).json({ error: 'Failed to create Order', details: error.message });

    }

}

const getorderbyuserid = async(req , res) =>{
    try{
        const userid = req.body.userId;
        if(!userid){
            return res.status(400).json({error: 'User ID not provided'});
        }
        const userorders = await OrderModel.findOne({userid});
        if(!userorders){
            return res.status(400).json({error: 'User not Found '});
        }
        return res.status(200).json(userorders);
    }
    catch(error){
        return res.status(404).json({error: 'Failed to fetch Orders due to Internal issues'});
    }

}

const getorderbyproductid = async(req ,res) =>{
    try{
        const productid = req.body.productIds;
        if(!productid){
            return res.status(400).json({error: 'Product ID is not Provided'});
        }
        const orderbyproduct = await OrderModel.findById(productid).populate('productIds');
        if(!orderbyproduct){
            return res.status(404).json({error: 'Product ID not found'});
        }
        return res.status(200).json(orderbyproduct);
    }
    catch(error){
        return res.status(404).json({error: 'Failed to fetch Orders due to Internal issues'});
    }
}

const getallorders = async(req , res) =>{
    try {
        const orders = await OrderModel.find();
        return res.status(200).json(orders);
    }
    catch(error){
        return res.status(404).json(error);

    }
}


const updateorderstatus = async(req ,res) =>{
    try{
        const{id , status} = req.body;
        if(!id || !status){
            return res.status(400).json({error: 'Id or Order status is not provided'});
        }
        orderStatusupdate = await findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });
        if(!orderStatusupdate){
            return res.status(400).json({error: 'Id not found'});
        }
        return res.status(200).json({orderStatusupdate});
    }
    catch(error){
        return res.status(404).json({error: 'Failed to Fetch Order due to Internal issues'});
    }
}

const deleteorder = async(req , res) =>{
    try{
        const orderid = req.body.Id;
        if(!orderid){
            return res.status(400).json({error: 'Orderid not Provided'});
        }
        const dorder = await OrderModel.findOneAndDelete({orderid});
        if(!dorder){
            return res.status(400).json({error: 'Id not found'});
        }
        return res.status(200).json(dorder);

    }
    catch(error){
        return res.status(404).json(error);
    }
}

export default{
    CreateOrder,
    getorderbyuserid,
    getorderbyproductid,
    updateorderstatus,
    getallorders,
    deleteorder
}