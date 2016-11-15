var getJsonFromReq = function(Schema, req) {
  let jsonObj = {};
  for (let key in Schema.obj) {
    if (req.body[key]) {
      jsonObj[key] = req.body[key];
    }
  }
  return jsonObj;
}

module.exports = getJsonFromReq;