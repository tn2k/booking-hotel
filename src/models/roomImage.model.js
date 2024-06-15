'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomImage extends Model { }

    RoomImage.init({
        image_id: {
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
        url: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'RoomImage'
    });

    RoomImage.associate = (models) => {
        RoomImage.belongsTo(models.Room, { foreignKey: 'room_id' });
    };

    return RoomImage;
};
