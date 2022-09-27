import Product from '../models/product.js'

export const getAddProduct = ( req, res, next ) => {
  /*Way to use normal html templates
   * res.sendFile( path.join( rootDir, 'views', 'add-product.ejs.html') )
   */

  // Use res.render for Template Engines

  res.render(
    'admin/edit-product',
    {
      pageTitle: 'Add Products',
      path: '/admin/add-product',
      editing: false,
      formAction: 'add-product'
    }
  )
}

export const postAddProduct = ( req, res, next ) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  const product = new Product( title, imageUrl, description, price, null, req.user._id )
  product
    .save()
    .then( result => {
      res.redirect( '/admin/products' )
    })
    .catch( err => console.log( err ))
}

export const getEditProduct = ( req, res, next ) => {
  const editMode = req.query.edit
  if ( !editMode ) {
    return res.redirect( '/' )
  }
  const productId = req.params.productId
  Product.findById( productId )
    .then( product => {
      if ( !product ) return res.redirect( '/' )
      res.render(
        'admin/edit-product',
        {
          pageTitle: 'Add Products',
          product,
          path: '/admin/edit-product',
          editing: editMode,
          formAction: 'edit-product'
        }
      )
    })
    .catch( err => console.log( err ))
}

export const postEditProduct = ( req, res, next ) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  const productId = req.body.id
  const product = new Product( title, imageUrl, description, price, productId )
  product
    .save()
    .then( result => {
      res.redirect( '/admin/products' )
    })
    .catch( err => console.log( err ))
  res.redirect( '/admin/products' )
}

export const getProducts = ( req, res, next ) => {
  /*Way to use normal html templates
   * res.sendFile( path.join( rootDir, 'views', 'shop.html' ) )
   */
  Product.fetchAll()
    .then( products => {
      // Use res.render for Template Engines
      res.render(
        'admin/products',
        {
          pageTitle: 'All Products',
          products,
          path: '/admin/products',
          activeShop: true,
          productCSS: true
        }
      )
    })
    .catch( err => console.log( err ))
}

export const getProduct = ( req, res, next ) => {
  const productId = req.params.productId
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

export const postDeleteProduct = ( req, res, next ) => {
  const productId = req.body.id
  /*Product.findByPk( productId )
    .then( product => {
      return product.destroy()
    })
    .then( result => {
      res.redirect( '/admin/products' )
    })
    .catch( err => console.log( err ))*/
  Product.deleteById( productId )
    .then( () => {
      res.redirect( '/admin/products' )
    })
    .catch( err => console.log( err ))
}
