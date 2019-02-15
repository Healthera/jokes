describe('The Edit Joke', function() {
  it('Can Visit the index page ', function() {
    cy.visit('http://localhost:3000/edit/5c659a12db0a20f8bf808857')
  })

  it('Has Nav Bar', function() {
    cy.visit('http://localhost:3000/edit/5c659a12db0a20f8bf808857')
    cy.get('nav')
      .get('.navbar-brand')
  })

  it('Has Create New Joke', function() {
    cy.visit('http://localhost:3000/edit/5c659a12db0a20f8bf808857')
    cy.get('div h3').should('contain', 'Edit Joke')
  })

  it('Has Jokes and PunchLine th', function() {
    cy.visit('http://localhost:3000/edit/5c659a12db0a20f8bf808857')
      cy.get('.form-group')
        .should('contain', 'Joke:')
        .should('contain', 'Punch Line:')
  })

  it('Has a submit button', function() {
    cy.visit('http://localhost:3000/edit/5c659a12db0a20f8bf808857')
    cy.get('.btn').should('contain', 'Create Joke')
  })

})
