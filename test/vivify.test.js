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

it("Click on register and register a new user, than confirm and logout", async function() {
    const register = await driver.findElement(By.partialLinkText('Register'));
    await register.click();
    
    expect(await driver.getCurrentUrl()).to.eq('https://gallery-app.vivifyideas.com/register');
    expect(await driver.findElement(By.css('h1')).getText()).to.eq('REGISTER');
    
    const firstName = await driver.findElement(By.id('first-name'));
    firstName.sendKeys(fillFirstName);

    const lastName = await driver.findElement(By.id('last-name'));
    lastName.sendKeys(fillLastName);

    const email = await driver.findElement(By.id('email'));
    email.sendKeys(fillEmail);

    const password = await driver.findElement(By.id('password'));
    password.sendKeys(fillPassword);

    const confirmedPassword = await driver.findElement(By.id('password-confirmation'));
    confirmedPassword.sendKeys(fillConfirmedPassword);

    const acceptedTerms = await driver.findElement(By.className('form-check-input'));
    await acceptedTerms.click();

    const submitButton = await driver.findElement(By.xpath(`//button`));
    await submitButton.click();
    await driver.sleep(1000);

    const displayAllGalleries = await driver.findElement(By.linkText('My Galleries'));
    await driver.wait(until.elementIsEnabled(displayAllGalleries));
    expect(await displayAllGalleries.isEnabled()).to.be.true;

    const logoutNewUser = await driver.findElement(By.partialLinkText('Logout'));
    await logoutNewUser.click();
    
    expect(await driver.findElement(By.css('h1')).getText()).to.eq('PLEASE LOGIN');
});

it("Login new user", async function() {
    const logoutNewUser = await driver.findElement(By.partialLinkText('Login'));
    await logoutNewUser.click();

    const email = await driver.findElement(By.id('email'));
    email.sendKeys(fillEmail);

    const password = await driver.findElement(By.id('password'));
    password.sendKeys(fillPassword);

    const submitButton = await driver.findElement(By.xpath(`//button`));
    await submitButton.click();
    await driver.sleep(1000);

    const allGalleries = await driver.findElement(By.linkText('My Galleries'));
    await driver.wait(until.elementIsEnabled(allGalleries));
    expect(await allGalleries.isEnabled()).to.be.true;
});

it("Create Gallery", async function() {
    const createGallery = await driver.findElement(By.xpath(`//a[contains(text(),'Create Gallery')]`));
    await createGallery.click();

    expect(await driver.findElement(By.css('h1')).getText()).to.eq('CREATE GALLERY');

    const title = await driver.findElement(By.id('title'));
    title.sendKeys('The Lord of the Rings 2');

    const descriptions = await driver.findElement(By.id('description'));
    descriptions.sendKeys('War of the Ring');
     
    const imageURL = await driver.findElement(By.xpath(`//div[@class='input-group mb-3']/input[@class='form-control']`));
    imageURL.sendKeys('https://www.advertiser-serbia.com/advertiser/wp-content/uploads/2021/02/lord-of-the-rings.jpg');

    const submitButton = await driver.findElement(By.xpath(`//button[contains(text(),'Submit')]`));
    await submitButton.click();
    await driver.sleep(1000);

    expect(await driver.findElement(By.css('h1')).getText()).to.eq('ALL GALLERIES');
    expect(await driver.findElement(By.css('h2')).getText()).to.eq('The Lord of the Rings 2');

});

});