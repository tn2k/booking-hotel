'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('keytokenModels', {
            user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            privatekey: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            publickey: {
                type: Sequelize.STRING(512),
                allowNull: false
            },
            refreshTokensUsed: {
                type: Sequelize.JSON,
                defaultValue: []
            },
            refreshToken: {
                type: Sequelize.STRING(512),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('keytokenModels');
    }
};
