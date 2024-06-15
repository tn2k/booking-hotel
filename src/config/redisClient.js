const redis = require('redis')

let client;
(async () => {
    client = redis.createClient({
        port: 6379,
        host: "localhost"
    })
    client.on('connect', () => {
        console.log('Connected to Redis');
    });

    client.on('error', (err) => {
        console.error('Redis error:', err);
    });

    client.on('ready', () => {
        console.log('Redis is ready');
    });

    client.on('end', () => {
        console.log('Client disconnected from redis');
    });

    process.on('SIGINT', () => {
        client.quit()
    })
    await client.connect();
})();


module.exports = client;


