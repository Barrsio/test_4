describe('Skype Login Test', () => {
    beforeEach(() => {
        // Устанавливаем разрешение экрана для настольного устройства
        cy.viewport(1280, 720);

        // Посещаем главную страницу Skype
        cy.visit('https://www.skype.com/ru/');

        // Находим и нажимаем кнопку "Открыть Skype в браузере"
        cy.get('a[data-bi-name="open-skype-in-browser-main-page"]')
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });

        // Ожидаем переход на страницу логина
        cy.url().should('include', 'login.live.com');

        // Игнорируем неожиданные ошибки JavaScript, которые не влияют на тест
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        // Используем cy.origin для выполнения действий на домене login.live.com
        cy.origin('https://login.live.com', () => {
            const email = 'msbychkovv@gmail.com';
            const password = 'Mm147258_-';

            // Вводим email и переходим к следующему шагу
            cy.get('#i0116').should('be.visible').type(email);
            cy.get('#idSIButton9').should('be.visible').click();

            // Вводим пароль и отправляем форму
            cy.get('#i0118').should('be.visible').type(password);
            cy.get('#idSIButton9').should('be.visible').click();

            // Возможный запрос на сохранение данных
            cy.get('#idBtn_Back').then(($btn) => {
                if ($btn.is(':visible')) {
                    cy.get('#idBtn_Back').click();
                }
            });
        });
    });

    it('Проверка успешного входа в Skype', () => {
        const expectedUsername = 'ваше_имя_пользователя'; // Замените на реальное имя пользователя

        // Ожидаем загрузку страницы Skype и проверяем имя пользователя в верхней панели
        cy.url().should('include', 'web.skype.com');
        cy.get('#status_bar .top-widgets b').first().should('have.text', expectedUsername);
    });
});