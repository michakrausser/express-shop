const express = require( 'express' );
const { getIndex, getProducts, getCart, getCheckout, getOrder } = require( '../controllers/shop' );
const router = express.Router();

router.get( "/", getIndex );

router.get( "/products", getProducts )

router.get( "/cart", getCart )

router.get( "/orders", getOrder)

router.get( "/checkout", getCheckout )

module.exports = router;
