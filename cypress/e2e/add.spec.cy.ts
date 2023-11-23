// Scenario 1: Valid addition
describe('AppController API Test - Scenarios', () => {
  it('should add two numbers successfully', () => {
    cy.request('GET', 'http://localhost:3000/add/2/3').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('The sum of 2 and 3 is 5');
    });
  });
});

// Scenario 2: Addition with zero
describe('AppController API Test - Scenarios', () => {
  it('should add zero to a number successfully', () => {
    cy.request('GET', 'http://localhost:3000/add/5/0').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('The sum of 5 and 0 is 5');
    });
  });
});

// Scenario 3: Invalid input (non-numeric)
describe('AppController API Test - Scenarios', () => {
  it('should handle invalid input (non-numeric)', () => {
    cy.request('GET', 'http://localhost:3000/add/abc/4').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('The sum of abc and 4 is NaN');
    });
  });
});

// Scenario 4: Addition with numbers
describe('AppController API Test - Scenarios', () => {
  it('should handle addition with negative numbers', () => {
    cy.request('GET', 'http://localhost:3000/add/3/-4').should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('The sum of 3 and -4 is -1');
    });
  });
});
