describe('The Jokes List', function() {
  it('Can Visit the index page ', function() {
    cy.visit('http://localhost:3000/jokesList')
  })

  it('Has Nav Bar', function() {
    cy.visit('http://localhost:3000/jokesList')
    cy.get('nav')
      .get('.navbar-brand')
  })

  it('Has Create New Joke', function() {
    cy.visit('http://localhost:3000/jokesList')
    cy.get('div h3').should('contain', 'Jokes List')
  })

  it('Has Jokes and PunchLine th', function() {
    cy.visit('http://localhost:3000/jokesList')
      cy.get('td')
        .first('td')
          .should('contain', `Why'd the angular dev get ran over by a car?`)
        .next('td')
          .should('contain', `He couldn't React fast enough`)
        .next('td')
          .should('contain', 'Edit')
        .next('td')
          .should('contain', 'Delete')
  })

})
