const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" })); // Increase the limit for JSON data
app.use(express.urlencoded({ limit: "5mb", extended: true })); // Increase the limit for URL-encoded data

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://root:1234@cluster0.wogzqsj.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use the book routes from book.js
app.use("/book", bookRoutes);

// Use the user routes
app.use("/user", userRoutes);

// Use the cart routes
app.use("/cart", cartRoutes);

//use the order routes
app.use("/order", orderRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});