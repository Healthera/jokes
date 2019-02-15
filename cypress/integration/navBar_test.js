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
})
