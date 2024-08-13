const JWT = require("jsonwebtoken");
const createError = require('http-errors');
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { asyncHandler } = require("../helpers/asyncHandler");
const { findByUserId } = require("../services/keyToken.service");
const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_DI: "x-client-id",
    AUTHORIZATION: 'athorization',
    REFRESHTOKEN: 'x-rtoken-id'
}

const createTokenPair = async ({ payload, publicKey, privateKey }) => {
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
        throw (error)
    }
}

const authentication = asyncHandler(async (req, res, next) => {
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
    if (!userId) throw new AuthFailureError("Invalid Request ")

    // 2 
    const keyStore = await findByUserId(userId)
    if (!keyStore) throw new NotFoundError("Not found KeyStore")

    // 3 
    if (req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN]
            const decodeUser = JWT.verify(refreshToken, keyStore.privatekey)
            if (userId !== decodeUser.userId) throw new AuthFailureError("Invalid Userid")
            req.keyStore = keyStore
            req.user = decodeUser
            req.refreshToken = refreshToken
            return next()
        } catch (error) {
            throw error
        }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError("Invalid Request ")

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publickey)
        if (userId !== decodeUser.userId.toString()) throw new AuthFailureError("Invalid Userid")
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret);
}

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


module.exports = {
    createTokenPair,
    authentication,
    verifyJWT,
    verifyAccessToken,
};

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
