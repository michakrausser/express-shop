import express from 'express'
import * as controllerRoutes from '../controllers/shop.js'
export const shopRouter = express.Router()

shopRouter.get( '/', controllerRoutes.getIndex )

shopRouter.get( '/shop', controllerRoutes.getProducts )

shopRouter.get( '/shop/:productId', controllerRoutes.getProduct )

shopRouter.get( '/cart', controllerRoutes.getCart )

shopRouter.post( '/cart', controllerRoutes.postCart )

shopRouter.post( '/delete-cart-product', controllerRoutes.postCartDeleteProduct )

shopRouter.get( '/orders', controllerRoutes.getOrders)

shopRouter.post( '/orders', controllerRoutes.postOrders )
