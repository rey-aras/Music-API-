const {
    SQLContext
} = require('rey-common');

const { Model, DataTypes } = SQLContext.getORMProvider();

class Music extends Model {}

Music.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
}, {
    sequelize: SQLContext.getContext(),
    underscored: true,
    paranoid: true,
    tableName: 'musics'
});

Music.associate = (models) => {
    // 
};

module.exports = Music;