function errorHandler (err, req, res, next) {
  console.error(err);
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    next(err);
  }
}

export { errorHandler, boomErrorHandler };
