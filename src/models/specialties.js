'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class specialties extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    specialties.init({
        nameId: DataTypes.STRING,
        description: DataTypes.STRING,
        imageId: DataTypes.BLOB('long'),
    }, {
        sequelize,
        modelName: 'specialties',
    });
    return specialties;
};
