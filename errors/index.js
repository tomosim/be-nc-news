exports.handleCustomErrors = (err, req, res, next) => {
  if ("status" in err === true) {
    const { status, msg } = err;
    res.status(status).send({ msg });
  }
};
