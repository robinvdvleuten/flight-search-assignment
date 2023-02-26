describe("application", () => {
  it("renders initial state", () => {
    cy.visit("/");
    cy.contains("Start searching by typing your destination.").should(
      "be.visible"
    );
  });

  it("renders results based on query", () => {
    cy.intercept("/flights.json?q=*").as("flights");

    cy.visit("/");
    cy.get("input").type("Sandefjord");

    cy.wait("@flights")
      .its("request.url")
      .should("match", /\?q=Sandefjord$/);
    cy.get("tbody tr").should("have.length", 1);
    cy.get("tbody tr").should("contain", "D20190401KL1221");
  });

  it("renders at most 5 results", () => {
    cy.intercept("/flights.json?q=London").as("flights");

    cy.visit("/");
    cy.get("input").type("London");

    cy.wait("@flights");
    cy.get("tbody tr").should("have.length", 5);
    cy.get("tbody tr").should("contain", "London");
  });

  it("renders results when typing at least 3 characters", () => {
    cy.intercept("/flights.json?q=*").as("flights");

    cy.visit("/");
    cy.get("input").type("San");

    cy.wait("@flights")
      .its("request.url")
      .should("match", /\?q=San$/);
    cy.get("tbody tr").should("contain", "D20190401UA969");
  });

  it("searches for partial matches", () => {
    cy.intercept("/flights.json?q=*").as("flights");

    cy.visit("/");
    cy.get("input").type("bli");

    cy.wait("@flights")
      .its("request.url")
      .should("match", /\?q=bli$/);
    cy.get("tbody tr").should("contain", "D20190401KL0937");
  });

  it("renders error when no results are found", () => {
    cy.intercept("/flights.json?q=*").as("flights");

    cy.visit("/");
    cy.get("input").type("ams");

    cy.wait("@flights");

    cy.contains("No flights found for given destination.").should("be.visible");
  });

  it("renders error message when API returns error", () => {
    cy.intercept("/flights.json?q=*", {
      statusCode: 500,
      body: {
        error: "Internal Server Error",
      },
    }).as("flights");

    cy.visit("/");
    cy.get("input").type("ams");

    cy.wait("@flights");
    cy.contains("An error occurred while searching flights.").should(
      "be.visible"
    );
  });
});
