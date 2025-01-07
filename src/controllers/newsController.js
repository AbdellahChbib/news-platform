const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/posts';

const newsController = {
    // Récupérer tous les articles
    async getAllNews(req, res) {
        try {
            const response = await axios.get(DUMMY_JSON_URL);
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error.message);
            res.status(500).json({ message: 'Erreur lors de la récupération des articles.' });
        }
    },

    // Récupérer un article par son ID
    async getNewsById(req, res) {
        const { id } = req.params;
        try {
            const response = await axios.get(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                res.status(404).json({ message: 'Article introuvable.' });
            } else {
                console.error('Erreur lors de la récupération de l\'article:', error.message);
                res.status(500).json({ message: 'Erreur lors de la récupération de l\'article.' });
            }
        }
    },

    // Créer un article
    async createNews(req, res) {
        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(400).json({ message: 'Le titre et le contenu sont obligatoires.' });
        }
        try {
            const response = await axios.post(DUMMY_JSON_URL, { title, body });
            res.status(201).json(response.data);
        } catch (error) {
            console.error('Erreur lors de la création de l\'article:', error.message);
            res.status(500).json({ message: 'Erreur lors de la création de l\'article.' });
        }
    },

    // Mettre à jour un article
    async updateNews(req, res) {
        const { id } = req.params;
        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(400).json({ message: 'Le titre et le contenu sont obligatoires pour la mise à jour.' });
        }
        try {
            const response = await axios.put(`${DUMMY_JSON_URL}/${id}`, { title, body });
            res.status(200).json(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                res.status(404).json({ message: 'Article introuvable.' });
            } else {
                console.error('Erreur lors de la mise à jour de l\'article:', error.message);
                res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article.' });
            }
        }
    },

    // Supprimer un article
    async deleteNews(req, res) {
        const { id } = req.params;

        try {
            const response = await axios.delete(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json({ message: 'Article supprimé avec succès.', data: response.data });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                res.status(404).json({ message: 'Article introuvable.' });
            } else {
                console.error('Erreur lors de la suppression de l\'article:', error.message);
                res.status(500).json({ message: 'Erreur lors de la suppression de l\'article.' });
            }
        }
    },
};

module.exports = newsController;
