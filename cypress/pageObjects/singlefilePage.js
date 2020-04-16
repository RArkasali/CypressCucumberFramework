require('cypress-xpath');
let gEnv, name;

export class SingleFilePage {
    
    navigate(env) {
        cy.log('Single');
        cy.getUrlSingle(env).then((url) => {    
            cy.visit(url);
            cy.wait(5000);
        });
        gEnv = env
    }

    loginbyEnv(nick)
    {     
        cy.log('Single');
        cy.getDataSingle(gEnv, nick).then((json) => {    
            if (gEnv === 'staging')
            {
                cy.getElement('txtUser').type(json.user);
                cy.getElement('txtPass').type(json.pass);
                name = json.user
            }
            else
            {
                cy.getElement('prod_txtUser').type(json.user);
                cy.getElement('prod_txtPass').type(json.pass);
            }
        });
        cy.wait(3000);
        //cy.screenshot()
        if (gEnv === 'staging')
        {
            cy.getElement('btnLogin').click();
            //cy.wait(8000)
            //cy.getElement('btnNotNow').click()
        }
        else
            cy.getElement('prod_btnLogin').click();

        cy.wait(10000);
        //cy.screenshot()
    }
    
    logout()
    {     
        cy.log('Single');
        if (gEnv === 'staging')
        {
            cy.xpath('//a[text()="'+ name + '"]').click();
            cy.wait(3000);
            cy.getElement('svgOption').click();
            cy.wait(3000);
            cy.getElement('btnLogout').click();
        }
        else
        {            
            cy.getElement('prod_mnuLogout').click();
            cy.getElement('prod_btnLogout').click();
        }
        cy.wait(3000);
        //cy.screenshot()
    }

    assertElement()
    {        
        cy.log('Single');
        if (gEnv === 'staging')
            cy.getElement('lblMsg').should('exist');
        else
            cy.getElement('prod_lblMsg').should('exist');
    }
}