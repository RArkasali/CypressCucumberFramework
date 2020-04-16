import { Given } from "cypress-cucumber-preprocessor/steps";
import {MultiFilePage} from '../../pageObjects/multifilePage'

require('cypress-xpath')

const mPage = new MultiFilePage()
Given('I open {string} page', (environment) => {
  mPage.navigate(environment)
})


And('I login by {string} of account', (nick) => {
  mPage.loginbyEnv(nick)
})

Given('Logout', () => {
  mPage.logout()
})


Then('I see login page', () => {
  mPage.assertElement()
})