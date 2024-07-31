'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomImage extends Model { }

    RoomImage.init({
        image_id: {
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
        url: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'RoomImage'
    });

    RoomImage.associate = (models) => {
        RoomImage.belongsTo(models.Rooms, { foreignKey: 'room_id' });
    };

    return RoomImage;
};
