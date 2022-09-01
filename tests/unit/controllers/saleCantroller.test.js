const { expect } = require("chai");
const sinon = require("sinon");
const saleService = require("../../../services/salesSevice");
const saleController = require("../../../controllers/salesController");

describe("Sem lista de produtos", () => {
  const res = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, "getAllSales").resolves([]);
  });

  after(() => {
    saleService.getAllSales.restore();
  });

  it("Retorna o status 200", async () => {
    await saleController.getAllSale((_req = null), res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it("Retorna um array vazio", async () => {
    await saleController.getAllSale((_req = null), res);

    expect(res.json.calledWith([])).to.be.equal(true);
  });
});

describe("Com lista de produtos", () => {
  const res = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, "getAllSales").resolves([
      { saleId: 1, date: "2022-08-17 22:42:10", productId: 1, quantity: 2 },
      { saleId: 2, date: "2022-08-20 21:05:10", productId: 2, quantity: 1 },
      { saleId: 3, date: "2022-08-27 17:24:45", productId: 3, quantity: 1 },
    ]);
  });

  after(() => {
    saleService.getAllSales.restore();
  });

  it("Retorna o status 200", async () => {
    await saleController.getAllSale((_req = null), res);

    expect(res.status.calledWith(200)).to.be.equals(true);
  });

  it("Retorna um array com os objetos esperados", async () => {
    await saleController.getAllSale((_req = null), res);

    expect(
      res.json.calledWith([
        { saleId: 1, date: "2022-08-17 22:42:10", productId: 1, quantity: 2 },
        { saleId: 2, date: "2022-08-20 21:05:10", productId: 2, quantity: 1 },
        { saleId: 3, date: "2022-08-27 17:24:45", productId: 3, quantity: 1 },
      ])
    ).to.be.equals(true);
  });
});
