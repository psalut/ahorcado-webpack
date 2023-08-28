describe('Main menu', () => {
  it('frontpage can be opened', () => {
    cy.viewport(1920, 1080) // Set viewport to 550px x 750px
    cy.visit('https://ahorcado-webpack.vercel.app/', {timeout: 500000});
    cy.contains('AHORCADO - GROUP 4');
  })
})