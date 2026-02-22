import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ msg: "Acesso negado. Faça login!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    req.userId = decoded.id;
    req.userRole = decoded.role; 
    
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token inválido." });
  }
}

export function checkAdmin(req, res, next) {
  
  console.log("Tentativa de acesso ADM - Role do usuário:", req.userRole);

  if (req.userRole === 'admin') {
    next(); 
  } else {
    res.status(403).json({ msg: "Acesso negado. Esta área é restrita para o administrador." });
  }
}