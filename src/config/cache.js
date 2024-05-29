const redisClient = require('./redisClient');

const cache = (req, res, next) => {
    const { key } = req.query;

    redisClient.get(key, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
};

module.exports = cache;
