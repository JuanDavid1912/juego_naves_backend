const defineLevel = (Sequelize,DataTypes) => {
    return Sequelize.define('Level',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoincrement:true,
            unique:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        speed:{
            type:DataTypes.INTEGER,
            allowNull: false,
        }

    },{
        tableName:'level',
        timestamps: true
    });
};

module.exports=defineLevel;