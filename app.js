import express, { json } from 'express';
const app = express();
import sequelize from './database.js';
import userRoutes from './routes/userRoutes.js';
import homeRouter from './routes/homeRouter.js';
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));

app.use(json());
app.use('/api', userRoutes);
app.use('/', homeRouter);

// Configure a pasta "public" para arquivos estáticos (CSS, JS, imagens)
app.use(express.static('public'));
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco com sucesso!');
    await sequelize.sync(); // Garante que a tabela será criada
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err);
  }
})();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
