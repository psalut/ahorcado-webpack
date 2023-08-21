describe('Main menu', () => {
  it('frontpage can be opened', () => {
    cy.visit('http://localhost:8080/', {timeout: 500000});
    cy.contains('AHORCADO - GROUP 4');
  })
})