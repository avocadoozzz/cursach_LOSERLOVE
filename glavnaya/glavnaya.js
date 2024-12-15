
// Book Now buttons functionality
document.querySelectorAll('.book-now').forEach(button => {
    button.addEventListener('click', () => {
        alert("Thank you for booking! We will contact you soon.");
    });
});

// Language selection functionality
document.querySelector('.header-icons img[alt="Language"]').addEventListener('click', () => {
    const currentLang = document.querySelector('.header-content p').textContent.includes("Могилев") ? "ru" : "en";
    if (currentLang === "ru") {
        // Switch to English
        document.querySelector('h1').textContent = "LOSER LOVE";
        document.querySelector('.header-content p').textContent = "Mogilev, Forum, 309";
        document.querySelector('.description p').textContent = "Epilation studio. Our staff have medical education. Located in the city center. Always pleasant prices.";
        document.querySelector('.map h3').textContent = "On the map";
        document.querySelector('.view-map').textContent = "View on map";
        document.querySelector('.places h3').textContent = "Places";
        document.querySelector('.services h3').textContent = "Services";
        document.querySelector('.reviews h3').textContent = "Reviews";
        document.querySelector('.leave-feedback').textContent = "Leave a feedback";
        document.querySelector('.complain').textContent = "Complain";
        document.querySelector('.show-more').textContent = "Show more";
    } else {
        // Switch to Russian
        document.querySelector('h1').textContent = "LOSER LOV";
        document.querySelector('.header-content p').textContent = "Могилев, тц-Форум ,каб. 309";
        document.querySelector('.description p').textContent = "Студия эпиляции. Наши сотрудники с мед.образованием 🧑‍⚕️. Находимся в центре города. Всегда приятные цены.";
        document.querySelector('.map h3').textContent = "На карте";
        document.querySelector('.view-map').textContent = "Показать на карте";
        document.querySelector('.places h3').textContent = "Мастера";
        document.querySelector('.services h3').textContent = "Услуги";
        document.querySelector('.reviews h3').textContent = "Отзывы";
        document.querySelector('.leave-feedback').textContent = "Оставить отзыв";
        document.querySelector('.complain').textContent = "Пожаловаться";
        document.querySelector('.show-more').textContent = "Показать больше";
    }
});

// View on map functionality
document.querySelector('.view-map').addEventListener('click', () => {
    alert("Opening map...");
    // Add functionality to open a map, if available.
});

// Show more reviews functionality
document.querySelector('.show-more').addEventListener('click', () => {
    const newReview = document.createElement('div');
    newReview.classList.add('review-item');
    newReview.innerHTML = `
        <p><strong>Новый пользователь</strong> - ${new Date().toLocaleDateString()}</p>
        <p>⭐⭐⭐⭐⭐</p>
    `;
    document.querySelector('.review-list').appendChild(newReview);
    alert("Loaded more reviews.");
});

// Leave feedback functionality
document.querySelector('.leave-feedback').addEventListener('click', () => {
    const feedback = prompt("Please enter your feedback:");
    if (feedback) {
        const newFeedback = document.createElement('div');
        newFeedback.classList.add('review-item');
        newFeedback.innerHTML = `
            <p><strong>Вы</strong> - ${new Date().toLocaleDateString()}</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>${feedback}</p>
        `;
        document.querySelector('.review-list').appendChild(newFeedback);
        alert("Thank you for your feedback!");
    }
});

// Complain functionality
document.querySelector('.complain').addEventListener('click', () => {
    alert("Thank you! Your complaint has been submitted.");
});
