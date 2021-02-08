const ownersUrl = Cypress.config().baseUrl + "petclinic/owners";
const vetsUrl = Cypress.config().baseUrl + "petclinic/vets";

beforeEach(() => {
  cy.intercept('owners').as('getOwners');
  cy.visit(ownersUrl);
})

describe('User Story 2 Create visit with vet', () => {
  let formattedDateTomorrow: string;
  let random: number;

  before(()=>{
    let date = new Date();
    date.setDate(date.getDate() + 1); // tomorrow
    formattedDateTomorrow = date.toLocaleDateString(
      'zh-Hans-CN',
      {  year: "numeric", month: "2-digit", day: "2-digit"}
    );
    random = Math.floor(Math.random() * (1444 - 333)) + 333;
  });

  it('Should be able to reach owner page', () => {
    cy.url().should('eq', ownersUrl);
  });

  it('Table should contain Owner George Franklin', () => {
    cy.wait('@getOwners').then(({request, response}) => {
      cy.get(':nth-child(1) > .ownerFullName > a').contains('George Franklin');
      assert(true);
    });
  });

  it('user story 2.2: Should add Visit with Vet for Betty Davis pet', () => {
    cy.wait('@getOwners').then(({request, response}) => {
      // go to edit owner page
      cy.get(':nth-child(2) > .ownerFullName > a').click();
      cy.url().should('eq', ownersUrl+ "/2");
      // add visit for her pet
      cy.get('.dl-horizontal > :nth-child(9)').click();
      cy.url().should('eq', 'http://localhost:4200/petclinic/pets/2/visits/add');
      cy.get('.mat-datepicker-input').type(formattedDateTomorrow);
      cy.get('#description').type('Vaccination'+random);
      cy.get('#vet').select("James Carter");
      cy.get('[type="submit"]').click();
      cy.wait(5000);
      // page should contain added visit
      cy.get('app-visit-list > .table > tr > :nth-child(1)').contains(formattedDateTomorrow);
      cy.get('app-visit-list > .table > tr > :nth-child(2)').contains('Vaccination'+random);
      cy.get('app-visit-list > .table > tr > :nth-child(3)').contains('James Carter');
    });
  });

  it('user story 2: should show visits for vet', () => {
    cy.intercept('vets').as('getVets');
    cy.get('[data-cy=navElementVets]').click();
    cy.get('[data-cy=linkAllVets]').click();
    cy.wait('@getVets').then(({request, response}) => {
      cy.get('.table').find('td').contains('James Carter').parent().as('row');
      cy.get('@row').find(':nth-child(3) > :nth-child(1)').click();
      cy.wait(5000);
      cy.get(' tbody > :nth-last-child(1) > :nth-child(1)').contains(formattedDateTomorrow);
      cy.get(' tbody > :nth-last-child(1) > :nth-child(2) ').contains('Vaccination'+random);
      cy.get(' tbody > :nth-last-child(1) > :nth-child(4)').contains('Betty Davis');
    });
  })

  it('user story 2.2: Should edit Visit and change Vet', () => {
    cy.wait('@getOwners').then(({request, response}) => {
      // go to edit owner page
      cy.get(':nth-child(2) > .ownerFullName > a').click();
      cy.url().should('eq', ownersUrl+ "/2");
      // edit visit for her pet
      cy.get('app-visit-list > .table > tr > :nth-child(2)').contains('Vaccination'+random).parent().as('row');
      cy.get('@row').find(':nth-child(4) > :nth-child(1)').click();
      cy.url().should('contain', '/petclinic/visits/');
      cy.url().should('contain', '/edit');
      cy.get('#vet').select("Linda Douglas");
      cy.get('[type="submit"]').click();
      cy.wait(5000);
      // page should contain added visit
      cy.get('app-visit-list > .table > tr > :nth-child(1)').contains(formattedDateTomorrow);
      cy.get('app-visit-list > .table > tr > :nth-child(2)').contains('Vaccination'+random);
      cy.get('app-visit-list > .table > tr > :nth-child(3)').contains('Linda Douglas');
    });
  });

  it('user story 3: search should find visit containing vet', () => {
    cy.get('[data-cy=linkSearch]').click();
    cy.wait(5000);
    cy.get("#searchFormInput").type('Vaccination'+random);
    cy.get("#submitButton").click();
    cy.wait(5000);
    cy.get("app-visit-table").should("contain", 'Vaccination'+random);
    cy.get("app-visit-table").find('td').contains('Vaccination'+random).parent().as('row');
    cy.get('@row').find(':nth-child(5)').should("contain", 'Linda Douglas');
  })

  after(()=>{
    // Delete created Visit for pet
    cy.intercept('owners').as('getOwnersInAfter');
    cy.visit(ownersUrl);
    cy.wait('@getOwnersInAfter').then(({request, response}) => {
      cy.get(':nth-child(2) > .ownerFullName > a').click();
      cy.wait(5000);
      cy.url().should('eq', ownersUrl+ "/2");
      cy.get('.table').find('td').contains('Vaccination'+random).parent().as('row');
      cy.get('@row').find(':nth-child(4) > :nth-child(2)').click();
    });
  });
});


