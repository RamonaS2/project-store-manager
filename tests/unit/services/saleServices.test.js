const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const saleService = require("../../../services/salesSevice");
const saleModel = require("../../../models/salesModel");

describe("Sem lista de produtos", () => {
  before(() => {
    sinon.stub(saleModel, "getAllSale").resolves([]);
  });

  after(() => {
    saleModel.getAllSale.restore();
  });

  it("Retona um array", async () => {
    const getAllSales = await saleService.getAllSales();

    expect(getAllSales).to.be.a("array");
  });

  it("Se o array está vazio", async () => {
    const getAllSales = await saleService.getAllSales();

    expect(getAllSales).to.be.empty;
  });
});

describe("Com lista de produtos", () => {
  before(() => {
    sinon.stub(saleModel, "getAllSale").resolves([
      { saleId: 1, date: "2022-08-17 22:42:10", productId: 1, quantity: 2 },
      { saleId: 2, date: "2022-08-20 21:05:10", productId: 2, quantity: 1 },
      { saleId: 3, date: "2022-08-27 17:24:45", productId: 3, quantity: 1 },
    ]);
  });

  after(() => {
    saleModel.getAllSale.restore();
  });

  it("Retona um array", async () => {
    const getAllSales = await saleService.getAllSales();

    expect(getAllSales).to.be.a("array");
  });

  it("Se o array não está vazio", async () => {
    const getAllSales = await saleService.getAllSales();

    expect(getAllSales).to.not.be.empty;
  });

  it("O array possui item do tipo object", async () => {
    const [getAllSales] = await saleService.getAllSales();

    expect(getAllSales).to.be.an("object");
  });

});
