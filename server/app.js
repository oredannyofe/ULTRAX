const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// Legacy commerce routes (order/payment/product/user) are not used by the DEX MVP
// so we no longer mount them here. They remain in the repo for reference only.
// const orderRouter = require("./routes/orderRoute");
// const paymentRouter = require("./routes/paymentRoute");
// const productRouter = require("./routes/productRoute");
// const userRouter = require("./routes/userRoute");
const bnbPriceRouter = require("./routes/bnbPriceRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// DEX MVP: only expose the price/market-trends API under /api
// app.use('/api/order', orderRouter);
// app.use('/api/payment', paymentRouter);
// app.use('/api/product', productRouter);
// app.use('/api/user', userRouter);
app.use('/api', bnbPriceRouter);

// deployment
const ROOT_DIR = path.resolve(__dirname, "..");
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(ROOT_DIR, "build");

  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

module.exports = app;
