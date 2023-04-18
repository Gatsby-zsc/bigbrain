describe('admin happy path-2', () => {
  it('should navigate to home screen successfully', () => {
    window.cy.visit('http://localhost:3001/')
    cy.url().should('include', 'http://localhost:3001');
  });

  it('should navigate to the sign up screen successfully', () => {
    cy.get('button[name="sign-up-button"]')
      .click()
    cy.url().should('include', 'http://localhost:3001/signup');
  });

  it('should sign up successfully', () => {
    cy.get('input[name="name"]')
      .focus()
      .type('testNameSample2');
    cy.get('input[name="email"]')
      .focus()
      .type('testEmailSample2@email.com');
    cy.get('input[name="password"]')
      .focus()
      .type('testPasswordSample2');
    cy.get('button[name="sign-up-submit-btn"]')
      .click();
    cy.url().should('include', 'http://localhost:3001/homepage');
  });

  it('should navigate to the dashboard screen successfully', () => {
    cy.get('button[name="dashboard-btn"]')
      .click();
    cy.url().should('include', 'http://localhost:3001/homepage/dashboard');
  });

  it('should create a new game successfully', () => {
    cy.get('button[name="create-new-game-btn"]')
      .click();
    cy.get('input[name="new-game-title"]')
      .focus()
      .type('testGameTitle');
    cy.get('button[name="more-info-btn"]')
      .click();
    cy.get('button[name="add-question-btn"]')
      .click();
    cy.get('button[name="submit-new-create-btn"]')
      .click();
  });

  it('should edit a quiz successfully', () => {
    cy.get('button[name="edit-quiz-btn"]')
      .click();
    cy.url().should('include', 'http://localhost:3001/homepage/dashboard/');
    cy.get('button[name="more-question"]')
      .click();
    cy.get('button[name="update"]')
      .click();
  });

  it('should start a game successfully', () => {
    cy.get('button[name="start-game-btn"]')
      .click();
    cy.get('button[name="close-copyurl-btn"]')
      .click();
  })

  it('should end a game successfully', () => {
    cy.get('button[name="stop-game-btn"]')
      .click();
  })

  it('should loads the results page successfully', () => {
    cy.get('button[name="show-result-btn"]')
      .click();
    cy.url().should('include', 'http://localhost:3001/ongoing/');
  })

  it('should navigate to the question history screen successfully', () => {
    cy.get('button[name="exit-control-btn"]')
      .click();
    cy.url().should('include', 'http://localhost:3001/homepage/dashboard');
    cy.get('button[name="history"]')
      .click();
    cy.url().should('include', 'http://localhost:3001/homepage/dashboard/history');
  });

  it('should delete the existed game successfully', () => {
    cy.get('button[name="dashboard-btn"]')
      .click();
    cy.get('button[name="delete"]')
      .click();
  });

  it('should log out successfully', () => {
    cy.get('button[name="logout-btn"]')
      .click();
    cy.url().should('include', 'http://localhost:3001/')
  });

  it('should relogin successfully', () => {
    cy.get('input[name="email"]')
      .focus()
      .type('testEmailSample2@email.com');
    cy.get('input[name="password"]')
      .focus()
      .type('testPasswordSample2');
    cy.get('button[name="sign-in-btn"]')
      .click();
    cy.url().should('include', 'http://localhost:3001/homepage');
  });
})
