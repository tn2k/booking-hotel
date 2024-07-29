'use strict';

const db = require('../models/index')
const { BadRequestError, ForbiddenError, AuthFailureError } = require("../core/error.response")
const KeyTokenService = require('./keyToken.service');
const { verifyJWT, createTokenPair } = require('../auth/jwt_service');
const { findByEmail } = require('./findByEmail.service');


// check this token used
const handlerRefreshToken = async ({ refreshToken, user, keyStore }) => {
    const { userId, email } = user;

    if (keyStore, refreshTokensUsed.includes(refreshToken)) {
        await KeyTokenService.deleteKeyById(userId)
        throw new ForbiddenError("Something wrong happend !! pls relogin")
    }

    if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Shop not registeted')

    // check Userid
    const foundUser = await findByEmail(email)
    if (!foundUser) throw new AuthFailureError("Shop not registeted 2")

    // create due token 
    const tokens = await createTokenPair({ payload: { userId, email }, publicKey: holderToken.publickey, privateKey: holderToken.privatekey })

    // update token
    await keyStore.update({
        refreshToken: tokens.refreshToken,
        refreshTokensUsed: [...holderToken.refreshTokensUsed, refreshToken]
    });

    return {
        user: { userId, email },
        tokens
    }
}






module.exports = {
    handlerRefreshToken
}