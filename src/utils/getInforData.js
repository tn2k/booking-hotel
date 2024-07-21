'use strict';

const getInforData = ({ fields, object }) => {
    if (!Array.isArray(fields) || typeof object !== 'object' || object === null) {
        throw new Error("Invalid input: fields must be an array and object must be an object");
    }

    const data = {};
    fields.forEach(field => {
        if (object[field] !== undefined) {
            data[field] = object[field];
        }
    });
    return data;
};

module.exports = { getInforData };