const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json()); 

app.use(userRoutes);

sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

const porta = process.env.PORTA || 3000;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

