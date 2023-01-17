describe('Gato escondido', () => {
  it('Encontrar o gato', () => {
    cy.visit('./src/index.html')
    cy.get('#cat').invoke('show').should('be.visible')
  })
})