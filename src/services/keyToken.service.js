const keytokenModels = require("../models/keytoken.model.js")
const db = require('../models/index')

class KeyTokenService {
    static createKeyToken = async ({ userId, publickey }) => {
        try {
            const publicKeyString = publickey.toString();
            const token = await db.keytokenModels.create({
                user: userId,
                publicKey: publicKeyString,
            })
            return token ? publicKeyString : null
        } catch (error) {
            return error
        }
    }
}
module.exports = KeyTokenService