'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Transaction extends Model { }

    Transaction.init({
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Rooms',
                key: 'room_id'
            }
        },
        tenant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'tenant_id'
            }
        },
        note: DataTypes.TEXT,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        status: {
            type: DataTypes.ENUM('active', 'terminated'),
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Rental'
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.Room, { foreignKey: 'room_id' });
        Transaction.belongsTo(models.Users, { foreignKey: 'tenant_id' });
        Transaction.hasMany(models.Payment, { foreignKey: 'rental_id' });
    };

    return Transaction;
};
