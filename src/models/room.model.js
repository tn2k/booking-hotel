'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Room extends Model { }

    Room.init({
        room_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tenant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'tenant_id'
            }
        },
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        room_number: DataTypes.STRING,
        floor: DataTypes.INTEGER,
        rent: DataTypes.DECIMAL(10, 2),
        status: {
            type: DataTypes.ENUM('available', 'occupied'),
            defaultValue: 'available'
        }
    }, {
        sequelize,
        modelName: 'Room'
    });

    Room.associate = (models) => {
        Room.belongsTo(models.Users, { foreignKey: 'tenant_id' });
        Room.hasMany(models.RoomImage, { foreignKey: 'room_id' });
        Room.hasMany(models.RoomAmenity, { foreignKey: 'room_id' });
        Room.hasMany(models.Rental, { foreignKey: 'room_id' });
        Room.hasMany(models.RoomDetail, { foreignKey: 'room_id' });
        Room.hasMany(models.RoomReview, { foreignKey: 'room_id' });
    };

    return Room;
};
