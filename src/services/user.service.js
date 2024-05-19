'user strict'

// import { hash } from 'bcrypt';
// import db from '../models/index';
// import { interOtp } from './opt.service';

const OtpGenerator = require('otp-generator')
const _Otp = require('../models/otp.model')
const {
    insertOtp,
    validOtp
} = require('./opt.service')
const { Op } = require('sequelize');

var that = module.exports = {
    verifyOtp: async ({
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
    },

    regisUser: async ({ email }) => {
        const user = await db.User.findOne({
            where: { email: email }
        });
        if (user) {
            return {
                code: 400,
                message: 'This email is already in user!'
            }
        }
        await deleteExpiredOtps();

        const OTP = OtpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        })

        console.log('OTP is : ', OTP)

        return {
            code: 200,
            element: await interOtp({
                email,
                otp: OTP
            })
        }
    }
}

async function deleteExpiredOtps() {
    const expirationTime = 60 * 1000; // 60 giây
    const expiredDate = new Date(new Date() - expirationTime);

    try {
        const result = await _Otp.destroy({
            where: {
                time: {
                    [Op.lt]: expiredDate
                }
            }
        });
        console.log(`Deleted ${result} expired OTPs.`);
    } catch (error) {
        console.error('Failed to delete expired OTPs:', error);
    }
}