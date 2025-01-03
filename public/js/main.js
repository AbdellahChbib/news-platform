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
                    <img src="${article.thumbnail || 'https://via.placeholder.com/150'}" 
                         class="card-img-top" 
                         alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.excerpt || article.body.slice(0, 100)}...</p>
                        <button class="btn btn-primary btn-sm" onclick="viewArticle(${article.id})">
                            Lire plus
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Ajouter la card au conteneur
        container.innerHTML += card;
    });
}

// Fonction pour afficher les détails d'un article
function viewArticle(articleId) {
    alert(`Détails de l'article ID : ${articleId}`);
}


// TODO: Question 2 - Créer une fonction pour gérer les erreurs
function showError(message) {
    // Afficher un message d'erreur avec Bootstrap
}

// Initialisation
document.addEventListener('DOMContentLoaded', fetchLatestNews);