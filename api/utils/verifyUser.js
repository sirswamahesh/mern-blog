const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyToken =  (req, res, next) => {
  // console.log(req);
  const token = req.cookies.access_token;
// console.log(token)
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
