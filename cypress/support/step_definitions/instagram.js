import { Given } from "cypress-cucumber-preprocessor/steps";
import {InstagramPage} from '../../pageObjects/instagramPage'

require('cypress-xpath')

const iPage = new InstagramPage()
Given('I open Instagram page', () => {
  iPage.navigate()
})


And('Login by {string}', (nick) => {
  iPage.login(nick)
})


Then('I see {string} image', (name) => {
  iPage.assertElement(name)
})


Given('Click logout button', () => {
  iPage.logout()
})


Then('I see {string} text', (name) => {
  iPage.assertElement(name)
})