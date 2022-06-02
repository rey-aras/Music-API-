const tableOptions = 'musics';

module.exports = {
    up:(queryInterface, DataTypes) => queryInterface.createTable(tableOptions, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUID4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        performer: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        genre: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }),
    down: (queryInterface, DataTypes) => queryInterface.dropTable(tableOptions)
}