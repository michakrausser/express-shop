import express from 'express'

import { adminRouter } from './routes/admin.js'
import { shopRouter } from './routes/shop.js'
import get404Routes from './controllers/error.js'
import bodyParser from 'body-parser'
import mongoConnect from './util/database.js'
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
  User.findById( "63321c88b9e6ca39104bec48" )
    .then( user => {
      req.user = new User( user.username, user.email, user.cart, user._id )
      next()
    })
    .catch( err => console.log( err ))
})

app.use( '/admin', adminRouter )
app.use( shopRouter )

app.use( get404Routes )

mongoConnect( () => {
  app.listen( 3000 )
})


