import { browser, by, element } from 'protractor';

export class OwnersPage {
  navigateToOwnersOverview() {
    return browser.get('/petclinic/owners',  30000);
  }

  getHeading() {
    return element(by.css('app-owner-list h2')).getText();
  }

  getOwnersTableContent() {
   return  element(by.css("app-owner-list table")).getText();
  }

  getOwnerLink(ownerName: string ) {
    return element(by.linkText(ownerName));
  }

  getAddVisitButton(){
    return element(by.buttonText('Add Visit') );//by.css('app-pet-list '));
  }

  getDateInput(){
    return element(by.name('date'));
  }

  getDescriptionInput(){
    return element(by.id('description'));
  }

  getVetSelect(){
   // return element(by.id('vet')).first();

  }
  getVetSelectOption(){
    return element(by.id('vet')).all(by.options('James Carter'));
  }


}
