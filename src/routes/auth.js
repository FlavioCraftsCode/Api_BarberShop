import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "Este e-mail já está em uso." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        phone,
        role: 'user' 
      }
    });
    
    res.status(201).json({ msg: "Conta criada com sucesso!", userId: newUser.id });
  } catch (err) {
    console.error("Erro no Registro:", err);
    res.status(500).json({ error: "Erro ao processar cadastro. Verifique os dados." });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (user && await bcrypt.compare(password, user.password)) {
      
      
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          role: user.role 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
      );

      res.json({ 
        token, 
        user: { 
          id: user.id,
          name: user.name, 
          email: user.email,
          role: user.role 
        } 
      });
    } else {
      res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }
  } catch (error) {
    console.error("Erro no Login:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

export default router;