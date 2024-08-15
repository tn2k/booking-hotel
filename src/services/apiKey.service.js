'use strict'
const db = require('../models/index.js');
const { apiKeyModels } = require('../models/apikey.model.js');
const forge = require('node-forge');

const findById = async (key) => {
    try {
        // console.log(`Searching for API key: ${key}`);
        const newKey = await db.apiKeyModels.create({
            key: forge.util.bytesToHex(forge.random.getBytesSync(32)),
            status: true,
            permissions: '0000'
        });
        console.log(`Searching for newKey: ${newKey}`);
        const objKey = await db.apiKeyModels.findOne({
            where: {
                key,
                status: true
            },
            raw: true
        })
        console.log(`Found API key: ${JSON.stringify(objKey)}`);
        return objKey
    } catch (error) {
        console.error('Error finding API key:', error);
        return null;
    }
};

module.exports = {
    findById
}

