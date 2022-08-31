const path = require( 'path' )
const express = require( 'express' )
// const rootDir = require( '../util/path' )
const {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  getProducts,
  getProduct,
  postDeleteProduct
} = require( '../controllers/admin' )
const router = express.Router()

// path: /admin/add-product.ejs => GET
router.get( '/add-product', getAddProduct )

// path /admin/add-product.ejs => POST
router.post( '/add-product', postAddProduct )

router.get( '/edit-product/:productId', getEditProduct )

router.post( '/edit-product', postEditProduct )

router.get( '/products', getProducts)

router.get( '/products/:productId', getProduct )

router.post( '/delete-product', postDeleteProduct )

module.exports = router

