document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.querySelector('.search-container');
    const establishmentCards = document.querySelectorAll('.establishment-card');

    const suggestionsDropdown = document.createElement('div');
    suggestionsDropdown.className = 'suggestions-dropdown';
    searchContainer.appendChild(suggestionsDropdown);

    const establishments = Array.from(establishmentCards).map(card => {
        return {
            element: card,
            name: card.querySelector('.establishment-name').textContent.trim(),
            lowerName: card.querySelector('.establishment-name').textContent.toLowerCase().trim()
        };
    });

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        suggestionsDropdown.innerHTML = '';
        
        if (searchTerm.length < 2) {
            suggestionsDropdown.style.display = 'none';
            return;
        }

        const matches = establishments.filter(est => 
            est.lowerName.includes(searchTerm)
        );

        if (matches.length > 0) {
            matches.forEach(match => {
                const suggestion = document.createElement('div');
                suggestion.className = 'suggestion-item';
                suggestion.textContent = match.name;
                suggestion.addEventListener('click', () => {
                    scrollToCard(match.element);
                    searchInput.value = match.name;
                    suggestionsDropdown.style.display = 'none';
                });
                suggestionsDropdown.appendChild(suggestion);
            });
            suggestionsDropdown.style.display = 'block';
        } else {
            suggestionsDropdown.style.display = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            suggestionsDropdown.style.display = 'none';
        }
    });

    function scrollToCard(cardElement) {
        cardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        cardElement.classList.add('highlight');
        setTimeout(() => {
            cardElement.classList.remove('highlight');
        }, 2000);
    }
});