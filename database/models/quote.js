const {
    SQLContext
} = require('rey-common');

const { Model, DataTypes } = SQLContext.getORMProvider();

class Quote extends Model {}

Quote.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    author: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
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
    tableName: 'quotes'
});

Quote.associate = (models) => {
    // 
};

module.exports = Quote;
