export class InstagramPage {
    
    navigate() {
        cy.visit('https://www.instagram.com/');
        cy.wait(5000);
    }

    login(nick)
    {     
        cy.getData(nick).then((json) => {    
            cy.getElement('txtUser').type(json.user);
            cy.getElement('txtPass').type(json.pass);
        });
        cy.wait(3000);
        cy.screenshot();
        cy.getElement('btnLogin').click();
        cy.screenshot();
        cy.wait(15000);
    }
    
    logout()
    {     
        cy.getElement('btnLogout').click();
        cy.wait(3000);
        cy.screenshot();
    }

    assertElement(name)
    {        
        cy.getElement(name).should('exist');
    }
}