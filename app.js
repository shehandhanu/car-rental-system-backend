const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//Set Cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Import Routes
const user = require("./routes/User.Routes");
const vehicals = require("./routes/Vehical.Routes");
const empoyee = require("./routes/Employee.Routes");
// const product = require('./routes/product');
// const order = require('./routes/order');
const owners = require("./routes/Owner.Routes");

//use Routes
app.use("/api/v1/user", user);
app.use("/api/v1/vehical", vehicals);
app.use("/api/v1/employee", empoyee);
// app.use('/product', product)
// app.use('/order', order)
app.use("/api/v1/owner", owners);

module.exports = app;
