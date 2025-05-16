document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#Форма');

    if (form) {
        // Обработчик события отправки формы
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // отключить переход на другую страницу

            let isValid = true;

            // Проверка обязательных полей
            // Предположим, у вас есть поля с классом 'required'
            const requiredFields = form.querySelectorAll('.required');

            requiredFields.forEach(function (field) {
                // Удаляем ранее добавленные сообщения об ошибках
                const errorMsg = field.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }

                if (!field.value.trim()) {
                    isValid = false;
                    // Добавляем сообщение об ошибке
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.style.color = 'red';
                    error.textContent = 'Это поле обязательно для заполнения.';
                    field.insertAdjacentElement('afterend', error);
                }
            });

            // Проверка корректности email или номера телефона
            // Предположим, у вас есть поля с id 'email' и 'phone'
            const emailField = document.querySelector('#email');
            const phoneField = document.querySelector('#phone');

            // Регулярные выражения для проверки
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?\d{10,15}$/; // пример: +1234567890

            // Проверка email
            if (emailField && emailField.value.trim()) {
                if (!emailRegex.test(emailField.value.trim())) {
                    isValid = false;
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.style.color = 'red';
                    error.textContent = 'Некорректный формат электронной почты.';
                    emailField.insertAdjacentElement('afterend', error);
                }
            }

            // Проверка телефона
            if (phoneField && phoneField.value.trim()) {
                if (!phoneRegex.test(phoneField.value.trim())) {
                    isValid = false;
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.style.color = 'red';
                    error.textContent = 'Некорректный формат номера телефона.';
                    phoneField.insertAdjacentElement('afterend', error);
                }
            }

            // Если всё валидно, можно отправлять данные или показывать сообщение
            if (isValid) {
                // alert('Форма успешно отправлена!');

                // Вытягиваем и выводим данные в консоль
                const formData = {};
                if (form && form.elements) {
                    Array.from(form.elements).forEach(function (element) {
                        if (element.name) {
                            formData[element.name] = element.value;
                        }
                });
                }
                // console.log('form:', form);
                // console.log('form.elements:', form.elements);
                console.log('Данные формы:', formData);

                // Отображение сообщения об успехе в модальном окне
                document.getElementById('modalTitle').textContent = 'Успех';
                document.getElementById('modalBody').textContent = 'Данные успешно отправлены!';
                const modal = new bootstrap.Modal(document.getElementById('resultModal'));
                modal.show();

                // Можно отправить форму или очистить поля
                // form.submit(); // если нужно отправить
                // form.reset();  // чтобы очистить после успешной отправки
            } else {
                // Отображение сообщения о ошибке
                document.getElementById('modalTitle').textContent = 'Ошибка';
                document.getElementById('modalBody').textContent = 'Пожалуйста, исправьте ошибки в форме.';
                const modal = new bootstrap.Modal(document.getElementById('resultModal'));
                modal.show();
                //  form.submit();
            }
            event.preventDefault();
        });
    }
});
