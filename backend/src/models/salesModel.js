//not in use for sales 

import { Schema, model } from 'mongoose';

const dashboard_sales = new Schema(
  {
    totalRevenue: Number,
    totalOrders: Number,
    totalCustomers: Number,
    avgOrders: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const dbsales = model("dashboard_sales", dashboard_sales);
export default dbsales;