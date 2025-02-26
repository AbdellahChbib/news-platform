// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
    try {
        const response = await fetch('/api/news');
        const data = await response.json();
        displayNews(data.posts);
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles');
    }
}



// TODO: Question 1 - Compléter la fonction displayNews
function displayNews(news) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Réinitialiser le contenu

    // Vérifier si des articles sont disponibles
    if (news.length === 0) {
        container.innerHTML = '<p class="text-center">Aucun article disponible.</p>';
        return;
    }

    // Parcourir la liste des articles
    news.forEach((article) => {
        // Création d'une card Bootstrap pour chaque article
        const card = `
            <div class="col-md-6 mb-4">
                <div class="card shadow p-3 mb-5 bg-body-tertiary rounded fade-in">
                    <img src="${article.thumbnail || 'https://picsum.photos/seed/${article.id}/300/200'}" 
                         class="card-img-top" 
                         alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.excerpt || article.body.slice(0, 100)}...</p>
                        <div class="theme-switcher">
                            <a href= "../news.html">
                                <button type="button" class="btn btn-primary btn-lg rounded-pill px-4 shadow-lg" 
                                    data-bs-toggle="modal">
                                    <i class="fas fa-sparkles me-2"></i>Afficher les détails
                                </button>
                            </a>
                        </div>
                    </div>
        `;

        // Ajouter la card au conteneur
        container.innerHTML += card;
    });
}

// Fonction pour afficher les détails d'un article dans un modal
function viewArticle() {
}


function showError(message) {
    // Crée un élément de message d'erreur
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-danger alert-dismissible fade show';
    errorAlert.role = 'alert';
    errorAlert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Ajoute l'alerte au conteneur
    const errorContainer = document.getElementById('error-container');
    errorContainer.appendChild(errorAlert);

    // Supprime automatiquement le message après 5 secondes
    setTimeout(() => {
        errorAlert.remove();
    }, 5000);
}



// Initialisation
document.addEventListener('DOMContentLoaded', fetchLatestNews);