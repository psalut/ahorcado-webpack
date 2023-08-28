describe('Main menu', () => {
  it('main menu must work correctly', () => {
    cy.viewport(1920, 1080) // Set viewport to 550px x 750px
    cy.visit('https://ahorcado-webpack.vercel.app/', {timeout: 500000});
    cy.contains('AHORCADO - GROUP 4');

    cy.get("#scoreButton").click();
    cy.contains('SCORE');

    cy.get("#backFromScore").click();
    cy.contains('AHORCADO - GROUP 4');

    cy.get("#aboutUsButton").click();
    cy.contains('GROUP MEMBERS');

    cy.get("#backFromAboutUs").click();
    cy.contains('AHORCADO - GROUP 4');
  })
})