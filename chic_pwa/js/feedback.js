document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const feedbackForm = document.querySelector('#feedback-widget form');
    const feedbackWidget = document.getElementById('feedback-widget');
    const feedbackTrigger = document.getElementById('feedback-trigger');
    
    // Создаем уведомление
    const successNotification = document.createElement('div');
    successNotification.id = 'feedback-success';
    successNotification.style.cssText = 'display: none; position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 15px; border-radius: 5px; z-index: 1000;';
    successNotification.textContent = 'Сообщение отправлено! Спасибо.';
    document.body.appendChild(successNotification);

    // Обработчик формы
    if(feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            fetch('save_feedback.php', {
                method: 'POST',
                body: new FormData(this)
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    successNotification.style.display = 'block';
                    setTimeout(() => {
                        successNotification.style.display = 'none';
                    }, 3000);
                    
                    feedbackForm.reset();
                    feedbackWidget.style.display = 'none';
                } else {
                    alert('Ошибка: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Произошла ошибка при отправке формы');
            });
        });
    }

    // Триггер виджета
    if(feedbackTrigger) {
        feedbackTrigger.addEventListener('click', function() {
            feedbackWidget.style.display = feedbackWidget.style.display === 'none' ? 'block' : 'none';
        });
    }
});