describe('example to-do app', () => {
    let generatedUrl;

    beforeEach(() => {
        cy.visit('https://plainproxies.com/resources/free-web-proxy');
        const youtube = 'https://www.youtube.com';
        cy.get('[class=form-control]').type(`${youtube}{enter}`);

        Cypress.on('uncaught:exception', (err, runnable) => {
            // предотвращает падение теста на uncaught exception
            return false;
        });

        // Перехватываем запрос и пытаемся получить URL с редиректом
        cy.wait(30000).then(() => {
            cy.location('href').then((url) => {
                if (url.includes('azureserv.com')) {
                    generatedUrl = url;
                }
            });
        });
    });

    it('Это YouTube?', () => {
        if (generatedUrl) {
            const domain = new URL(generatedUrl).origin; // Получаем домен из URL
            cy.origin(domain, () => {
                cy.visit(generatedUrl); // Переход по сгенерированному URL
                cy.get('[class=yt-spec-touch-feedback-shape__fill]').click();
                cy.get('[id=youtube-paths_yt6]').get('path').should('have.attr', 'd');
            });
        } else {
            throw new Error("Не удалось получить правильный URL для перехода.");
        }
    });
});