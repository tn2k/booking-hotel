'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Amenity extends Model { }

    Amenity.init({
        amenity_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Amenity'
    });

    return Amenity;
};
