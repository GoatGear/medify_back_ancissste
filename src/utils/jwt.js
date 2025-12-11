import jwt from 'jsonwebtoken'

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};

export const jwtUtils = {
  verifyToken,
  generateToken
}