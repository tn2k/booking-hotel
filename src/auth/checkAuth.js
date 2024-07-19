'use strick'

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'athorization'
}

const { findById } = require('../services/apiKey.service')

const apiKey = async (req, res, next) => {
    try {

        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            });
        }
        const objKey = await findById(key);
        console.log('check  objKey ', objKey)
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            });
        }
        req.objKey = objKey;
        return next();
    } catch (error) {

    }
}

const permission = (permission) => {
    try {
        console.log('check data permission', permission)
        return (req, res, next) => {
            console.log('check data req.objKey.permission', req.objKey.permission)
            if (!req.objKey.permission) {
                return res.status(403).json({
                    message: 'permisson denied 1'
                })
            }
            console.log('permission :', req.objKey.permissions)
            const validPermission = req.objKey.permission.includes(permission)
            if (!validPermission) {
                return res.status(403).json({
                    message: " permission denied 2"
                })
            }
            return next()
        }
    } catch (error) {

    }

}



module.exports = {
    apiKey,
    permission,
}