import path from 'path'
import express from 'express'

import { adminRouter } from './routes/admin.js'
import { shopRouter } from './routes/shop.js'
import get404Routes from './controllers/error.js'
import bodyParser from 'body-parser'
import sequelize from './util/database.js'

const app = express()
/*
 * set up Template engine ( pug works already out of the box, don't need this step )
 * app.engine( 'handlebars', engine({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout' }))
 */

app.set( 'view engine', 'pug' )

app.use( bodyParser.urlencoded( { extended: false } ) )
// allow to access the public folder => styles
app.use( express.static( 'public' ))

app.use( '/admin', adminRouter )
app.use( shopRouter )

app.use( get404Routes )

sequelize
  .sync()
  .then( result => {
    app.listen( 3000 )
  })
  .catch( err => console.log( err ))


