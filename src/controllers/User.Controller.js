'user strict';
const createError = require('http-errors')
const { userValidate } = require("../config/validation")
const db = require('../models/index');
const { hashPassword, comparePassword } = require("../services/auth.service");
const {
    regisUser,
    verifyOtp,
} = require('../services/user.service');
const { signAccessToken, singRefreshToken, verifyRefreshToken } = require("../auth/jwt_service");
const client = require('../config/redisClient');


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
            const { refreshToken } = req.body;
            if (!refreshToken) throw createError.BadRequest();
            const payload = await verifyRefreshToken(refreshToken);
            console.log('check data  payload   :', payload)
            const accessToken = await signAccessToken(payload.tenant_id);
            console.log('check data   accessToken  :', accessToken)
            const refToken = await singRefreshToken(payload.tenant_id);
            console.log('check data     refToken:', refToken)
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
            const user = await db.Users.findOne({
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
            const accessToken = await signAccessToken(user.tenant_id);
            const refreshToken = await singRefreshToken(user.tenant_id);
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
            const { refreshToken } = req.body
            if (!refreshToken) {
                throw createError.BadRequest();
            }
            const { tenant_id } = await verifyRefreshToken(refreshToken)
            client.del(tenant_id.toString(), (err, reply) => {
                if (err) {
                    throw createError.InternalServerError();
                }
                res.json({
                    message: "logout"
                })
            })
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}
module.exports = new UserController();


