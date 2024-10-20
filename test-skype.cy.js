describe('example to-do app', () =>{
    beforeEach(() =>{
        cy.visit('https://www.skype.com/ru/')
        cy.get('.btn.primaryCta').first().click({ force: true });
        cy.wait(10000)
        const email = 'msbychkovv@gmail.com'
        const password = 'Mm147258_-'
        
        cy.get('[placeholder="E-mail"]').type(`${email}`)
        cy.get('[placeholder="Пароль"]').type(`${password}{enter}`)
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
    })
    it('Это Skype?', () =>{


        cy.get('[id=status_bar]').get('[class=top-widgets]').get('b').first().should('have.text', username)
    })
})
