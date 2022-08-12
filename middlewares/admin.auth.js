const passport = require('passport');
const jwt = require('jsonwebtoken');
const { UniqueTokenStrategy } = require('passport-unique-token');

const stategyOptions = {tokenHeader: 'Authorization'}; 
passport.use(new UniqueTokenStrategy(stategyOptions, (bearerToken, done) => {
  try {
    const { APP_URL, JWT_SECRET } = process.env;
    const token  = bearerToken.split(' ')[1];
    const secret =  JWT_SECRET;
    const admin = jwt.verify(token, secret, {    
      issuer: APP_URL,
      expiresIn: '8h',
  });
    return done(null, admin);
  } catch(err) {
    err.status = 401;
    done(err);
  }
}));

module.exports = function(req, res, next) {  
  const path = req.path.toLowerCase();
  if (path === '/login') {
    return next();
  }

  passport.authenticate('token', (err, user, info) => {
    if (info && info.message.toLowerCase() == 'missing credentials') {
       return res.status(403).json({message: 'Missing Auth Token'});
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({messgae: 'Invalid token!'});
    }
    req.admin = user;
    return next();
  })(req, res, next);
}