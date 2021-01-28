const express = require("express");
//included dotenv because it helps to import the data in the env file as it's very important data
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const cartRoutes = require("./routes/cartRoutes");

// environment variable or you can say constants
env.config();

//connecting mongoose with express
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.1pahi.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

// In routes i have used router function which acts as a middleware which handle routes
// but in the middle if we want, but to end the routing we use app.use function

//It is a way to register middleware to end routes
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", userAuthRoutes);
app.use("/api", adminAuthRoutes);
app.use("/api", cartRoutes);

//It is listening a request on some port
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} port`);
});
