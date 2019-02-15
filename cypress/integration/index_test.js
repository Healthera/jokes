describe('The Index', function() {
  it('Can Visit the index page ', function() {
    cy.visit('http://localhost:3000/')
  })

  it('Has Nav Bar', function() {
    cy.visit('http://localhost:3000/')
    cy.get('nav')
      .get('.navbar-brand')
  })

  it('Has Create New Joke', function() {
    cy.visit('http://localhost:3000/')
    cy.get('div h3').should('contain', 'You Want Some Jokes?')
  })

  it('Has two buttons', function() {
    cy.visit('http://localhost:3000/')
    cy.get('.btn')
      .should('contain', 'Get More Here')
  })

})
