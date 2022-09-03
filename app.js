import express from 'express'

import { adminRouter } from './routes/admin.js'
import { shopRouter } from './routes/shop.js'
import get404Routes from './controllers/error.js'
import bodyParser from 'body-parser'
import sequelize from './util/database.js'
import Product from './models/product.js'
import Cart from './models/cart.js'
import User from './models/user.js'
import CartItem from './models/cart-item.js'
import Order from './models/order.js'
import OrderItem from './models/order-item.js'

const app = express()
/*
 * set up Template engine ( pug works already out of the box, don't need this step )
 * app.engine( 'handlebars', engine({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout' }))
 */

app.set( 'view engine', 'pug' )

app.use( bodyParser.urlencoded( { extended: false } ) )
// allow to access the public folder => styles
app.use( express.static( 'public' ))

app.use(( req, res, next ) => {
  User.findByPk( 1 )
    .then( user => {
      req.user = user
      next();
    })
    .catch( err => console.log( err ))
})

app.use( '/admin', adminRouter )
app.use( shopRouter )

app.use( get404Routes )

Product.belongsTo( User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany( Product )
User.hasOne( Cart )
Cart.belongsTo( User )
Cart.belongsToMany( Product, { through: CartItem })
Product.belongsToMany( Cart, { through: CartItem })
User.hasMany( Order )
Order.belongsTo( User )
Order.belongsToMany( Product, { through: OrderItem })

sequelize
  .sync()
  .then( result => {
    return User.findByPk( 1 )
  })
  .then( user => {
    if ( !user ) {
      return User.create({ name: 'Micha', email: 'test@test.com' })
    }
    return user
  })
  .then( user => {
    return Cart.findByPk( 1 )
  })
  .then( cart => {
    if ( !cart ) {
      return user.createCart()
    }
  })
  .then( () => {
    app.listen( 3000 )
  })
  .catch( err => console.log( err ))


