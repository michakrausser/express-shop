const path = require( 'path' );
const express = require( 'express' );
// const rootDir = require( '../util/path' )
const { getAddProduct, postAddProduct, getProducts } = require( '../controllers/admin' );
const router = express.Router();

// path: /admin/add-product.ejs => GET
router.get( "/add-product", getAddProduct );

// path /admin/add-product.ejs => POST
router.post( "/add-product", postAddProduct );

router.get( "/products", getProducts)

module.exports = router

