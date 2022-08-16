const get404Routes = ( req, res, next ) => {
  res.status( 404 ).render(
    '404',
    {
      pageTitle: "404 Not found",
      path: '/404'
    }
  );
}

module.exports = get404Routes;
