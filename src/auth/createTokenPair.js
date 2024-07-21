const JWT = require("jsonwebtoken");

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

module.exports = { createTokenPair }