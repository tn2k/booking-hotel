'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    booking.init({
        orderDate: DataTypes.DATE,
        address: DataTypes.STRING,
        roomNumber: DataTypes.STRING,
        information: DataTypes.STRING,
        Adults: DataTypes.BOOLEAN,
        Children: DataTypes.BOOLEAN,
        note: DataTypes.STRING,
        price: DataTypes.INTEGER,
        request: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'booking',
    });
    return booking;
};
