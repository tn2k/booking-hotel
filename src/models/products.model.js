'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    product.init({
        nameProduct: DataTypes.STRING,
        nameTentant: DataTypes.STRING,
        image: DataTypes.BLOB('long'),
        addressProduct: DataTypes.STRING,
        price: DataTypes.INTEGER,
        properties: DataTypes.BOOLEAN,
        information: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        type: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'product',
    });
    return product;
};
