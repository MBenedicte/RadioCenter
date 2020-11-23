
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      first_name: Sequelize.STRING,
      middle_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      status:{
        type: Sequelize.STRING,
        defaultValue: 'inactive' //inactive, active, hold
      },
      gender:{
        type: Sequelize.ENUM('female','male',' '),
        defaultValue:' '
      },
      email:Sequelize.STRING,
      password:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at:{
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at:{
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
