
const { db } = require( '../util/database' )
const Cart = require( './cart' )

const product = class Product {
  constructor( title, imageUrl, description, price, id = null ) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
    this.id = id
    console.log( 'constructor id: ', this.id );
  }

  save() {
    return db.execute(
      'INSERT INTO products ( title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [ this.title, this.price, this.imageUrl, this.description ]
    )
  }

  static deleteById( id ) {

  }

  static fetchAll() {
    return db.execute( 'SELECT * FROM products' )
  }

  static findById( id ) {
    return db.execute( 'SELECT * FROM products WHERE products.id = ?', [ id ])
  }
}

module.exports = product
