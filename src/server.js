import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointment.js';
import contactRoutes from './routes/contact.js'; 

dotenv.config();

const app = express();


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 


app.use('/api/auth', authRoutes); 
app.use('/api/appointments', appointmentRoutes); 
app.use('/api/contact', contactRoutes); 


app.get('/', (req, res) => {
  res.send('💈 API VintageCuts (Postgres/Neon) está online e voando no Render! 🚀');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log('✅ Conexão com Neon/Postgres via Prisma está ativa.');
});