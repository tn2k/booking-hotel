const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // default: 3306
    user: process.env.DB_USER, // default: empty
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})

connection.connect((err) => {
    if (err) {
        console.error(`Mysql ::: error ::: ${JSON.stringify(err)}`);
        return;
    }
    console.log(`Mysql ::: connected ::: ${connection.config.database}`);
});

// end connection database
connection.on('end', () => {
    console.log(`Mysql ::: disconnected ::: ${connection.config.database}`);
});

// error connection database
connection.on('error', (err) => {
    console.error(`Mysql ::: error ::: ${JSON.stringify(err)}`);
});

// listen to SIGINT to end connection app
process.on('SIGINT', async () => {
    connection.end((err) => {
        if (err) {
            console.error(`Mysql ::: error ending connection ::: ${JSON.stringify(err)}`);
        } else {
            console.log('Mysql ::: connection closed gracefully');
        }
        process.exit(0);
    });
});




module.exports = connection; 