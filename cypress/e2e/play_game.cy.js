describe('Main menu', () => {
  it('main menu must work correctly', () => {
    cy.viewport(1920, 1080) // Set viewport to 550px x 750px
    cy.visit('http://localhost:8080/', {timeout: 500000});
    cy.contains('AHORCADO - GROUP 4');

    cy.get("#playButton").click();
    cy.get("#login").type("NombreGenerico");

    cy.get(".swal2-confirm").click();

    cy.get("#guess-input").type("a");
    cy.get("#guess-button").click();
  })
})