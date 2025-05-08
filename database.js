import Sequelize from 'sequelize';

const sequelize = new Sequelize('fatec', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
