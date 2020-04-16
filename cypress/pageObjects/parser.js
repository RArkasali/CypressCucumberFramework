require('cypress-xpath');
const directoryPath = "../repositories/";
class Parser {        
    
    constructor()
    {
        const dir = __dirname;
    }
    getElement(name,keyword)
    {   
        cy.fixture('elements').then((elements)  => {       
            (async () => {
                const selected = elements.find(o => o.name === name);
                cy.xpath(selected.xpath).type(keyword);
                return selected.xpath
            })()     
            /*cy.xpath(selected.xpath).then((ele) => {
                debugger
                return ele
            })*/
            
        }) 
    }
}

export const parser = new Parser();