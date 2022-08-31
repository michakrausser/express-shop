const express = require( 'express' )
const {
  getIndex,
  getProducts,
  getProduct,
  getCart,
  postCart,
  postCartDeleteProduct,
  getCheckout,
  getOrder
} = require( '../controllers/shop' )
const router = express.Router()

router.get( '/', getIndex )

router.get( '/shop', getProducts )

router.get( '/shop/:productId', getProduct )

router.get( '/cart', getCart )

router.post( '/cart', postCart )

router.post( '/delete-cart-product', postCartDeleteProduct )

router.get( '/orders', getOrder)

router.get( '/checkout', getCheckout )

module.exports = router
