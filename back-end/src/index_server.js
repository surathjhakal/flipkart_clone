const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");

// routes
const categoryRoutes = require("./routes/categoryRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
// environment variable or you can say constants
env.config();

// mongodb connection
// Pass:8toBDKJ2cxF0aYor
// mongodb+srv://surath:<password>@cluster0.1pahi.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.1pahi.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(express.json());

app.use("/api", categoryRoutes);
app.use("/api", userAuthRoutes);
app.use("/api", adminAuthRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} port`);
});
