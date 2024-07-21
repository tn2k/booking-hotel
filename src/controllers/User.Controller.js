

const createError = require('http-errors')
const db = require('../models/index');
const { verifyotp, regisuser } = require('../services/user.service');
const { signAccessToken, singRefreshToken, verifyRefreshToken } = require("../auth/jwt_service");
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const { filter } = require('lodash');
const KeyTokenService = require('../services/keyToken.service');
const bcrypt = require('bcrypt');
const forge = require('node-forge');
const { createTokenPair } = require('../auth/createTokenPair')
const { findByEmail } = require("../services/findByEmail.service")
const { createKeyToken } = require('../services/keyToken.service')
const { getInforData } = require('../utils/getInforData')


const verifyOtp = async (req, res, next) => {
    try {
        const {
            email,
            otp,
        } = req.body;
        const {
            code,
            elements,
            message
        } = await verifyotp({
            email,
            otp
        });
        return res.status(code).json({
            code,
            message,
            elements
        })

    } catch (error) {
        next(error)
    }
}
const regisUser = async (req, res, next) => {
    try {
        const {
            email
        } = req.body;
        const {
            code,
            message,
            elements
        } = await regisuser({
            email
        })
        return res.status(code).json({
            code,
            message,
            elements
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest();
        const payload = await verifyRefreshToken(refreshToken);
        console.log('check data  payload   :', payload)
        const accessToken = await signAccessToken(payload.tenant_id);
        console.log('check data   accessToken  :', accessToken)
        const refToken = await singRefreshToken(payload.tenant_id);
        console.log('check data     refToken:', refToken)
        res.json({
            accessToken,
            refreshToken: refToken
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}


/* 
    1 - Check email in dbs 
    2 - match passord
    3 - Create AT vs RT and save 
    4 - generate tokens 
    5 - get data return login 
*/

const ApiLogin = async ({ email, password, refreshToken = null }) => {
    // 1.

    const foundUser = await findByEmail(email)
    if (!foundUser) throw new BadRequestError('User not registered')

    // 2.
    const match = bcrypt.compare(password, foundUser.password)
    if (!match) throw new AuthFailureError(" Authentication error")
    // 3.
    const keypair = forge.pki.rsa.generateKeyPair(2048);

    privatekey = forge.pki.privateKeyToPem(keypair.privateKey);
    publickey = forge.pki.publicKeyToPem(keypair.publicKey);

    const tokens = await createTokenPair({ userId: foundUser.tenant_id, email }, publickey, privatekey)

    await createKeyToken({
        userId: foundUser.tenant_id,
        publickey: publickey,
        privatekey: privatekey,
        refreshToken: tokens.refreshToken
    })

    const userInfo = getInforData({ fields: ['tenant_id', 'name', 'email'], object: foundUser });
    return {
        User: userInfo,
        tokens
    };
}

const logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore.tenant_id)
    console.log(({ delKey }))
    return delKey
}

module.exports = {
    verifyOtp,
    regisUser,
    refreshToken,
    ApiLogin,
    logout
};


