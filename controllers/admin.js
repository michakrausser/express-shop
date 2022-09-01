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
  const product = new Product(
    title,
    imageUrl,
    description,
    price
  )
  product
    .save()
    .then(() => {
      res.redirect( '/' )
    })
    .catch( err => console.log( err ))
  res.redirect( '/admin/products' )
}

export const getEditProduct = ( req, res, next ) => {
  const editMode = req.query.edit
  if ( !editMode ) {
    return res.redirect( '/' )
  }
  const productId = req.params.productId
  Product.findById( productId, product => {
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
}

export const postEditProduct = ( req, res, next ) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  const productId = req.body.id
  const updatedProduct = new Product(
    title,
    imageUrl,
    description,
    price,
    productId
  )
  updatedProduct.save()
  res.redirect( '/admin/products' )
}

export const getProducts = ( req, res, next ) => {
  /*Way to use normal html templates
   * res.sendFile( path.join( rootDir, 'views', 'shop.html' ) )
   */
  Product.fetchAll( products => {
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
}

export const getProduct = ( req, res, next ) => {
  const productId = req.params.productId
  Product.findById( productId, product => {
    console.log( { product } )
  })
  res.redirect( '/')
}

export const postDeleteProduct = ( req, res, next ) => {
  const productId = req.body.id
  Product.deleteById( productId )
  res.redirect( '/admin/products' )
}
