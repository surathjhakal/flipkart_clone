const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// routes
const authRoutes = require("./routes/mainRouteAuth");
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} port`);
});
