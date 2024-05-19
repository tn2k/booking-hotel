'user strict';

const {
    regisUser,
    verifyOtp,
    // refreshToken,
    // login,
    // logout
} = require('../services/user.service')


var that = module.exports = {
    verifyOtp: async (req, res, next) => {
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
    },
    regisUser: async (req, res, next) => {
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

    },
    refreshToken: async (req, res, next) => {
        try {
            console.log('refreshToken')
        } catch (error) {
            console.error(error)
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            console.log('login')
        } catch (error) {
            console.error(error)
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            console.log('logout')
        } catch (error) {
            console.error(error)
            next(error)
        }
    }

}


