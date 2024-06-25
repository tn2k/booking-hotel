

const db = require('../models/index')
const hash = require('bcrypt');
const OtpGenerator = require('otp-generator')
const { Op } = require('sequelize');
const _Otp = require('../models/otp.model')
const { hashPassword } = require('../services/auth.service');
const forge = require('node-forge');
const { createTokenPair } = require('../auth/jwt_service')
const { createKeyToken } = require('./keyToken.service')

const {
    insertOtp,
    validOtp
} = require('./opt.service');
const { format } = require('morgan');


const verifyOtp = async ({
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

const regisUser = async ({ email }) => {
    const user = await db.Users.findOne({
        where: { email: email }
    }).lean()
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

const createUser = async (userData) => {
    try {
        const { name, password, email, phone, role } = userData;
        const user = await db.Users.findOne({
            where: { email: email },
        })
        if (user) {
            return {
                EC: 103,
                EM: 'this email is already exists!'
            }
        }
        else if (!user) {
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

                privatekey = forge.pki.privateKeyToPem(keypair.privateKey);
                publickey = forge.pki.publicKeyToPem(keypair.publicKey);

                const publickeyString = await createKeyToken({
                    userId: newUser.tenant_id,
                    publickey,
                })
                if (!publickeyString) {
                    return {
                        code: 'xxxx',
                        message: 'publickeyString error'
                    }
                }

                const tokens = await createTokenPair({ userId: newUser.tenant_id, email }, publickeyString, privatekey)

                console.log("check data token :", tokens)

                return {
                    EC: 0,
                    EM: 'Create user success!',
                    data: {
                        user: newUser,
                        tokens
                    },
                };

            }
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return {
            EC: 301,
            EM: 'Create user failed!',
        };
    }
}

const getDataUser = async (userId) => {
    const user = await db.Users.findOne({
        where: { id: userId },
        raw: true,
    });
    if (!user) {
        return {
            EC: 400,
            EM: 'this user is not exists!'
        }
    }
    return {
        EC: 0,
        EM: 'Get data User edit success!',
        data: user
    }
}

const updateDataUser = async (dataEditUser) => {
    try {
        const user = await db.Users.findByPk(dataEditUser.id);
        if (!user) {
            return {
                EC: 404,
                EM: 'User not found',
            };
        }
        await db.Users.update(dataEditUser, {
            where: { id: dataEditUser.id }
        });
        return {
            EC: 0,
            EM: 'Update user success',
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
                EC: 404,
                EM: 'User not found',
            };
        }
        await db.Users.destroy({
            where: { id: userId }
        });
        return {
            EC: 0,
            EM: 'Delete user success',
        };
    } catch (error) {
        console.error('Error delete user:', error);
        next(error)
    }
}

// async function deleteExpiredOtps() {
//     const expirationTime = 60 * 1000; // 60 giây
//     const expiredDate = new Date(new Date() - expirationTime);

//     try {
//         const result = await _Otp.destroy({
//             where: {
//                 time: {
//                     [Op.lt]: expiredDate
//                 }
//             }
//         });
//         console.log(`Deleted ${result} expired OTPs.`);
//     } catch (error) {
//         console.error('Failed to delete expired OTPs:', error);
//     }
// }

module.exports = {
    verifyOtp: verifyOtp,
    regisUser: regisUser,
    getAllUsers: getAllUsers,
    createUser: createUser,
    getDataUser: getDataUser,
    updateDataUser: updateDataUser,
    deleteDataUser: deleteDataUser
}