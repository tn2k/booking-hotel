require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const app = express();
const webRouter = require("./routes/web.js");
const bodyParser = require("body-parser");
const connection = require("./config/connectDB.js");
const cors = require("cors");

configViewEngine(app);

app.use(cors()); 

app.use(cors({
    origin: 'http://localhost:3000', // Chỉ cho phép truy cập từ domain này
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", webRouter);

app.listen(8081);
