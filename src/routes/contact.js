import express from 'express';
import prisma from '../config/prisma.js'; 


const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const contact = await prisma.contact.create({
      data: { 
        name, 
        email, 
        message 
      }
    });
    
    res.status(201).json({ 
      msg: "Mensagem enviada com sucesso!", 
      contact 
    });
  } catch (err) {
    console.error("Erro ao salvar no Neon:", err);
    res.status(500).json({ error: "Erro interno ao enviar mensagem." });
  }
});

export default router;