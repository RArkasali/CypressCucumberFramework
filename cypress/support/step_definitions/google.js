import { Given } from "cypress-cucumber-preprocessor/steps";
import {GooglePage} from '../../pageObjects/googlePage'

require('cypress-xpath')

const gPage = new GooglePage()
Given('I open Google page', () => {
  //parser.readFile()
  gPage.navigate()
})


And('Type {string} to {string} textbox', (keyword,name) => {
  var text = ''
  cy.getData(keyword).then((json) => {    
    text = json.user + '/' + json.pass
    gPage.typeText(text,name)
  })
})

Then('I see {string} in the title', (title) => {
  gPage.assertTitle(title)
})