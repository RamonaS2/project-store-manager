const connection = require('./connection');

const addSale = async (sale) => {
const [saleId] = await connection.execute('INSERT INTO StoreManager.sales (date) VALUES (default)');

  await sale.forEach(async (product) => {
 await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId.insertId, product.productId, product.quantity],
);
  });
  return saleId.insertId;
};

const getAllSale = async () => {
  const [sales] = await connection.execute(
    `SELECT 
    s.id AS saleId,
    s.date AS date,
    sp.product_id as productId,
    sp.quantity as quantity
  FROM
    StoreManager.sales AS s
    INNER JOIN
    StoreManager.sales_products AS sp
      ON s.id = sp.sale_id`,
  );
  return sales;
};

const getByIdSale = async (id) => {
  const [saleID] = await connection.execute(
    `SELECT 
    s.date AS date,
    sp.product_id as productId,
    sp.quantity as quantity
  FROM
    StoreManager.sales AS s
    INNER JOIN
    StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
  WHERE
    s.id = ?`, [id],
  );
  return saleID;
};

const remove = async (id) => {
  const [sale] = await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?',
    [id]);
  return sale;
};

const updateSale = async (id, sale) => {
  const update = await Promise.all(sale.map(async (product) => {
      const [row] = await connection.execute(
        `UPDATE StoreManager.sales_products 
        SET product_id = ?, 
            quantity = ?
        WHERE sale_id = ?
        AND product_id = ?`,
        [product.productId, product.quantity, id, product.productId],
      );
      return row.affectedRows;
    }));

 if (!update) return false;
 return true;
};

module.exports = {
  addSale,
  getAllSale,
  getByIdSale,
  remove,
  updateSale,
};