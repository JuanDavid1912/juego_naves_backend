const defineUserLevel=(sequelize, DataTypes) => {
    return sequelize.define('UserLevel',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,                                 
            allowNull: false
        },
        time:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true
        },
        id_user:{
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        id_level:{
            type: DataTypes.INTEGER,
            references: {
                model: 'level',
                key: 'id'
            }
        }
    },{
        tableName:'userLevel',
        timestamps: true
    });
};
module.exports = defineUserLevel;