const router = require('express').Router();
const {Product} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/:productId', async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      const adminErr = new Error('Restricted');
      adminErr.status = 405;
      return next(adminErr);
    }
    const [count, product] = await Product.update(req.body, {
      where: {id: req.params.productId},
      returning: true
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      const adminErr = new Error('Restricted');
      adminErr.status = 405;
      return next(adminErr);
    }
    const product = await Product.findByPk(req.params.productId);
    if (!product) return res.sendStatus(404);
    await product.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      const adminErr = new Error('Restricted');
      adminErr.status = 405;
      return next(adminErr);
    }
    const product = await Product.create(req.body);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

// post / to create a new product
