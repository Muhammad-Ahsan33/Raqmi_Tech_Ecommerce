import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

//Routes
// import clientRoutes from "./routes/client.js";
// import generalRoutes from "./routes/general.js";
import reviewRoute from "./src/routes/reviewRoutes.js";
import userRoute from "./src/routes/userRoutes.js";
import categoryRoute from "./src/routes/categoryRoutes.js";
import productRoute from "./src/routes/product2Routes.js";
import orderRoute from "./src/routes/orderRoutes.js";
// import inventoryRoute from "./src/routes/inventoryRoutes.js";
import inventoryRoute from "./src/routes/inventoryRoutes.js";
import paymentRoute from "./src/routes/paymentRoutes.js";
import dashboardRoute from "./src/routes/dashboardRoute.js";
import homepageRoute from "./src/routes/homepageRoutes.js";
import aboutusRoute from "./src/routes/aboutusRoutes.js";
import contectusRoute from "./src/routes/contectusRoutes.js";
import mouseRoute from "./src/routes/mouseRoutes.js";
import speakerRoute from "./src/routes/speakerRoutes.js";
import keyboardRoute from "./src/routes/keyboardRoutes.js";
import headphonesRoute from "./src/routes/headphonesRoutes.js";
import monitorRoute from "./src/routes/monitorRoutes.js";
import cartRoute from "./src/routes/cartRoutes.js";
import chatbotRoute from "./src/routes/chatbotRoutes.js";
import pay from "./src/routes/paymentRoute2.js";

//Database
import dbconnect from './src/config/db.js';

/* CONFIGURATION */
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/* ROUTES */
// app.use("/client", clientRoutes);
app.use("/dashboard", dashboardRoute);
app.use("/review", reviewRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);
app.use("/product", productRoute); 
app.use("/category" , categoryRoute);
app.use("/inventory" , inventoryRoute);
app.use("/payment" , paymentRoute);
app.use("/homepage" , homepageRoute);
app.use("/aboutus" , aboutusRoute);
app.use("/contectusus" , contectusRoute);
app.use("/mouse" , mouseRoute);
app.use("/keyboard" , keyboardRoute);
app.use("/monitor" , monitorRoute);
app.use("/speaker" , speakerRoute);
app.use("/headphones" , headphonesRoute);
app.use("/cart" , cartRoute);
app.use("/chatbot" , chatbotRoute);
app.use("/make_payment" , pay);

dbconnect();

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
})