describe("API test suite", () => {
  it("Get price data from API", () => {
    cy.fixture("tokenPrices.json").then((availableTokens) => {
      cy.request(
        "POST",
        "http://localhost:8888/tokens/getPrice",
        availableTokens
      ).then((response) => {
        if (response) {
          const responseBody = response.body;
          expect(response.status).to.equal(200);
          expect(responseBody).to.have.property("BTC");
        }
      });
    });
  });

  it("Get available tokens from API", () => {
    cy.request("GET", "http://localhost:8888/tokens").then((response) => {
      if (response) {
        const responseBody = response.body;
        expect(response.status).to.equal(200);
        responseBody.forEach((item: Object) => {
          expect(item).to.have.property("symbol");
        });
      }
    });
  });

  it("Get token by ID from API", () => {
    cy.request("GET", "http://localhost:8888/tokens/1").then((response) => {
      if (response) {
        const responseBody = response.body;
        expect(response.status).to.equal(200);
        expect(responseBody).to.have.property("symbol");
      }
    });
  });
});
