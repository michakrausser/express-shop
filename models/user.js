import { getDb } from "../util/database.js";
import mongodb from "mongodb";


const ObjectId = mongodb.ObjectId

export default class {
  constructor( username, email, cart = { items: []}, id ) {
    this.name = username
    this.email = email
    this.cart = cart
    this._id = id
  }

  save() {
    return getDb()
      .collection( 'users' )
      .insertOne( this )
  }

  addToCart( product ) {
    let cartProductIndex = -1
    let newQuantity = 1

    if ( this.cart.items.length > 0 ) {
      cartProductIndex = this.cart.items.findIndex( cp => cp.productId.toString() === product._id.toString())
    }

    const updatedCartItems = [ ...this.cart.items ]
    if ( cartProductIndex >= 0 ) {
      newQuantity = this.cart.items[ cartProductIndex ].quantity + 1
      updatedCartItems[ cartProductIndex ].quantity = newQuantity
    } else {
      updatedCartItems.push({ productId: new ObjectId( product._id ), quantity: newQuantity })
    }

    const updatedCart = { items: updatedCartItems }
    return getDb()
      .collection( 'users' )
      .updateOne(
        { _id: new ObjectId( this._id )},
        { $set: { cart: updatedCart }}
      )
  }

  deleteItemFromCart( productId ) {
    const updatedCartItems = this.cart.items.filter( cp => cp.productId.toString() !== productId.toString() )
    return getDb()
      .collection( 'users' )
      .updateOne(
        { _id: new ObjectId( this._id )},
        { $set: { cart: { items: updatedCartItems } }}
      )
  }

  getCart() {
    const productIds = this.cart.items.map( i => i.productId )
    return getDb()
      .collection( 'products' )
      .find({ _id: { $in: productIds }})
      .toArray()
      .then( products => {
        return products.map( p => {
          return { ...p, quantity: this.cart.items.find( i => i.productId.toString() === p._id.toString() ).quantity }
        })
      })
  }

  static findById( userId ) {
    return getDb()
      .collection( 'users' )
      .findOne({ _id: new ObjectId( userId )})
  }

}
