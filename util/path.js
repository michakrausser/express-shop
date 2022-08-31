// Just needed if you want sendfile and send directly html instead of work with Template Engines
// In this case you can export directly the base file directory to save a little bit of code
const path = require( 'path' )

module.exports = path.dirname( process.mainModule.filename )
