Cypress.Commands.add('PreencherCamposObrigatoriosESubmeter', () => {
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('José')
    cy.get('#email').type('paulojose@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
  })
  