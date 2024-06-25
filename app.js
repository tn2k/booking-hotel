
const express = require("express");
const configViewEngine = require("./src/config/viewEngine.js");
const app = express();
const webRouter = require("./src/routes/access/index.js");
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
  next(createError.NotFound('This route does not exist.'))
});

// handling error
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error'
    },
  });
});

module.exports = app;


