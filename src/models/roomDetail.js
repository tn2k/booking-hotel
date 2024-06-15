'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomDetail extends Model { }

    RoomDetail.init({
        detail_id: {
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
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'RoomDetail'
    });

    RoomDetail.associate = (models) => {
        RoomDetail.belongsTo(models.Room, { foreignKey: 'room_id' });
    };

    return RoomDetail;
};
