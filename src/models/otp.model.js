"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Otp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Otp.init(
        {
            email: DataTypes.STRING,
            otp: DataTypes.STRING,
            time: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        {
            sequelize,
            modelName: "Otp",
        }
    );
    return Otp;
};
