/** @format */
const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Unauthenticated');
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
	  req.User = decoded;
	  
    next();
  } catch {
    res.status(400).send('Invalid auth token');
  }
};

