describe('The Create Joke', function() {
  it('Can Visit the index page ', function() {
    cy.visit('http://localhost:3000/create')
  })

  it('Has Nav Bar', function() {
    cy.visit('http://localhost:3000/create')
    cy.get('nav')
      .get('.navbar-brand')
  })

  it('Has Create New Joke', function() {
    cy.visit('http://localhost:3000/create')
    cy.get('div h3').should('contain', 'Create New Joke')
  })
})
