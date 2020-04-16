// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
//Cypress.on('fail', (error, runnable) => {
  //throw false // throw error to have test still fail
//})


//Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  //return false
//})

import addContext from 'mochawesome/addContext'
const fs = require('fs');

Cypress.on('test:after:run', (test, runnable) => {
      let item = runnable;
      const nameParts = [runnable.title];
  
      // Iterate through all parents and grab the titles
      while (item.parent) {
        nameParts.unshift(item.parent.title);
        item = item.parent
      }
  
      const MAX_SPEC_NAME_LENGTH = 220;
      const fullTestName = nameParts
            .filter(Boolean)
            .join(" -- ") 
            .slice(0, MAX_SPEC_NAME_LENGTH); // this is how cypress joins the test title fragments

    const imageUrl = '../../screenshots/' + Cypress.spec.name + '/' + fullTestName + ' (failed).png';
    //else
        //imageUrl = 'screenshots/' + Cypress.spec.name + '/' + fullTestName + '.png'

        try {
          if (fs.existsSync(imageUrl)) {
            addContext({ test }, imageUrl)
          }
        } catch(err) {
        }
  
  });