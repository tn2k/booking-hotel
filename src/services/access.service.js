'use strict';

const bcrypt = require('bcrypt');
const forge = require('node-forge');
const { BadRequestError, ForbiddenError, AuthFailureError } = require("../core/error.response")
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/jwt_service');
const { findByEmail } = require('./findByEmail.service');
const { createKeyToken } = require('./keyToken.service')
const { getInforData } = require('../utils/getInforData')


const apiLogin = async ({ email, password, refreshToken = null }) => {

    /* 
    1 - Check email in dbs 
    2 - match passord
    3 - Create AT vs RT and save 
    4 - generate tokens 
    5 - get data return login 
    */

    // 1.
    const foundUser = await findByEmail(email)
    if (!foundUser) throw new BadRequestError('User not registered')

    // 2.
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) throw new AuthFailureError(" Authentication error")
    // 3.
    const keypair = forge.pki.rsa.generateKeyPair(2048);
    const privatekey = forge.pki.privateKeyToPem(keypair.privateKey);
    const publickey = forge.pki.publicKeyToPem(keypair.publicKey);

    const tokens = await createTokenPair({ payload: { userId: foundUser.tenant_id, email }, publicKey: publickey, privateKey: privatekey })

    await createKeyToken({
        userId: foundUser.tenant_id,
        publickey: publickey,
        privatekey: privatekey,
        refreshToken: tokens.refreshToken
    })

    const userInfo = getInforData({ fields: ['tenant_id', 'first_name', 'email'], object: foundUser });
    return {
        User: userInfo,
        tokens
    };
}

const logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore.user)
    return delKey
}

// check this token used
const handlerRefreshToken = async ({ refreshToken, user, keyStore }) => {
    const { userId, email } = user;

    if (keyStore, refreshTokensUsed.includes(refreshToken)) {
        await KeyTokenService.deleteKeyById(userId)
        throw new ForbiddenError("Something wrong happend !! pls relogin")
    }

    if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('user not registeted')

    // check Userid
    const foundUser = await findByEmail(email)
    if (!foundUser) throw new AuthFailureError("user not registeted 2")

    // create due token 
    const tokens = await createTokenPair({ payload: { userId, email }, publicKey: keyStore.publickey, privateKey: keyStore.privatekey })

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
    apiLogin,
    logout,
    handlerRefreshToken,
}