
const db = require('../models/index')

const findByEmail = async (email) => {
    try {
        const user = await db.Users.findOne({
            where: { email },
            attributes: ['email', "tenant_id", "password", "name"]
        });
        return user;
    } catch (error) {
        console.error('Lỗi:', error);
        throw (error);
    }
}

module.exports = { findByEmail };
