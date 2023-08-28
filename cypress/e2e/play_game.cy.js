describe('Main menu', () => {
  it('main menu must work correctly', () => {
    cy.viewport(1920, 1080) // Set viewport to 550px x 750px
    cy.visit('http://localhost:8080/', {timeout: 500000});
    cy.contains('AHORCADO - GROUP 4');

    cy.get("#playButton").click();
    cy.contains('SCORE');
  })
})