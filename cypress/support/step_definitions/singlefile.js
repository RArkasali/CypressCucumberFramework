import { Given } from "cypress-cucumber-preprocessor/steps";
import {SingleFilePage} from '../../pageObjects/singlefilePage'

require('cypress-xpath')

const sPage = new SingleFilePage()
Given('I open {string} page', (environment) => {
  sPage.navigate(environment)
})


And('I login by {string} of account', (nick) => {
  sPage.loginbyEnv(nick)
})

Given('Logout', () => {
  sPage.logout()
})


Then('I see login page', () => {
  sPage.assertElement()
})