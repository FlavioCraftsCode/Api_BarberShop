import express from 'express';
import prisma from '../config/prisma.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
  const { date, service } = req.body;
  try {
    const novoAgendamento = await prisma.appointment.create({
      data: {
        date: new Date(date),
        service,
        userId: req.userId 
      }
    });
    res.status(201).json(novoAgendamento);
  } catch (err) {
    res.status(500).json({ error: "Erro ao agendar." });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  const agendamentos = await prisma.appointment.findMany({
    where: { userId: req.userId },
    orderBy: { date: 'asc' }
  });
  res.json(agendamentos);
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    
    await prisma.appointment.deleteMany({
      where: { id: req.params.id, userId: req.userId }
    });
    res.json({ msg: "Agendamento removido!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir." });
  }
});

export default router;