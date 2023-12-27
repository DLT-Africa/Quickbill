const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const initializePassport = require("./config/passport-setup")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 
const invoiceRoutes = require("./routes/invoiceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const clientRoutes = require("./routes/clientRoutes");
const payrollRoutes = require("./routes/payrollRoutes");


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" })); //parse json data inside the req body
app.use(express.urlencoded({ extended: true })); // parse form data inside the req body
app.use(cookieParser());

// Set up MongoDB store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI, // Replace with your MongoDB connection string
  collection: 'sessions',
  expires: 30 * 60 // 30 minutes in seconds
});

// Use express-session middleware
app.use(
  session({
    secret: process.env.JWT_SECRET, // Change this to a secure secret key
    resave: false,
    saveUninitialized: false,
    store: store, // Use MongoDB store
    cookie: {
      maxAge: 30 * 60 * 1000, // 30 minutes in milliseconds
    },

  })
);

// Middleware to initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
initializePassport(passport);

app.use("/auth", authRoutes)
app.use("/account", userRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/employees", employeeRoutes);
app.use("/clients", clientRoutes)
app.use("/payrolls", payrollRoutes)


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Is 🏃‍♂️ On PORT ${PORT}`));
  })
  .catch((err) => console.log(err));
