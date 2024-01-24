const jwt = require("jsonwebtoken");
const { createError } = require("../error");

 const authorized = (req, res, next) => {
  const token = token = req.headers?.authentication?.split(" ")[1]
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return next(createError(403, "Token is not valid"));
      } else {
        req.user = user;

        next()
      }
    });
  }
};


module.exports={authorized}