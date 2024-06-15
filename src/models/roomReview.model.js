'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class RoomReview extends Model { }

    RoomReview.init({
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        rating: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        created_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'RoomReview'
    });

    RoomReview.associate = (models) => {
        RoomReview.belongsTo(models.Room, { foreignKey: 'room_id' });
        RoomReview.belongsTo(models.Users, { foreignKey: 'user_id' });
    };

    return RoomReview;
};
