exports.handleCustomErrors = (err, req, res, next) => {
  if ("status" in err === true) {
    const { status, msg } = err;
    res.status(status).send({ msg });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  const codes = { "42703": { status: 400, msg: "Column does not exist" } };
  if (err.code in codes) {
    const { status, msg } = codes[err.code];
    res.status(status).send({ msg });
  } else {
    next(err);
  }
};
