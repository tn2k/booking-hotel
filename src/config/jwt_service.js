const JWT = require("jsonwebtoken");
const createError = require('http-errors');
const { resolve, reject } = require("promise");
const { refreshToken } = require("../controllers/User.Controller");
const client = require('../config/redisClient')

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
            if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message));
        }
        req.payload = payload
        next();
    })
}

const verifyRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return reject(err)
            }
            client.get(payload.userId, (err, reply) => {
                if (err) {
                    return reject(createError.InternalServerError())
                }
                if (refreshToken === reply) {
                    return resolve(payload);
                }
                return reject(createError.Unauthorized())
            })
            resolve(payload)
        })
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
                client.set(useId.toString(), token, 'EX', 360 * 24 * 60 * 60, (err, reply) => {
                    if (err) {
                        return reject(createError.InternalServerError())
                    }
                    resolve(token);
                })
            }
        });
    });
}


module.exports = {
    signAccessToken,
    verifyAccessToken,
    singRefreshToken,
    verifyRefreshToken
};
