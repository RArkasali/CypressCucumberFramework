// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
require('cypress-xpath');

// Get element
Cypress.Commands.add('getElement', (name) => { 
    cy.fixture('elements').then((json) => {
        const item = json.find(o => o.name === name);
        const ele = cy.xpath(item.xpath);
        return ele
    })
});

// Single file
Cypress.Commands.add('getUrlSingle', (env) => { 
    cy.fixture('all').then((json) => {
        if (env === 'staging')
            return json[0].staging.url;
        else
            return json[1].production.url
    })
});

Cypress.Commands.add('getDataSingle', (env, nick) => { 
    cy.fixture('all').then((json) => {
        let item;
        if (env === 'staging')
            item = json[0].staging.accounts.find(o=>o.nick === nick);
        else
            item = json[1].production.accounts.find(o=>o.nick === nick);
        item.user = Decrypt(item.user);
        item.pass = Decrypt(item.pass);
        return item
    })
});


//Multi file
Cypress.Commands.add('getUrlMulti', (env) => { 
    if (env === 'staging')
        cy.fixture('staging').then((json) => {
            return json.url
        });
    else
        cy.fixture('production').then((json) => {
        return json.url
        })
});

Cypress.Commands.add('getDataMulti', (env,nick) => { 
    if (env === 'staging')
        cy.fixture('staging').then((json) => {
            const item = json.accounts.find(o => o.nick === nick);
            item.user = Decrypt(item.user);
            item.pass = Decrypt(item.pass);
            return item
        });
    else
        cy.fixture('production').then((json) => {
            const item = json.accounts.find(o => o.nick === nick);
            item.user = Decrypt(item.user);
            item.pass = Decrypt(item.pass);
            return item
        })
});


// One file
Cypress.Commands.add('getData', (nick) => { 
    cy.fixture('data').then((json) => {
        const item = json.accounts.find(o => o.nick === nick);
        item.user = Decrypt(item.user);
        item.pass = Decrypt(item.pass);
        return item
    })
});

//Decrypt
const crypto = require('crypto');
const ENCRYPTION_KEY = 'abcdef1234567890abcdef1234567890'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

/**
 * @return {string}
 */
function Decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
   
    decrypted = Buffer.concat([decrypted, decipher.final()]);
   
    return decrypted.toString();
   }
