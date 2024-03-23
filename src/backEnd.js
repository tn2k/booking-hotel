require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const app = express();
const webRouter = require("./routes/web.js");
const bodyParser = require("body-parser");
const connection = require("./config/connectDB.js");

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", webRouter);

app.listen(8081);
