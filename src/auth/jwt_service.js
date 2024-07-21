const JWT = require("jsonwebtoken");
const createError = require('http-errors');
const { resolve, reject } = require("promise");
const { refreshToken } = require("../controllers/User.Controller");
const client = require('../config/redisClient');
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { asyncHandler } = require("../helpers/asyncHandler");
const { findByUserId } = require("../services/keyToken.service");
const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_DI: "x-client-id",
    AUTHORIZATION: 'athorization'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days',
        })
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days',
        })
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error('error verify :', err)
            } else {
                console.log(` decode verify ::`, decode)
            }
        })
        return { accessToken, refreshToken }
    } catch (error) {
        console.error(error);
        next(error)
    }
}

const authorization = asyncHandler(async (req, res, next) => {
    /*
        1 - Check userId missing ??? 
        2 - get accessToken 
        3 - verifyToken 
        4 - check user in dbs 
        5 - check keyStore with this UserId 
        6 - Ok all => return next()
    */
    // 1 
    const userId = req.headers[HEADER.CLIENT_DI]
    if (!userId) throw new AuthFailureError("Invalid Request")

    // 2 
    const keyStore = await findByUserId(userId)
    if (!keyStore) throw new NotFoundError("Not found KeyStore")

    // 3 
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError("Invalid Request")

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if (userId !== decodeUser.tenant_id) throw new AuthFailureError("Invalid Userid")
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

// const signAccessToken = async (userId, publicKey, privateKey) => {
//     return new Promise((resolve, reject) => {
//         const userId = {
//             tenant_id
//         };
//         console.log('check tenant_id :', userId)
//         const secret = publicKey // Nên sử dụng một biến môi trường cho key bí mật của bạn
//         const options = {
//             expiresIn: '60s'
//         };
//         JWT.sign(payload, secret, options, (err, token) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(token);
//         });
//     });
// };



// const singRefreshToken = async (tenant_id) => {
//     return new Promise((resolve, reject) => {
//         const payload = {
//             tenant_id
//         };
//         const secret = process.env.REFRESH_TOKEN_SECRET; // Nên sử dụng một biến môi trường cho key bí mật của bạn
//         const options = {
//             expiresIn: '1y' // 10m 10s
//         };
//         JWT.sign(payload, secret, options, (err, token) => {
//             if (err) reject(err);
//             client.set(tenant_id.toString(), token, { EX: 60 * 60 * 24 * 365 }, (err, reply) => {
//                 if (err) {
//                     return reject(createError.InternalServerError())
//                 }
//             })
//             resolve(token);
//         });
//     });
// }


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

// const verifyRefreshToken = async (refreshToken) => {
//     return new Promise((resolve, reject) => {
//         JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
//             if (err) {
//                 return reject(err)
//             }
//             client.get(payload.tenant_id, (err, reply) => {
//                 if (err) {
//                     return reject(createError.InternalServerError())
//                 }
//                 if (refreshToken === reply) {
//                     return resolve(payload);
//                 }
//                 return reject(createError.Unauthorized())
//             })
//             resolve(payload)
//         })
//     })
// }

module.exports = {
    createTokenPair,
    // signAccessToken,
    verifyAccessToken,
    // singRefreshToken,
    // verifyRefreshToken,
    authorization
};
