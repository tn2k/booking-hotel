const db = require('../models/index')
const { filter, update } = require("lodash")
const { refreshToken } = require("../controllers/User.Controller.js")
const { DataTypes } = require("sequelize")
class KeyTokenService {
    static createKeyToken = async ({ userId, publickey, privatekey, refreshToken }) => {
        try {
            // const publicKeyString = publickey.toString();
            // const token = await db.keytokenModels.create({
            //     user: userId,
            //     publicKey: publicKeyString,
            //     refreshTokensUsed: [],
            //     refreshToken
            // })
            // return token ? publicKeyString : null

            const update = {
                user: userId,
                privatekey,
                publickey,
                refreshTokensUsed: [],
                refreshToken
            };
            console.log(' check data ', update)
            const [token, created] = await db.keytokenModels.upsert(update);
            return token ? token.publickey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        return await db.keytokenModels.findOne({ user: DataTypes.ObjectId(userId) }).lean()
    }
}
module.exports = KeyTokenService 