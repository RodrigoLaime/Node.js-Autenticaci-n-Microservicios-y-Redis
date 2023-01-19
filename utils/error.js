function err(message, code) {
  let e = new Error(message);

  if (code) {
    e.statusCode = code; //status code
  }

  return e
}

module.exports = err;