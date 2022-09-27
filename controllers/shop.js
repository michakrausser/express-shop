import Product from '../models/product.js'

export const getIndex = ( req, res, next ) => {
  res.render(
    "shop/index",
    {
      pageTitle: "The new online book shop",
      path: "/"
    }
  )
}

export const getProducts = ( req, res, next ) => {
  /*Way to use normal html templates
   * res.sendFile( path.join( rootDir, 'views', 'shop.html' ) )
   */
  Product.fetchAll()
      .then( products => {
        res.render(
          "shop/product-list",
          {
            pageTitle: "Shop",
            products,
            path: "/shop",
            activeShop: true,
            productCSS: true
          }
        )
      })
      .catch( err => err.log )
}

export const getProduct = ( req, res, next ) => {
  const productId = req.params.productId
  /*
   * Instead of findByPK you can use findAll() both ways are perfect fine.
   * Product.findAll({ where: { id: productId }})
   *  .then( products => {
   *    res.render(
   *     "shop/product-detail",
   *     {
   *       pageTitle: products[ 0 ].title,
   *       products[ 0 ],
   *       path: '/products'
   *     }
   *   )
   * })
   * .catch( err => console.log( err ))
   **/
  Product.findById( productId )
    .then( product => {
      console.log( product );
      res.render(
        "shop/product-detail",
        {
          pageTitle: product.title,
          product,
          path: '/products'
        }
      )
    })
    .catch( err => console.log( err ))
}

export const getCart = ( req, res, next ) => {
  req.user
    .getCart()
    .then( products => {
      res.render(
        "shop/cart",
        {
          pageTitle: "Your Cart",
          path: "/cart",
          products
        }
      )
    })
    .catch( err => console.log( err ))
}

export const postCart = ( req, res, next ) => {
  const productId = req.body.productId
  Product.findById( productId )
    .then( product => {
      return req.user.addToCart( product )
    })
    .then( result => {
      res.redirect( '/cart' )
    })
}

export const postCartDeleteProduct = ( req, res, next ) => {
  const productId = req.body.id
  req.user
    .deleteItemFromCart( productId )
    .then( cartItems => {
      res.redirect( '/cart' )
    })
    .catch( err => console.log( err ))
}

export const getOrders = ( req, res, next ) => {
  req.user.getOrders({ include: [ 'products' ]})
    .then( orders => {
      res.render(
        "shop/orders",
        {
          pageTitle: "Your Order",
          orders,
          path: "/orders",
        }
      )
    })
    .catch( err => console.log( err ))
}

export const postOrders = ( req, res, next ) => {
  let fetchedCart
  req.user
    .getCart()
    .then( cart => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then(products => {
      return req.user
        .createOrder()
        .then( order => {
          return order.addProducts(
            products.map( product => {
              product.orderItem = { quantity: product.cartItem.quantity }
            return product
          }) )
        })
        .catch( err => console.log( err ))
    })
    .then(() => {
      return fetchedCart.setProducts( null )
    })
    .then(() => {
      res.redirect( '/orders' )
    })
    .catch( err => console.log( err ))
}
