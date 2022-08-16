const path = require( 'path' );
const express = require( 'express' );

const adminRoutes = require( './routes/admin' );
const shopRoutes = require( './routes/shop' );
const get404Routes = require( './controllers/error' )
const bodyParser = require( 'body-parser' );

const app = express();
// set up Template engine ( pug works already out of the box, don't need this step )
// app.engine( 'handlebars', engine({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout' }));

app.set( 'view engine', 'pug' );

app.use( bodyParser.urlencoded( { extended: false } ) );
// allow to access the public folder => styles
app.use( express.static( path.join( __dirname, 'public' )));

app.use( '/admin', adminRoutes );
app.use( shopRoutes );

app.use( get404Routes )

app.listen( 3000 );
