'use strict';

const _ = require('lodash')

const getIntoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds)
}

const getSelectData = (select = []) => {
    return select;
}

const unGetSelectData = (select = []) => {
    return select;
}

const removeUndefinedObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] == null) {
            delete obj[k]
        }
    })
    return obj
}

const transformAmenities = (input) => {
    try {
        const amenitiesObject = {};
        Object.values(input).forEach(value => {
            amenitiesObject[value] = true;
        });
        return amenitiesObject
    } catch (error) {
        console.log(error)
    }
}

const updateNestedObjectParser = (obj) => {
    console.log('check obj  1', obj)
    const final = {};
    Object.keys(obj).forEach(k => {
        if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
            const response = updateNestedObjectParser(obj[k]);
            Object.keys(response).forEach(a => {
                final[`${k}.${a}`] = response[a];
            });
        } else {
            final[k] = obj[k];
        }
    });
    console.log('check obj  2', final)
    return final;
};

const getCookieValue = (cookieString, cookieName) => {
    const regex = new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`);
    const match = cookieString.match(regex);
    return match ? decodeURIComponent(match[1]) : null;
};

module.exports = {
    getIntoData,
    getSelectData,
    unGetSelectData,
    removeUndefinedObject,
    updateNestedObjectParser,
    transformAmenities,
    getCookieValue
}

// const updateNestedObjectParser = obj => {
//     console.log('check obj  1', obj)
//     const final = {}
//     Object.keys(obj).forEach(k => {
//         if (typeof obj[k] === 'Object' && !Array.isArray(obj[k])) {
//             const response = updateNestedObjectParser(obj[k])
//             Object.keys(response.forEach(a => {
//                 final[`${k}.${a}`] = res[a]
//             }))
//         }
//     })
//     console.log('check obj  2', final)
//     return final
// }