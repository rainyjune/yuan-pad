/// <reference types="Cypress" />

describe('My First Test', () => {
  const timestamp = Date.now();

  it('Login with wrong username and/or password', () => {
    cy.visit('http://localhost:8000');

    cy.get('.signIn a[role="button"]').click();

    cy.get('#inputUsername').type('rainyjune');
    cy.get('#inputPassword').type('rainyjune');
    cy.get('.ReactModalPortal button[type="submit"]').click();
    cy.get('.ReactModalPortal p').should(($p) => {
      expect($p).to.have.length(1);
      expect($p[0]).to.contain('Invalid username or password!');
    });
  });
  it('Register', () => {
    cy.visit('http://localhost:8000');

    cy.get('.signUp a[role="button"]').click();

    cy.get('#inputUser').type(`user${timestamp}`);
    cy.get('#inputPassword').type(`pass${timestamp}`);
    cy.get('#inputEmail').type(`usr${timestamp}@example.com`);
    cy.get('.ReactModalPortal button[type="submit"]').click();
    cy.get('.updateUser a[role="button"]').should(($node) => {
      expect($node).to.have.length(1);
      expect($node[0]).to.contain('Update');
    });
    cy.get('a.signOutButton').should(($node) => {
      expect($node).to.have.length(1);
      expect($node[0]).to.contain('Logout');
    });
    cy.get('form.commentForm')
      .find('span')
      .should(($node) => {
        expect($node[1]).to.contain(`user${timestamp}`);
      });
  });

  it('Login with correct username/password', () => {
    cy.visit('http://localhost:8000');

    cy.get('.signIn a[role="button"]').click();

    cy.get('#inputUsername').type(`user${timestamp}`);
    cy.get('#inputPassword').type(`pass${timestamp}`);
    cy.get('.ReactModalPortal button[type="submit"]').click();
    cy.get('.ReactModalPortal p').should(($p) => {
      expect($p).to.have.length(0);
    });
    cy.get('.updateUser a[role="button"]').should(($node) => {
      expect($node).to.have.length(1);
      expect($node[0]).to.contain('Update');
    });
    cy.get('a.signOutButton').should(($node) => {
      expect($node).to.have.length(1);
      expect($node[0]).to.contain('Logout');
    });
    cy.get('form.commentForm')
      .find('span')
      .should(($node) => {
        expect($node[1]).to.contain(`user${timestamp}`);
      });
  });

  it('Post a comment', () => {
    cy.visit('http://localhost:8000');

    cy.get('.signIn a[role="button"]').click();

    cy.get('#inputUsername').type(`user${timestamp}`);
    cy.get('#inputPassword').type(`pass${timestamp}`);
    cy.get('.ReactModalPortal button[type="submit"]').click();
    cy.get('#inputContent').type(`content${timestamp}`);
    cy.get('form.commentForm button[type="submit"]').click();
    cy.get('.commentList').contains(`content${timestamp}`);
  });
});
