'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Payment extends Model { }

    Payment.init({
        payment_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        rental_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Transaction',
                key: 'rental_id'
            }
        },
        amount: DataTypes.DECIMAL(10, 2),
        payment_date: DataTypes.DATE,
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
            defaultValue: 'pending'
        },
    }, {
        sequelize,
        modelName: 'Payment'
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.Rental, { foreignKey: 'rental_id' });
    };

    return Payment;
};
