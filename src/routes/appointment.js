import express from 'express';
import prisma from '../config/prisma.js';
import authMiddleware, { checkAdmin } from '../middleware/auth.js'; 

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


router.get('/admin/all', authMiddleware, checkAdmin, async (req, res) => {
  try {
    console.log("Admin acessando todos os dados...");
    const todosAgendamentos = await prisma.appointment.findMany({
      include: {
        user: true 
      },
      orderBy: { date: 'asc' }
    });
    
    console.log(`Total encontrado: ${todosAgendamentos.length}`);
    res.json(todosAgendamentos);
  } catch (err) {
    console.error("Erro Prisma:", err);
    res.status(500).json({ error: "Erro ao buscar todos os agendamentos." });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    
    const isMaster = req.userEmail === 'futbrasss@gmail.com' || req.userRole === 'admin';

    if (isMaster) {
      
      await prisma.appointment.delete({
        where: { id: id }
      });
    } else {
      
      const result = await prisma.appointment.deleteMany({
        where: { id: id, userId: req.userId }
      });
      if (result.count === 0) return res.status(403).json({ msg: "Não autorizado" });
    }

    res.json({ msg: "Agendamento removido com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir agendamento." });
  }
});

export default router;