    // Animation au scroll
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.addEventListener('scroll', () => {
        const scrolled = modalContent.scrollTop;
        modalContent.style.transform = `rotateZ(${scrolled * 0.05}deg)`;
    });

    // Copie d'ID
    document.querySelector('.fa-copy').addEventListener('click', () => {
        navigator.clipboard.writeText('#1');
        // Animation de feedback
    });