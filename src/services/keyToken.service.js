const db = require('../models/index')
const { filter, update } = require("lodash")
const { refreshToken } = require("../controllers/User.Controller.js")
const { fn, col, literal } = require('sequelize');

class KeyTokenService {
    static createKeyToken = async ({ userId, publickey, privatekey, refreshToken }) => {
        try {
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
        return await db.keytokenModels.findOne({ where: { user: userId } })
    }

    static removeKeyById = async (id) => {
        try {
            console.log(" check id :", id)
            const result = await db.keytokenModels.destroy({
                where: { user: id }
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static findByRefreshTokenUsed = async (refreshToken) => {
        console.log("check data >> refreshToken ", refreshToken)
        return await db.keytokenModels.findOne({
            where: literal(`JSON_CONTAINS(refreshTokensUsed, '"${refreshToken}"')`)
        })
    }

    static findByRefreshToken = async (refreshToken) => {
        return await db.keytokenModels.findOne({ where: { refreshToken: refreshToken } })
    }

    static deleteKeyById = async (userId) => {
        return await db.keytokenModels.destroy({ where: { user: userId } });
    }
}
module.exports = KeyTokenService 