const app = require('./app');
require("dotenv").config();

const { PORT } = process.env

const server = app.listen(PORT, () => {
    console.log(`sever running at ${PORT}`)
});

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit server Express`))
})