import Product from '../models/product.js'
import Cart from '../models/cart.js'

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
  Product.findAll()
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
  Product.findByPk( productId )
    .then( product => {
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

export const postCart = ( req, res, next ) => {
  const productId = req.body.productId
  Product.findById( productId, ( product ) => {
    Cart.addProduct( productId, product.price )
  })
  res.redirect( "/cart" )
}

export const postCartDeleteProduct = ( req, res, next ) => {
  const productId = req.body.id
  console.log( { productId } );
  Product.findById( productId, ( product ) => {
    console.log( { product } );
    Cart.deleteProduct( productId, product.price )
  })
  res.redirect( "/cart" )
}

export const getOrder = ( req, res, next ) => {
  res.render(
    "shop/order",
    {
      pageTitle: "Your Order",
      path: "/order",
    }
  )
}

export const getCheckout = ( req, res, next ) => {
  res.render(
    'shop/checkout',
    {
      pageTitle: "Checkout",
      path: "/checkout",
    }
  )
}
