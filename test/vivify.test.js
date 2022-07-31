'use strict';

const { Builder, By, until, Key } = require('selenium-webdriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();
const chrome = require('selenium-webdriver/chrome');
const { title } = require('process');

describe('vivifyTest', function() {
    let driver;

    const fillFirstName = 'Johan';
    const fillLastName = 'Smith';
    const fillEmail = 'johansmith@local.hhh';
    const fillPassword = 'johansmith15';
    const fillConfirmedPassword = 'johansmith15';

    before(async function() {
        let service = new chrome.ServiceBuilder('chromedriver.exe').build();
        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(function() {
        return driver.quit();
    });

it("Opens homepage", async function() {
    await driver.get('https://gallery-app.vivifyideas.com/');
    
    expect(await driver.getCurrentUrl()).to.eq('https://gallery-app.vivifyideas.com/');
});


});