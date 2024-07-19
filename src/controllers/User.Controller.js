'user strict';
const createError = require('http-errors')
const { userValidate } = require("../config/validation")
const db = require('../models/index');
const { hashPassword, comparePassword } = require("../services/auth.service");
const { regisUser, verifyOtp, findByEmail, } = require('../services/user.service');
const { signAccessToken, singRefreshToken, verifyRefreshToken } = require("../auth/jwt_service");
const client = require('../config/redisClient');
const { createUser } = require("../services/user.service");
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const { filter } = require('lodash');
const KeyTokenService = require('../services/keyToken.service');



class UserController {
    verifyOtp = async (req, res, next) => {
        try {
            const {
                email,
                otp,
            } = req.body;
            const {
                code,
                elements,
                message
            } = await verifyOtp({
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
    regisUser = async (req, res, next) => {
        try {
            const {
                email
            } = req.body;
            const {
                code,
                message,
                elements
            } = await regisUser({
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

    refreshToken = async (req, res, next) => {
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

    ApiLogin = async (email, password, refreshToken = null) => {
        // 1.
        const foudUser = await findByEmail({ email })
        if (!foudUser) throw new BadRequestError('User not registered')
        // 2.
        const match = bcrypt.compare(password, foudUser.password)
        if (!match) throw new AuthFailureError(" Authentication error")
        // 3.
        const keypair = forge.pki.rsa.generateKeyPair(2048);

        privatekey = forge.pki.privateKeyToPem(keypair.privateKey);
        publickey = forge.pki.publicKeyToPem(keypair.publicKey);

        const tokens = await createTokenPair({ userId: newUser.tenant_id, email }, publickey, privatekey)
        console.log(' debug 1 ')
        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey, publickey, userId: newUser.tenant_id
        })

        return {
            user: getInforData({ fileds: ['user_id', 'name', 'email'], object: foudUser }),
            tokens
        };
    }

    logout = async (keyStore) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore.tenant_id)
        console.log(({ delKey }))
        return delKey
    }
}
module.exports = new UserController();


