import Sequelize, { STRING } from 'sequelize'
import sequelize from '../util/database.js'

export default sequelize.define( 'user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false
  }
})
