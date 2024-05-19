'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tenant extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    tenant.init({
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        activityStatus: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'tenant',
    });
    return tenant;
};


// tenant.hasMany(sequelize.models.purchasedProduct);
// PurchasedProduct.belongsTo(sequelize.models.tenant);