import mongodb from "mongodb";
import { getDb } from '../util/database.js'

export default class Product {
  constructor( title, imageUrl, description, price, id, userId ) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
    this._id = id ? new mongodb.ObjectId( id ) : null
    this.userId = userId
  }

  save() {
    const db = getDb()
    let dbOperation
    if ( this._id ) {
      dbOperation = db
        .collection( 'products' )
        .updateOne({ _id: this._id }, { $set: this })
    }
    else {
      dbOperation = db
        .collection( 'products' )
        .insertOne( this )
    }
    return dbOperation.catch( err => console.log( err ))
  }

  static fetchAll() {
    return getDb().collection( 'products' )
      .find()
      .toArray()
      .then( products => {
        console.log( { products } );
        return products
      })
      .catch( err => console.log( err ))
  }

  static findById( productId ) {
    return getDb()
      .collection( 'products' )
      .find({ _id: new mongodb.ObjectId( productId )})
      .next()
      .then( product => {
        console.log( { product } );
        return product
      })
      .catch( err => console.log( err ))

  }

  static deleteById( productId ) {
    const db = getDb()
    return db
      .collection( 'products' )
      .deleteOne({ _id: new mongodb.ObjectId( productId )})
      .catch( err => console.log( err ))
  }
}
