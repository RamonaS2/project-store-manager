const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe("Sem lista de produtos", () => {
  before(() => {
    sinon.stub(productsModel, 'getAll').resolves([]);
  });

  after(() => {
    productsModel.getAll.restore();
  });

  it("Retona um array", async () => {
    const getAll = await productsService.getAll();

    expect(getAll).to.be.a("array");
  });

  it("Se o array está vazio", async () => {
    const getAll = await productsService.getAll();

    expect(getAll).to.be.empty;
  });
});

describe("Com lista de produtos", () => {
  before(() => {
    sinon.stub(productsModel, "getAll").resolves(
      [
        { id: 1, name: "Martelo do Thor" },
        { id: 2, name: "Geladeira Frost Free" },
        { id: 3, name: "Compiuter Positivo" },
      ]);
  });

   after(() => {
     productsModel.getAll.restore();
   });


  it("Retona um array", async () => {
    const getAll = await productsService.getAll();

    expect(getAll).to.be.a("array");
  });

  it("Se o array não está vazio", async () => {
    const getAll = await productsService.getAll();

    expect(getAll).to.not.be.empty;
  });

  it("O array possui item do tipo object", async () => {
    const [getAll] = await productsService.getAll();

    expect(getAll).to.be.an("object");
  });

  it("O array deve ter pelo menos um objeto com id", async () => {
    const [getAll] = await productsService.getAll();
    expect(getAll).to.be.property("id");
  });
});
