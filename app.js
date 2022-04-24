const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//Set Cors
app.use(
  cors({
    origin: "https://blackcode-carrentalsystem-fron.herokuapp.com",
    credentials: true,
  })
);

//Import Routes
const leaves = require('./routes/Leaves.Router');
const user = require("./routes/User.Routes");
const vehicals = require("./routes/Vehical.Routes");
const empoyee = require("./routes/Employee.Routes");
const owners = require("./routes/Owner.Routes");
const reservation = require("./routes/Reservation.Routes");
const services = require("./routes/RepairService.Routes");
const product = require("./routes/Product.Routes");
const slideShowMovie = require("./routes/slideShowMovie");
const movieList = require("./routes/movieList");

//use Routes
app.use('/api/v1/leaves', leaves)
app.use("/api/v1/user", user);
app.use("/api/v1/vehical", vehicals);
app.use("/api/v1/employee", empoyee);
app.use("/api/v1/owner", owners);
app.use("/api/v1/reservation", reservation);
app.use("/api/v1/service", services);
app.use("/api/v1/product", product);
app.use("/slideShowMovie", slideShowMovie);
app.use("/api/v1/movieDetails", movieList);

module.exports = app;
