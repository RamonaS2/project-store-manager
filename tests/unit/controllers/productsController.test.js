const { expect } = require("chai");
const sinon = require("sinon");
const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");

describe("Caso não existirem", () => {
  const res = {};

before(() => {
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  sinon.stub(productsService, "getAll").resolves([]);
});

after(() => {
  productsService.getAll.restore();
});

  it('Retorna o status 200', async () => {
      await productsController.getAll(_req = null, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna um array vazio', async () => {
      await productsController.getAll(_req = null, res);

      expect(res.json.calledWith([])).to.be.equal(true);
    });


});

describe('caso exista', () => {

  const res = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, "getAll").resolves([
      { id: 1, name: "Martelo do Thor" },
      { id: 2, name: "Geladeira Frost Free" },
      { id: 3, name: "Compiuter Positivo" },
    ]);
  });

  after(() => {
    productsService.getAll.restore();
  });

  it("Retorna o status 200 OK", async () => {
    await productsController.getAll((_req = null), res);

    expect(res.status.calledWith(200)).to.be.equals(true);
  });

  it("Retorna um array com os objetos esperados", async () => {
    await productsController.getAll((_req = null), res);

    expect(
      res.json.calledWith([
        { id: 1, name: "Martelo do Thor" },
        { id: 2, name: "Geladeira Frost Free" },
        { id: 3, name: "Compiuter Positivo" },
      ])
    ).to.be.equals(true);
  });

})

