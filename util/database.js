import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient

let _db

export default callback => {
  MongoClient.connect('mongodb+srv://michakrausser:jklF42egTmb49PK4@store.kurcrn1.mongodb.net/shop?retryWrites=true&w=majority')
    .then( client => {
      console.log( 'Connected' );
      _db = client.db()
      callback()
    })
    .catch( err => {
      console.log( err )
      throw err
    })
}

export const getDb = () => {
  if ( _db ) {
    return _db
  }
  throw 'No database found!'
}

