const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


const app = express();
app.use(express.json()); 

app.use(userRoutes.router);
app.use(userRoutes);
app.use(categoryRoutes);

sequelize.sync({ alter: true })
  .then(() =>console.log('Banco de dados sincronizado'))
  .catch(err =>console.error('Erro ao sincronizar o banco de dados:', err));
sequelize.sync({alter:true})
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

const porta = process.env.PORTA || 10000;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
