const searchUrl = Cypress.config().baseUrl + "petclinic/search";

beforeEach(() => {
  cy.intercept('search').as('getSearch');
  cy.visit(searchUrl);
});

describe('User Story 3 Search Funcitonality', () => {
    it('should find owner', ()=> {
      cy.wait(3000);
      cy.wait('@getSearch').then(({request, response}) => {
        cy.wait(7000);
        cy.get("#searchFormInput").type("coleman");
        cy.get("#submitButton").click();
        cy.wait(3000);
        cy.get("app-owner-table").should("contain", "Jean Coleman");

        cy.get("#searchFormInput").clear();
        cy.get("#searchFormInput").type("maple");
        cy.get("#submitButton").click();
        cy.wait(3000);
        cy.get("app-owner-table").should("contain", "Maria Escobito");

        cy.get("#searchFormInput").clear();
        cy.get("#searchFormInput").type("windsor");
        cy.get("#submitButton").click();
        cy.wait(3000);
        cy.get("app-owner-table").should("contain", "Harold Davis");
      });
    });

    it('should NOT find owner', ()=> {
      cy.wait('@getSearch').then(({request, response}) => {
        cy.wait(3000);
            cy.get("#searchFormInput").type("coleman");
            cy.get("#submitButton").click();
            cy.wait(3000);
            cy.get("app-owner-table").should("not.contain", "JeaColeman");
      });
    });

    it('should have working limit in table', ()=> {
      cy.wait('@getSearch').then(({request, response}) => {
        cy.wait(3000);
        cy.get("#searchFormInput").type("a");
        cy.get("#submitButton").click();
        cy.wait(3000);
        cy.get("app-owner-table").should("not.contain", "Carlos Estaban");

        cy.get("#showAllOwnersLink").click();
        cy.wait(3000);
        cy.get("app-owner-table").should("contain", "Carlos Estaban");
      });
    });

    it('should only show selected tables', ()=> {
      cy.wait('@getSearch').then(({request, response}) => {
        cy.wait(3000);
        cy.get("#ownerCheckbox").uncheck();
        cy.get("#visitCheckbox").uncheck();
        cy.get("#visitCheckbox").should('not.be.checked');
        cy.get("#ownerCheckbox").should('not.be.checked');
        cy.get("#petCheckbox").should("be.checked");
        cy.get("#searchFormInput").type("max");
        cy.get("#submitButton").click();
        cy.wait(3000);
        cy.get("app-pet-table").should("exist")
        cy.get("app-owner-table").should("not.exist")
        cy.get("app-visit-table").should("not.exist")
        cy.get("app-pet-table").should("contain", "Max");
      });
    });

    it('should direct to owner-detail on click', ()=> {
      cy.wait('@getSearch').then(({request, response}) => {
        cy.wait(3000);
        cy.get("#searchFormInput").type("betty");
        cy.get("#submitButton").click();
        cy.wait(3000);
        cy.get('.ownerFullName > a').first().click();
        cy.wait(3000);
        cy.url().should('eq', Cypress.config().baseUrl + "petclinic/owners/2");
      });
    });

    it('should direct to vet-show-visits on click', ()=> {
      cy.wait('@getSearch').then(({request, response}) => {
        cy.wait(3000);
        cy.get("#searchFormInput").type("carter");
        cy.get("#submitButton").click();
        cy.wait(3000);
        cy.get('.vetFullName > a').first().click();
        cy.wait(3000);
        cy.url().should('eq', Cypress.config().baseUrl + "petclinic/vets/visits/1/showVisits");
      });
    });

    it('all checkboxes should be selected', ()=> {
      cy.wait('@getSearch').then(({request, response}) => {
        cy.wait(3000);
        cy.get("#ownerCheckbox").should("be.checked")
        cy.get("#petCheckbox").should("be.checked")
        cy.get("#visitCheckbox").should("be.checked")
      });
    });

    it('should display no results found', ()=> {
      cy.wait('@getSearch').then(({request, response}) => {
        cy.wait(3000);
        cy.get("#searchFormInput").type("(@*&@(*(*@&@&*@)))");
        cy.get("#submitButton").click();
        cy.wait(3000);
        cy.get("#visitTableNoResult").should("exist");
        cy.get("#visitTableNoResult").should("have.text","Didn't find any visits matching your search.");
      });
    });
});
