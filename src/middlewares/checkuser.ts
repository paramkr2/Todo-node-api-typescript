import jwt from 'jsonwebtoken' ;
import fs from 'fs'
const publicKey = fs.readFileSync('src/keys/rsa.pub','utf-8')

export const verificationMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }
    // if verification fails, it will throw an error
    const payload = jwt.verify(token, publicKey,{ algorithm: 'RS256' });
	console.log('verification middleware payload',payload);
    res.locals.user = payload.username;
	res.locals.userid=payload.userId ;
    next(); // Call next to pass control to the next middleware or route handler
  } catch (error) {
    console.log('Verification middleware', error);
    return res.status(400).json({ error: 'Token Error' });
  }
};

