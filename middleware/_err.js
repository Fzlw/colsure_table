module.exports = options => {
  return (err, req, res, next) => {
    res
      .status(err.status || 500)
      .send(err.message || 'Internet error')
      .end();
    next();
  }
};