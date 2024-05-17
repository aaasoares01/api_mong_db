const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
 
dotenv.config();
 
const app = express();
app.use(express.json());

const contatoRouter = require('./routes/contatoRoutes');
app.use('/contato', contatoRouter);
 
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB Atlas!');
})
.catch(err => {
  console.error('Erro de conexão ao MongoDB:', err);
});
 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});