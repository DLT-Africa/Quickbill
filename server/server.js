const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const clientRoutes = require("./routes/clientRoutes");


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" })); //parse json data inside the req body
app.use(express.urlencoded({ extended: true })); // parse form data inside the req body
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/employees", employeeRoutes);
app.use("/clients", clientRoutes)


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Is 🏃‍♂️ On PORT ${PORT}`));
  })
  .catch((err) => console.log(err));
