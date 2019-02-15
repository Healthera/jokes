describe('The Delete Joke', function() {
  it('Can Visit the index page ', function() {
    cy.visit('http://localhost:3000/delete/5c659a12db0a20f8bf808857')
  })

  it('Has Nav Bar', function() {
    cy.visit('http://localhost:3000/delete/5c659a12db0a20f8bf808857')
    cy.get('nav')
      .get('.navbar-brand')
  })

  it('Has Create New Joke', function() {
    cy.visit('http://localhost:3000/delete/5c659a12db0a20f8bf808857')
    cy.get('div h3').should('contain', 'You Sure You Want To Delete?')
  })

  it('Has two buttons', function() {
    cy.visit('http://localhost:3000/delete/5c659a12db0a20f8bf808857')
    cy.get('.btn')
      .should('contain', 'YES PLEASE!!!')
      .should('contain', `Yeah Naw She'll Be Right`)
  })

})
