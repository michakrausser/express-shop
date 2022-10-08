import express from 'express'

import { adminRouter } from './routes/admin.js'
import { shopRouter } from './routes/shop.js'
import get404Routes from './controllers/error.js'

import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import User from './models/user.js'

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
  User.findById( "6340c7ffb9c2dc68e1ee2f39" )
    .then( user => {
      req.user = user
      next()
    })
    .catch( err => console.log( err ))
})

app.use( '/admin', adminRouter )
app.use( shopRouter )

app.use( get404Routes )

mongoose.connect( 'mongodb+srv://michakrausser:jklF42egTmb49PK4@store.kurcrn1.mongodb.net/shop?retryWrites=true&w=majority' )
  .then( result => {
    User.findOne()
      .then(user => {
        if ( !user ) {
          const user = new User({
            name: 'Micha',
            email: 'micha@vue.js',
            cart: {
              items: []
            },
            order: {
              items: [],
              totalPrice: 0
            }
          })
          user.save();
        }
      })
    app.listen( 3000 )
  })


