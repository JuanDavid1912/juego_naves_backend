const defineUser = (Sequelize,DataTypes) => {
    return Sequelize.define('User',{
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull:false,
            unique:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
        }

    },{
        tableName:'user',
        timestamps: true
    });
};

module.exports=defineUser;