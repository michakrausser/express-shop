import Sequelize from 'sequelize'
import sequelize from '../util/database.js'

export default sequelize.define( 'order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
})
