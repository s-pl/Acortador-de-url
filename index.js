import dotenv from 'dotenv';
import express from 'express';
const PORT = 3000;
const app = express();

import router from './src/routes.js'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',router)

app.listen(PORT, () => console.log("Servidor iniciado en el puerto " + PORT))



