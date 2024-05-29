const JWT = require("jsonwebtoken");
const createError = require('http-errors')

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        };
        const secret = process.env.ACCESS_TOKEN_SECRET; // Nên sử dụng một biến môi trường cho key bí mật của bạn
        const options = {
            expiresIn: '20s' // 10m 10s
        };
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

const verifyAccessToken = (req, res, next) => {
    if (!req.header('authorization')) {
        return next(createError.Unauthorized)
    }
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized);
        }
        req.payload = payload
        next();
    })
}

const singRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        };
        const secret = process.env.REFRESH_TOKEN_SECRET; // Nên sử dụng một biến môi trường cho key bí mật của bạn
        const options = {
            expiresIn: '1y' // 10m 10s
        };
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}


module.exports = {
    signAccessToken,
    verifyAccessToken, singRefreshToken
};
