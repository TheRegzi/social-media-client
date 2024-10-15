describe('Login and logout test', () => {
  beforeEach(() => {
    cy.visit('https://norofffeu.github.io/social-media-client/');

    cy.window().then((win) => {
      const style = win.document.createElement('style');
      style.innerHTML = `
        .modal.fade .modal-dialog {
          transition: none !important;
        }
      `;
      win.document.head.appendChild(style);
    });
  });

  it('should allow a user to log in with valid credentials', () => {
    cy.get('#registerModal').should('be.visible');

    cy.get(
      '#registerModal .modal-footer button.btn-outline-success[data-bs-target="#loginModal"]',
    )
      .should('be.visible')
      .click({ force: true, x: 5, y: 5 });

    cy.window().then((win) => {
      win.document.querySelector('#registerModal').style.display = 'none';
    });

    cy.get('#loginModal').should('be.visible', { force: true });

    cy.get('#loginEmail').type('testuser@stud.noroff.no');
    cy.get('#loginPassword').type('testing123');

    cy.get('#loginForm').submit();

    cy.contains('Logout').should('be.visible');
  });

  it('should not allow a user to log in with invalid credentials and show an alert', () => {
    cy.get('#registerModal').should('be.visible');

    cy.get(
      '#registerModal .modal-footer button.btn-outline-success[data-bs-target="#loginModal"]',
    )
      .should('be.visible')
      .click({ force: true, x: 5, y: 5 });

    cy.window().then((win) => {
      win.document.querySelector('#registerModal').style.display = 'none';
    });

    cy.get('#loginModal').should('be.visible', { force: true });

    cy.get('#loginEmail').type('testuser@stud.noroff.no');
    cy.get('#loginPassword').type('wrongpassword');

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(
        'Either your username was not found or your password is incorrect',
      );
    });

    cy.get('#loginForm').submit();
  });

  it('should allow a user to log in with valid credentials', () => {
    cy.get('#registerModal').should('be.visible');

    cy.get(
      '#registerModal .modal-footer button.btn-outline-success[data-bs-target="#loginModal"]',
    )
      .should('be.visible')
      .click({ force: true, x: 5, y: 5 });

    cy.window().then((win) => {
      win.document.querySelector('#registerModal').style.display = 'none';
    });

    cy.get('#loginModal').should('be.visible', { force: true });

    cy.get('#loginEmail').type('testuser@stud.noroff.no');
    cy.get('#loginPassword').type('testing123');

    cy.get('#loginForm').submit();

    cy.contains('Logout').should('be.visible');

    cy.window().then((win) => {
      const registerModal = win.document.querySelector('#registerModal');
      if (registerModal && registerModal.style.display !== 'none') {
        registerModal.style.display = 'none';
      }
    });

    cy.get('button[data-auth="logout"]')
      .should('be.visible')
      .click({ force: true });

    cy.get('#registerModal').should('be.visible');
  });
});
