describe('The NavBar', function() {
  it('Can Visit the index page ', function() {
    cy.visit('http://localhost:3000/')
  })

  it('Has healthera logo', function() {
    cy.visit('http://localhost:3000/')
    cy.get('nav')
      .get('.navbar-brand')
        .find('img')
          .should('be.visible')
  })

  it('Can redirect to heathera mainpage from logo', function() {
    cy.visit('http://localhost:3000/')

    cy.get('nav')
      .get('.navbar-brand')
          .should('have', 'href="https://healthera.co.uk/"')
  })

  it('Has healthera name', function() {
    cy.visit('http://localhost:3000/')
    cy.get('nav')
      .get('.navbar-brand')
          .should('contain', 'Healthera Jokes')
  })

  it('Redirects to main page from Name', function() {
    cy.visit('http://localhost:3000/')
    cy.get('nav')
      .get('.navbar-brand')
        .next('.navbar-brand')
          .click()
    cy.location('pathname').should('eq', '/')
  })

  it('Has link to joke lists', function() {
    cy.visit('http://localhost:3000/')
    cy.get('nav')
      .get('.nav-link')
        .should('contain', 'Jokes List')
  })

  it('Redirects to Joke List', function() {
    cy.visit('http://localhost:3000/')
    cy.get('nav')
      .get('.nav-link')
        .first('.nav-link')
          .click()
    cy.location('pathname').should('eq', '/jokesList')
  })
})
