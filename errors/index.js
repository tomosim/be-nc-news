exports.handleCustomErrors = (err, req, res, next) => {
  if ("status" in err) {
    const { status, msg } = err;
    res.status(status).send({ msg });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors = (err, req, res, next) => {
  const codes = {
    23502: { status: 400, msg: "Incomplete body" },
    "42703": { status: 400, msg: "Column does not exist" },
    "22P02": { status: 400, msg: "Invalid ID" },
    23503: {
      status: 404,
      msg:
        err.detail &&
        err.detail.match(/"\w+"/g) &&
        err.detail.match(/"\w+"/g)[0][1].toUpperCase() +
          err.detail.match(/"\w+"/g)[0].slice(2, -2) +
          " not found",
    },
  };
  if (err.code in codes) {
    const { status, msg } = codes[err.code];
    res.status(status).send({ msg });
  } else {
    next(err);
  }
};

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error 💀" });
};
