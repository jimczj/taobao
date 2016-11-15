module.exports = {
  checkLogin: function(req, res, next) {
    if (!req.session.user) {
      return res.status(401).json({
        status: 0,
        message: "请登录后再访问"
      });
    }
    next();
  },
};