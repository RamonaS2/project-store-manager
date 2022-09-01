const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../models/connection");
const salesModel = require('../../../models/salesModel');

describe("Sem lista de produtos", () => {
  before(() => {
    sinon.stub(connection, "execute").resolves([[], []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Retona um array", async () => {
    const getAllSale = await salesModel.getAllSale();

    expect(getAllSale).to.be.a("array");
  });

  it("Se o array está vazio", async () => {
    const getAllSale = await salesModel.getAllSale();

    expect(getAllSale).to.be.empty;
  });
});

describe("Com lista de produtos", () => {
  before(() => {
    sinon.stub(connection, "execute").resolves([
      [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
      ],
      [],
    ]);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Retona um array", async () => {
    const getAllSale = await salesModel.getAllSale();

    expect(getAllSale).to.be.a("array");
  });

  it("Se o array não está vazio", async () => {
    const getAllSale = await salesModel.getAllSale();

    expect(getAllSale).to.not.be.empty;
  });

  it("O array possui item do tipo object", async () => {
    const [getAllSale] = await salesModel.getAllSale();

    expect(getAllSale).to.be.an("object");
  });

});
