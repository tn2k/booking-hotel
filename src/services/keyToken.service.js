const db = require('../models/index')
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
            const [token, created] = await db.keytokenModels.create(update);
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
            const result = await db.keytokenModels.destroy({
                where: { user: id }
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static findByRefreshTokenUsed = async (refreshToken) => {
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