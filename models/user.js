import mongoose from "mongoose"
import Product from "./product.js";


const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  order: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
          _id: false
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    }
  }
})

userSchema.methods.addToCart = function( product ) {
  let cartProductIndex = -1
  let newQuantity = 1

  if ( this.cart.items.length > 0 ) {
    cartProductIndex = this.cart.items.findIndex( cp => cp.product.toString() === product._id.toString() )
  }

  const updatedCartItems = [ ...this.cart.items ]
  if ( cartProductIndex >= 0 ) {
    newQuantity = this.cart.items[ cartProductIndex ].quantity + 1
    updatedCartItems[ cartProductIndex ].quantity = newQuantity
  } else {
    updatedCartItems.push({ product: product._id, quantity: newQuantity })
  }

  this.cart = { items: updatedCartItems }
  return this.save()
}

userSchema.methods.removeFromCart = function( productId ) {
  const updatedCartItems = this.cart.items.filter( cp => cp.product.toString() !== productId.toString() )
  this.cart.items = updatedCartItems
  return this.save()
}

userSchema.methods.addOrder = async function() {
  if ( this.cart.items.length > 0 ) {
    this.order.items.push( ...this.cart.items )
    this.cart = { items: [] }
    let totalPrice = 0
    /*this.order.items.forEach( item => {
      return Product.findById( item.product.toString() )
        .then( product => {
          totalPrice += product.price * item.quantity
          console.log( totalPrice );
        })
    })*/
    this.order.totalPrice = totalPrice
    return this.save()
  }
}

export default mongoose.model( 'User', userSchema )
