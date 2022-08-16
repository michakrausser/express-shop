const Product = require( '../models/product' );

const getAddProduct = ( req, res, next ) => {
  /*Way to use normal html templates
   * res.sendFile( path.join( rootDir, 'views', 'add-product.ejs.html') )
   */

  // Use res.render for Template Engines

  res.render(
    "admin/add-product",
    {
      pageTitle: "Add Products",
      path: "/admin/add-product",
      activeAddProduct: true,
      formsCss: true,
      productCss: true
    }
  );
}

const postAddProduct = ( req, res, next ) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  console.log( { title })
  console.log( { imageUrl })
  console.log( { description })
  console.log( { price })
  const product = new Product( title, imageUrl, description, price )
  product.save();
  res.redirect('/admin/products');
}

const getProducts = ( req, res, next ) => {
  /*Way to use normal html templates
   * res.sendFile( path.join( rootDir, 'views', 'shop.html' ) )
   */
  Product.fetchAll( products => {
    // Use res.render for Template Engines
    res.render(
      'admin/products',
      {
        pageTitle: "All Products",
        products,
        path: "/admin/products",
        activeShop: true,
        productCSS: true
      }
    )
  });
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts
}
