const { Router } = require('express');
const { postProduct } = require('../controllers/postProduct');
const { getProducts } = require('../controllers/getProducts');
const { putProducts } = require('../controllers/putProducts');
const productRoute = Router();

productRoute.post('/', async (req, res) => {
  try {
    const productCreate = await postProduct(req.body);
    res.status(201).send(productCreate);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
productRoute.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const product = await getProducts(category);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
productRoute.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let newId = Number(id);
    const product = await getProducts(null, newId);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
productRoute.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let newId = Number(id);
    const product = await putProducts(newId, req.body);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = productRoute;
