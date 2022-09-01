export default ( req, res, next ) => {
  res.status( 404 ).render(
    '404',
    {
      pageTitle: "404 Not found",
      path: '/404'
    }
  )
}
