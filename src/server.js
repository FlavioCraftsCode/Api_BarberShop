import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointment.js';
import contactRoutes from './routes/contact.js'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes); 
app.use('/api/appointments', appointmentRoutes); 
app.use('/api/contact', contactRoutes); 

app.get('/', (req, res) => {
  res.send('💈 API VintageCuts (Postgres/Neon) está online e voando! 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log('✅ Conexão com Neon/Postgres via Prisma está ativa.');
  console.log('📬 Rota de Contato pronta para receber mensagens.');
});