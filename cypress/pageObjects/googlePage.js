export class GooglePage {
    
    navigate() {
        cy.visit('https://google.com');
    }

    typeText(keyword,name)
    {     
        cy.getElement(name).type(keyword);
        cy.screenshot();
    }

    assertTitle(title)
    {        
        cy.title().should('include', title);
    }
}