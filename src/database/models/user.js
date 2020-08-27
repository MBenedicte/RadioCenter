
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    first_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    status:{
      type: DataTypes.STRING,
      defaultValue: 'inactive' //inactive, active, hold
    },
    gender:{
      type: DataTypes.ENUM('female','male',' '),
      defaultValue:' '
    },
    email:DataTypes.STRING,
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
      tableName: 'users',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
  });
  return User;
};
