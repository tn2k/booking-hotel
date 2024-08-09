'use strict';

const _ = require('lodash')

const getIntoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds)
}

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(e => [el, 1]))
}

const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(e => [el, 0]))
}

const removeUndefinedObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] == null) {
            delete obj[k]
        }
    })
    return obj
}

const undateNestedObjectParser = obj => {
    console.log('check obj  1', obj)
    const final = {}
    Object.keys(obj).forEach(k => {
        if (typeof obj[k] === 'Object' && !Array.isArray) {
            const response = updateNestObjectParser(obj[k])
            Object.keys(response.forEach(a => {
                final[`${k}.${a}`] = res[a]
            }))
        }
    })
    console.log('check obj  2', final)
    return final
}
module.exports = {
    getIntoData,
    getSelectData,
    unGetSelectData,
    removeUndefinedObject,
    undateNestedObjectParser
}