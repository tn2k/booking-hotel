'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('keytokenModels', {
            user: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
            },
            publicKey: {
                type: Sequelize.STRING(512),
                allowNull: false
            },
            refreshToken: {
                type: Sequelize.JSON,
                defaultValue: []
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
