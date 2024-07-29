
const express = require("express");
const configViewEngine = require("./src/config/viewEngine.js");
const app = express();
const webRouter = require("./src/routes/index.js");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require('compression')
const cors = require("cors");
const { Model } = require("sequelize");
configViewEngine(app);

//init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'PUT']// Chỉ cho phép truy cập từ domain này
}));

// init db
const { connectdb } = require('./src/config/connectDB.js');
connectdb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init routes
app.use("/", webRouter);

// Not foud route
app.use((req, res, next) => {
  const error = new error("Not Found")
  error.status = 404,
    next(error)
});

// handling error
app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || 'Internal Server Error',
  });
});

module.exports = app;


