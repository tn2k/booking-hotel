'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Amenity extends Model { }

    Amenity.init({
        amenity_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Amenity'
    });

    return Amenity;
};
