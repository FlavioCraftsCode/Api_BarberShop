import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword, phone }
    });
    res.status(201).json({ msg: "Conta criada com sucesso!" });
  } catch (err) {
    res.status(400).json({ error: "Email já cadastrado ou dados inválidos." });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } else {
    res.status(400).json({ msg: "Email ou senha incorretos." });
  }
});

export default router;