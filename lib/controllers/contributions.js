const { Router } = require('express');

module.exports = Router().get('/', async (req, res, next) => {
  console.log('controllers');
  try {
    const orders = await Order.retrieve();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});
