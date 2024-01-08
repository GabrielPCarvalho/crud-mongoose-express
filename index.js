// CONFIG INICIAL
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


// FORMA DE LER JSON/ MIDDLWARE
app.use(
  express.urlencoded({
    extended: true ,
  }),
)

app.use(express.json())

// ROTAS DA API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes);

// CONEXÃO COM O BANCO DE DADOS
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.yfslvt1.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  console.log('🔥 Conectado ao banco de dados');
  app.listen(3000, () => {
    console.log('🔥 Server started at http://localhost:3000');
  });
})
.catch((err) => {
  console.log('Erro ao conectar ao banco de dados', err);
})