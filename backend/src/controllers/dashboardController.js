import OrderModel from '../models/orderModel.js';

const instant_data = async(req , res) =>{
    try{
         // Fetch total revenue (sum of order prices)
    const totalRevenue = await OrderModel.aggregate([
        { $group: { _id: null, total: { $sum: "$price" } } },
      ]);
  
      // Fetch total number of orders
      const totalOrders = await Order.countDocuments();
  
      // Fetch unique customers who placed orders
      const customers = await Order.distinct("userId");
  
      // Calculate Average Order Value
      const avgOrder = totalOrders > 0 ? totalRevenue[0]?.total / totalOrders : 0;
  
      // Send the response
      res.json({
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        customers: customers.length,
        avgOrder: avgOrder.toFixed(2),
      });
    }
    catch(error){
        return res.status(500).json({message: 'Internal Sever Error while fetching Dashboard data' ,error});
    }
}

 export default {
    instant_data,
 }