import express from 'express'

import * as adminRoutes from '../controllers/admin.js'
export const adminRouter = express.Router()

// path: /admin/add-product.ejs => GET
adminRouter.get( '/add-product', adminRoutes.getAddProduct )

// path /admin/add-product.ejs => POST
adminRouter.post( '/add-product', adminRoutes.postAddProduct )

adminRouter.get( '/edit-product/:productId', adminRoutes.getEditProduct )

adminRouter.post( '/edit-product', adminRoutes.postEditProduct )

adminRouter.get( '/products', adminRoutes.getProducts)

adminRouter.get( '/products/:productId', adminRoutes.getProduct )

adminRouter.post( '/delete-product', adminRoutes.postDeleteProduct )
