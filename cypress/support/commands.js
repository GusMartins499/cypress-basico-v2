Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Gustavo')
  cy.get('#lastName').type('Martins')
  cy.get('#email').type('gustavosm994@gmail.com')
  cy.get('#open-text-area').type('Lorem ipsum dolor sit amet consectetur adipisicing elit')
  cy.get('button.button[type="submit"]').click()
})