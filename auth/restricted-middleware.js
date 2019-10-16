const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');


module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(`token ${token}`)

  if(token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({message: 'bad panda'})
      } else {
        //valid
        res.username = decodedToken.username
        next()
      }
    })
  } else {
    res.status(400).json({message: 'no token provided'})
  }
};
