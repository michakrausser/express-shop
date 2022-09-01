import fs from 'fs'

const cartPath = 'p'

export default class Cart {
  static addProduct( id, productPrice ) {
    // Fetch the previous cart
    fs.readFile( cartPath, ( err, fileContent ) => {
      let cart = { products: [], totalPrice: 0 }
      if ( !err ) {
        cart = JSON.parse( fileContent )
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex( product => product.id === id )
      const existingProduct = cart.products[ existingProductIndex ]
      let updateProduct
      // Add new product / increase quantity
      if ( existingProduct ) {
        updateProduct = { ...existingProduct }
        updateProduct.qty = updateProduct.qty +1
        cart.products = [ ...cart.products ]
        cart.products[ existingProductIndex ] = updateProduct
      } else {
        updateProduct = { id, qty: 1 }
        cart.products = [ ...cart.products, updateProduct ]
      }
      cart.totalPrice = cart.totalPrice + +productPrice
      fs.writeFile( cartPath, JSON.stringify( cart ), ( err ) => {
        console.log( err );
      })
    })
  }

  static deleteProduct( id, productPrice ) {
    fs.readFile( cartPath, ( err, fileContent ) => {
      if ( err ) return
      const updatedCart = { ...JSON.parse( fileContent ) }
      const product = updatedCart.products.find( product => product.id === id )
      if ( !product ) return
      const productQty = product.qty
      updatedCart.products = updatedCart.products.filter( product => product.id !== id )
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

      fs.writeFile( cartPath, JSON.stringify( updatedCart ), ( err ) => {
        console.log( err );
      })
    })
  }

  static getCart( cb ) {
    fs.readFile( cartPath, ( err, fileContent ) => {
      const cart = JSON.parse( fileContent )
      if ( err ) {
        cb( null )
      } else {
        cb( cart )
      }
    })
  }
}
