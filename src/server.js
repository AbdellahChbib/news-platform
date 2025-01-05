require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.use('/api/news', newsRoutes);


app.get('/test-error', (req, res, next) => {
  const error = new Error('Ceci est une erreur de test.');
  error.status = 400;
  next(error);
});


// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); // Log l'erreur sur le serveur
  res.status(500).json({
      message: err.message || 'Une erreur est survenue sur le serveur.',
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
