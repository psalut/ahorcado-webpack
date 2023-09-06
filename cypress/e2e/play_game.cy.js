describe('Start to play the game', () => {
  context('Given I access to the game option', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080) // Set viewport to 550px x 750px
      cy.visit('https://ahorcado-webpack.vercel.app/')
      cy.get("#playButton").click();
    })

    context('When I type my name and click ingresar', () => {
      beforeEach(() => {
        cy.get("#login").type("Nombre");
        cy.get(".swal2-confirm").click();
      })

      it('Then I can start to play the game', () => {
        cy.get("#canvas")
      })
    })
  })
})


describe('Play the game', () => {
  context('Given I typed my name in the field and I logged in', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080) // Set viewport to 550px x 750px
      cy.visit('https://ahorcado-webpack.vercel.app/')
      cy.get("#playButton").click();
      cy.get("#login").type("Nombre");
      cy.get(".swal2-confirm").click();
    })

    context('When I type two letters in the field and click adivinar', () => {
      beforeEach(() => {
        cy.get("#guess-input").type("AA");
        cy.get('#guess-button').click()
      })

      it('Then it should give an error message', () => {
        cy.get('.swal2-container');
        cy.get('.swal2-title').contains('Ingrese solo una letra.');
      })
    })

    context('When I type a number or special character in the field and click adivinar', () => {
      beforeEach(() => {
        cy.get("#guess-input").type("3");
        cy.get('#guess-button').click()
      })

      it('Then it should give an error message', () => {
        cy.get('.swal2-container');
        cy.get('.swal2-title').contains('Ingrese una letra válida.');
      })
    })
  })
})