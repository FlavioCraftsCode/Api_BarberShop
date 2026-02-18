import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ msg: "Acesso negado. Faça login!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token inválido." });
  }
}