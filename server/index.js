require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/apiRoutes');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// HTTPS options
const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'localhost.pem'))
};

// Middlewares
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Rotas
app.use('/api', apiRoutes);

// Cria servidor HTTPS
https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor HTTPS Express rodando na porta ${PORT}`);
});
