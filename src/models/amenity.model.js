'use strict';

// models/Amenities.js
module.exports = (sequelize, DataTypes) => {
    const Amenities = sequelize.define('Amenities', {
        amenity_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        wifi: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        washingMachine: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        shower: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        terrace: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        armoredDoor: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        livingRoom: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        furnished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lift: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dishWasher: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        alarm: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        oven: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        freezer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        cooktop: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        fridge: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        airConditioner: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tv: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        centralizedHeating: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        equippedKitchen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        bathtub: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        guestAllowed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        smartTv: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        balcony: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        swimmingPool: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        hairDryer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {});

    Amenities.associate = function (models) {
        Amenities.belongsTo(models.Products, {
            foreignKey: 'amenity_id',
            as: 'product',
            onDelete: 'CASCADE'
        });
    };
    return Amenities;
};


