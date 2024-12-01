const JWT = require("jsonwebtoken");
const createError = require('http-errors');
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { asyncHandler } = require("../helpers/asyncHandler");
const { findByUserId } = require("../services/keyToken.service");
const { handlerRefreshToken } = require("../services/access.service");
const { getCookieValue } = require("../utils/index")

const HEADER = {
    API_KEY: 'xapikey',
    CLIENT_DI: "xclientid",
    AUTHORIZATION: 'athorization',
    REFRESHTOKEN: 'xrtokenid'
}

const createTokenPair = async ({ payload, publicKey, privateKey }) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '15m',
        })
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days',
        })
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(err)
            } else {
                console.log(decode)
            }
        })
        return { accessToken, refreshToken }
    } catch (error) {
        console.error(error);
        throw (error)
    }
}


const authenticationV1 = asyncHandler(async (req, res, next) => {
    /*
        1 - Check userId missing ??? 
        2 - get accessToken 
        3 - verifyToken 
        4 - check user in dbs 
        5 - check keyStore with this UserId 
        6 - Ok all => return next()
    */
    // const accessToken = req.headers[HEADER.AUTHORIZATION]
    // const refreshToken = req.headers[HEADER.REFRESHTOKEN]
    // const userId = req.headers[HEADER.CLIENT_DI]

    const cookieString = req.headers.cookie
    const accessToken = getCookieValue(cookieString, 'accessToken');
    const refreshToken = getCookieValue(cookieString, 'refreshToken');
    const userId = getCookieValue(cookieString, 'userId');

    if (!userId) throw new AuthFailureError("Invalid Request ")

    const keyStore = await findByUserId(userId)
    if (!keyStore) throw new NotFoundError("Not found KeyStore")

    if (!accessToken) {
        if (!refreshToken) throw new AuthFailureError("Invalid Request")
        const decodeUser = await JWT.verify(refreshToken, keyStore.privatekey)
        if (userId !== decodeUser.userId) throw new AuthFailureError("Invalid Userid")
        const response = await handlerRefreshToken({ refreshToken, decodeUser, keyStore })
        req.keyStore = keyStore
        req.user = decodeUser
        res.cookie('accessToken', response.tokens.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refreshToken', response.tokens.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.cookie('userId', userId, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return next()
    }
    const decodeUser = await JWT.verify(accessToken, keyStore.publickey, { algorithms: ['RS256'] });
    if (userId !== decodeUser?.userId?.toString()) throw new AuthFailureError("Invalid Userid")
    console.log(decodeUser)
    req.keyStore = keyStore
    req.user = decodeUser
    return next()
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
    authenticationV1,
    verifyJWT,
    verifyAccessToken,
};