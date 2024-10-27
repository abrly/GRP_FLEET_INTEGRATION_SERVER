import jwt from 'jsonwebtoken';


function generateToken(authData) {
    return jwt.sign(authData, process.env.JWT_Secret_Key, {
      expiresIn: process.env.JWT_Expires_In,
    });
  }


function verifyToken(req, res, next) {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });  
    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret_Key);
      req.authUser = decoded; 
      console.log('what is ma decoed user');
      console.log(req.authUser);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }

  const utilOps={
    generateToken:generateToken,
    verifyToken:verifyToken
  }

  export default utilOps;