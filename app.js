
const express = require("express");
const configViewEngine = require("./src/config/viewEngine.js");
const app = express();
const webRouter = require("./src/routes/routes.js");
const bodyParser = require("body-parser");
const connection = require("./src/config/connectDB.js");
const createError = require("http-errors")
const cors = require("cors");
const { Model } = require("sequelize");

configViewEngine(app);

app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'PUT']// Chỉ cho phép truy cập từ domain này
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", webRouter);

app.use((req, res, next) => {
  // const error = new Error("Not found")
  // error.status = 404;
  // next(error);
  next(createError.NotFound('This route does not exist.'))
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error'
    },
  });
});




module.exports = app;


