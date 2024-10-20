describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('https://disto.mveu.ru');
        const email = 'msbychkovv@gmail.com';
        const password = 'Mm147258';
        
        cy.get('[placeholder="E-mail"]').type(`${email}`);
        cy.get('[placeholder="Пароль"]').type(`${password}{enter}`);
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    it('Это МВЕУ?', () => {
        const username = 'Бычков Михаил Сергеевич';
        cy.get('[id=status_bar]').get('[class=top-widgets]').get('b').first().should('have.text', username);
    });

    it('Проверка, все ли материалы по математике на месте.', () => {
        cy.get('[title="Дисциплины"]').first().click({ force: true });
        cy.get('a[href="/elms/semestr3"]').click({ force: true });
        cy.get('div[id=1708]').click({ force: true });

        // Проверка наличия всех 9 лекций
        const lectures_vish_mat = [
            'Лекция 1. Матрицы. Действия с матрицами',
            'Лекция 2. Определители',
            'Лекция 3. Нахождение обратной матрицы',
            'Лекция 4. Системы линейных уравнений',
            'Лекция 5. Прямая линия на плоскости',
            'Лекция 6. Кривые второго порядка',
            'Лекция 7. Комплексные числа',
            'Лекция 8. Предел функции',
            'Лекция 9. Непрерывность функции и ее разрывы'
        ];

        lectures_vish_mat.forEach(lecture => {
            cy.contains('div.elms_dir_inner', lecture).should('be.visible');
        });

        cy.get('[title="Дисциплины"]').first().click({ force: true });
        cy.get('a[href="/elms/semestr4"]').click({ force: true });
        cy.get('div[id=2947]').click({ force: true });

        // Проверка наличия онлайн-курса
        cy.get('div.elms_dir_inner').should('be.visible');
    });
});