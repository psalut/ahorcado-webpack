describe('Main Menu', () => {
  context('Given I access the game page', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080) // Set viewport to 550px x 750px
      cy.visit('https://ahorcado-webpack.vercel.app/')
    })

    context('When I click on the score button', () => {
      beforeEach(() => {
        cy.get("#scoreButton").click();
      })

      it('Then I see the score title and a list of scores', () => {
        cy.contains('SCORE');
      })
    })

    context('When I click on the about us button', () => {
      beforeEach(() => {
        cy.get("#aboutUsButton").click();
      })

      it('Then I see the the authors of the game', () => {
        cy.contains('GROUP MEMBERS');
      })
    })

    context('When I click on the play button', () => {
      beforeEach(() => {
        cy.get("#playButton").click();
      })

      it('Then I see the field to type my name', () => {
        cy.get("#login");
      })
    })
  })
})