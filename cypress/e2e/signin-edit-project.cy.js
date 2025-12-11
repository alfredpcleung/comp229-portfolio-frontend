describe('Sign In and Edit Project', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should sign in and edit an existing project', () => {
    // Navigate to login page
    cy.contains('Sign In').click();
    
    // Verify we're on the login page
    cy.url().should('include', '/login');
    
    // Fill in the login form
    cy.get('input[name="email"]').type('testuser1765485549462@example.com');
    cy.get('input[name="password"]').type('TestPassword123');
    
    // Submit the form
    cy.contains('button', 'Sign In').click();
    
    // Wait for redirect and navigate to projects
    cy.url().should('include', '/contacts');
    cy.contains('a', 'Projects').click();
    cy.url().should('include', '/projects');
    
    // Create a project to edit
    cy.contains('button', 'New Project').click();
    cy.url().should('include', '/projects/new');
    
    const projectName = `Project to Edit ${Date.now()}`;
    cy.get('input[name="title"]').type(projectName);
    cy.get('textarea[name="description"]').type('Original description for editing');
    cy.get('input[name="completion"]').type('2025-12-31');
    cy.contains('button', 'Create Project').click();
    
    // Wait for redirect back to projects list
    cy.wait(1000);
    cy.url().should('include', '/projects');
    
    // Now find and edit the project we just created
    cy.contains('td', projectName).parent().within(() => {
      cy.contains('button', 'Edit').click();
    });
    cy.url().should('include', '/projects/');
    
    // Verify we're on the edit page
    cy.contains('Edit Project').should('be.visible');
    
    // Update the project details
    const timestamp = Date.now();
    cy.get('input[name="title"]').first()
      .clear()
      .type(`Updated Project ${timestamp}`);
    
    cy.get('textarea[name="description"]').first()
      .clear()
      .type('This project was updated via Cypress automation');
    
    // Submit the form
    cy.contains('button', 'Update Project').click();
    
    // Wait for the redirect back to projects list
    cy.url().should('include', '/projects', { timeout: 5000 });
    cy.wait(1500);
    
    // Check that we're back on the projects list page
    cy.contains('h2', 'Projects').should('be.visible');
  });
});
