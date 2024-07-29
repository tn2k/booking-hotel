

const db = require('../models/index')
const hash = require('bcrypt');
const OtpGenerator = require('otp-generator')
const { Op } = require('sequelize');
const _Otp = require('../models/otp.model')
const { hashPassword } = require('../services/auth.service');
const forge = require('node-forge');
const { createTokenPair } = require('../auth/jwt_service')
const { createKeyToken } = require('./keyToken.service')
const { BadRequestError } = require("../core/error.response")
const { SuccessResponse } = require("../core/success.response")
const keytokenModel = require('../models/keytoken.model');

const {
    insertOtp,
    validOtp
} = require('./opt.service');
const { format } = require('morgan');



const verifyotp = async ({
    email,
    otp
}) => {
    try {
        const otpHolder = await _Otp.find({
            email
        })
        if (!otpHolder.length) {
            return {
                code: 404,
                message: 'expired OTP'
            }
        }
        const lastOtp = otpHolder[otpHolder.length - 1]
        const validOtp = await validOtp({
            otp,
            hashOtp: lastOtp.otp
        })
        if (validOtp) {
            return {
                code: 401,
                message: 'Invalid Otp'
            }
        }
        if (validOtp && email === lastOtp.email) {
            return {
                code: 201,
                message: 'OTP verified successfully'
            }
        }
    } catch (error) {
        console.error(error)
    }
}

const regisuser = async ({ email }) => {
    const user = await db.Users.findOne({
        where: { email: email }
    })
    if (user) {
        return {
            code: 400,
            message: 'This email is already in user!'
        }
    }
    // await deleteExpiredOtps();
    const OTP = OtpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    })
    console.log('OTP is : ', OTP)
    return {
        code: 200,
        element: await verifyOtp({
            email,
            otp: OTP
        })
    }
}


const getAllUsers = async () => {
    try {
        const user = await db.Users.findAll({
            raw: true,
        })
        return {
            code: 400,
            message: 'get all user fail!',
            data: user
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const createUser = async ({ name, password, email, phone, role }) => {
    try {
        const user = await db.Users.findOne({
            where: { email: email },
        })
        if (user) {
            throw new BadRequestError("Error :this email is already exists!")
        }
        else {
            const hashedPassword = await hashPassword(password);
            const newUser = await db.Users.create({
                name,
                password: hashedPassword,
                email,
                phone,
                role,
                status: 'inactive',
                verify: true,
            });
            if (newUser) {
                const keypair = forge.pki.rsa.generateKeyPair(2048);

                const privatekey = forge.pki.privateKeyToPem(keypair.privateKey);
                const publickey = forge.pki.publicKeyToPem(keypair.publicKey);

                const tokens = await createTokenPair({ userId: newUser.tenant_id, email }, publickey, privatekey)

                await createKeyToken({
                    userId: newUser.tenant_id,
                    publickey: publickey,
                    privatekey: privatekey,
                    refreshToken: tokens.refreshToken
                })
                return new SuccessResponse({
                    metadata: {
                        User: newUser,
                        tokens,
                    },
                });
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error('Registration failed');
    }
}

const getDataUser = async (userId) => {
    const user = await db.Users.findOne({
        where: { id: userId },
        raw: true,
    });
    if (!user) {
        return {
            StatusCode: 400,
            message: 'this user is not exists!'
        }
    }
    return {
        StatusCode: 0,
        message: 'Get data User edit success!',
        metadata: user
    }
}

const updateDataUser = async (dataEditUser) => {
    try {
        const user = await db.Users.findByPk(dataEditUser.id);
        if (!user) {
            return {
                StatusCode: 404,
                message: 'User not found',
            };
        }
        await db.Users.update(dataEditUser, {
            where: { id: dataEditUser.id }
        });
        return {
            StatusCode: 0,
            message: 'Update user success',
        };
    } catch (error) {
        console.error('Error updating user:', error);
        next(error)
    }
}

const deleteDataUser = async (userId) => {
    try {
        const user = await db.Users.findByPk(userId);
        if (!user) {
            return {
                StatusCode: 404,
                message: 'User not found',
            };
        }
        await db.Users.destroy({
            where: { id: userId }
        });
        return {
            StatusCode: 0,
            message: 'Delete user success',
        };
    } catch (error) {
        console.error('Error delete user:', error);
        next(error)
    }
}



module.exports = {
    verifyotp,
    regisuser,
    getAllUsers,
    createUser,
    getDataUser,
    updateDataUser,
    deleteDataUser,
}