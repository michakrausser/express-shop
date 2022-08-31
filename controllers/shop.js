const Product = require( '../models/product' )
const Cart = require( '../models/cart' )
const fs = require( "fs" );

const getIndex = ( req, res, next ) => {
  res.render(
    "shop/index",
    {
      pageTitle: "The new online book shop",
      path: "/"
    }
  )
}

const getProducts = ( req, res, next ) => {
  /*Way to use normal html templates
   * res.sendFile( path.join( rootDir, 'views', 'shop.html' ) )
   */
  Product.fetchAll()
    .then(([ rows, fieldData ]) => {
      res.render(
        "shop/product-list",
        {
          pageTitle: "Shop",
          products: rows,
          path: "/shop",
          activeShop: true,
          productCSS: true
        }
      )
    })
    .catch( err => console.log( err ))
}

const getProduct = ( req, res, next ) => {
  const productId = req.params.productId
  Product.findById( productId )
    .then(([ product ]) => {
      res.render(
        "shop/product-detail",
        {
          pageTitle: product.title,
          product: product[ 0 ],
          path: '/products'
        }
      )
    })
    .catch( err => console.log( err ))
}

const getCart = ( req, res, next ) => {
  Cart.getCart( cart => {
    Product.fetchAll( products => {
      const cartProducts = []
      for( const product of products ) {
        const cartProductData = cart.products.find( prod => prod.id === product.id )
        if ( cartProductData ) {
          cartProducts.push( { productData: product, qty: cartProductData.qty } )
        }
      }
      res.render(
        "shop/cart",
        {
          pageTitle: "Your Cart",
          path: "/cart",
          cartProducts
        }
      )
    })
  })
}

const postCart = ( req, res, next ) => {
  const productId = req.body.productId
  Product.findById( productId, ( product ) => {
    Cart.addProduct( productId, product.price )
  })
  res.redirect( "/cart" )
}

const postCartDeleteProduct = ( req, res, next ) => {
  const productId = req.body.id
  console.log( { productId } );
  Product.findById( productId, ( product ) => {
    console.log( { product } );
    Cart.deleteProduct( productId, product.price )
  })
  res.redirect( "/cart" )
}

const getOrder = ( req, res, next ) => {
  res.render(
    "shop/order",
    {
      pageTitle: "Your Order",
      path: "/order",
    }
  )
}

const getCheckout = ( req, res, next ) => {
  res.render(
    'shop/checkout',
    {
      pageTitle: "Checkout",
      path: "/checkout",
    }
  )
}

module.exports = {
  getIndex,
  getProducts,
  getProduct,
  getCart,
  postCart,
  postCartDeleteProduct,
  getCheckout,
  getOrder
}
