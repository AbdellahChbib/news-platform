const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Routes pour la gestion des articles
router.get('/', newsController.getAllNews);         // Récupérer tous les articles
router.get('/:id', newsController.getNewsById);     // Récupérer un article par ID
router.post('/', newsController.createNews);        // Créer un nouvel article

// Routes optionnelles pour la modification et la suppression
router.put('/:id', newsController.updateNews);      // Modifier un article par ID
router.delete('/:id', newsController.deleteNews);   // Supprimer un article par ID

module.exports = router;
