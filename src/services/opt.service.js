'use strict';

const _Otp = require('../models/otp.model');


const bcrypt = require('bcrypt');



var that = module.exports = {
    validOtp: async ({
        otp, // user enter
        hashOtp
    }) => {
        try {
            const isvalid = await bcrypt.compare(otp, hashOtp)
            return isvalid;
        } catch (error) {
        }
    },

    interOtp: async ({
        otp,
        email,
    }) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashOtp = await bcrypt.hash(otp, salt);
            const Otp = await _Otp.create({
                email,
                otp: hashOtp
            });
            return Otp ? 1 : 0
        } catch (error) {
            console.error(error);
        }
    }
}


