describe('App Component', () => {
  it('displays loading spinner while fetching available tokens', () => {
    cy.visit('/');
    cy.get('[data-testid="spinner"]').should('be.visible');
    cy.wait(1000);
    cy.get('[data-testid="spinner"]').should('not.exist');
  });
  it('Fetches data from the API and shows at least one list item', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.get('[data-testid="token-li-1"]').should('be.visible');
  });
});