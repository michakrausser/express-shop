const Product = require( "../models/product" );

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
  Product.fetchAll( products => {
    // Use res.render for Template Engines
    res.render(
      'shop/product-list',
      {
        pageTitle: "Shop",
        products,
        path: "/products",
        activeShop: true,
        productCSS: true
      }
    )
  });
}

const getCart = ( req, res, next ) => {
  res.render(
    'shop/cart',
    {
      pageTitle: "Your Cart",
      path: "/cart",
    }
  )
}

const getOrder = ( req, res, next ) => {
  res.render(
    'shop/order',
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
  getCart,
  getCheckout,
  getOrder
}
