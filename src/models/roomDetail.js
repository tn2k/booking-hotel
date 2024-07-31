'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomDetail extends Model { }

    RoomDetail.init({
        detail_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Room',
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
        RoomDetail.belongsTo(models.Rooms, { foreignKey: 'room_id' });
    };

    return RoomDetail;
};
