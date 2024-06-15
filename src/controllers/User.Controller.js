'user strict';
const createError = require('http-errors')
const { userValidate } = require("../config/validation")
const db = require('../models/index');
const { hashPassword, comparePassword } = require("../services/auth.service");
const {
    regisUser,
    verifyOtp,
} = require('../services/user.service');
const { signAccessToken, singRefreshToken, verifyRefreshToken } = require("../config/jwt_service")


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
            console.log('req.body')
            const { refreshToken } = req.body;
            if (!refreshToken) throw createError.BadRequest();
            const payload = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userId);
            const refToken = await signAccessToken(userId);
            console.log(`payload :: ${payload}`)
            res.json({
                accessToken,
                refreshToken: refToken
            })
        } catch (error) {
            console.error(error)
            next(error)
        }
    }

    ApiLogin = async (req, res, next) => {
        try {
            const { error } = userValidate(req.body);
            if (error) {
                throw createError(error.details[0].message)
            }
            const { email, password } = req.body
            const user = await db.User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw createError.NotFound('User not registered')
            }
            const isValid = await comparePassword(password, user.password)
            if (!isValid) {
                throw createError.Unauthorized();
            }
            const accessToken = await signAccessToken(user.id)
            const refreshToken = await singRefreshToken(user.id)
            res.json({
                accessToken,
                refreshToken
            })
        } catch (error) {
            console.error(error)
            next(error)
        }
    }

    logOut = async (req, res, next) => {
        try {
            console.log('logout')
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}
module.exports = new UserController();


