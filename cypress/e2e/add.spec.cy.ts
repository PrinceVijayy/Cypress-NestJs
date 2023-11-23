describe('MathController API Test', () => {
  it('should add two numbers via API', () => {
    cy.request('GET', 'http://localhost:3000/add/2/3').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('The sum of 2 and 3 is 5');
    });
  });
});
