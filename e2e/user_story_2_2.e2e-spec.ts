import {OwnersPage} from "./owners.po";
import {browser, ExpectedConditions} from "protractor";
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';

describe('user story 2_2 create visit with vet', () => {
  let pageOwners: OwnersPage;
  browser.ignoreSynchronization = true;

  beforeEach(() => {
    pageOwners = new OwnersPage();
    
  });


  it('should be able to reach owner page', done => {
    pageOwners.navigateToOwnersOverview();
    expect(pageOwners.getHeading()).toEqual('Owners')
      .then(done, done.fail);
  });

  it('should have owners url', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl +"petclinic/owners");
  });

  it('table should contain George Franklin', done => {
    expect(pageOwners.getOwnersTableContent()).toContain('George Franklin')
      .then(done, done.fail);
  });

  it('should navigate to edit owner Betty Davis', done => {
    pageOwners.getOwnerLink('Betty Davis').click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl +"petclinic/owners/2")
      .then(done, done.fail);
  });

  it('should navigate to add visit page for pet', done => {
    pageOwners.getAddVisitButton().click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl +"petclinic/pets/2/visits/add")
      .then(done, done.fail);
  });


  it('should', done => {

    pageOwners.getDateInput().sendKeys('2021/01/10');
    pageOwners.getDescriptionInput().sendKeys('vaccination');
    pageOwners.getVetSelectOption().click();
    pageOwners.getAddVisitButton().click().then(function () {
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl +"petclinic/owners/2")
        .then(done, done.fail);
    });

   // pageOwners.getVetSelectOption().sendKeys('foo');
  //  console.log(pageOwners.getVetSelect().getAttribute('value'));
  //  console.log(pageOwners.getDateInput().getAttribute('value'));
   // expect(pageOwners.getDescriptionInput().getAttribute('value')).toEqual('vaccination')
    //  .then(done, done.fail);
  });


});
