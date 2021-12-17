const express = require("express");
const pino = require("pino-http")();
const cors = require("cors");
const mongoose = require("mongoose");
// load environment variable
require("dotenv").config();

const app = express();

// create nodejs core http server and handle request/response by express app instance

const { PORT, MONGODB_URI, ALLOWED_ORIGIN } = require("./src/config");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./src/errors");

// routes

// products route
const productRoutes = require("./src/routes/product.route");
const categoryRoutes = require("./src/routes/category.route");

// middlewares

// replacement for body-parser module to parse form and json data
app.use(express.json());

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
  })
);

// log in development environment
app.use(pino);

// server health check
app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// page not found error handling  middleware

app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND_ERR,
  };
  next(error);
});

// global error handling middleware
app.use((err, _, res, __) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || SERVER_ERR;

  res.status(status).json({
    type: "error",
    message,
  });
});

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/solulab_shop");
    console.log("connected to mongodb database");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);

    // stop running process
    process.exit(1);
  }
}

main();
