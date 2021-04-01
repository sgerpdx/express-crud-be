const { Router } = require('express');
const Fact = require('../models/Fact');

module.exports = Router()
  //   .post('/', async (req, res, next) => {
  //     try {
  //       const fact = await FactService.create(req.body);
  //       res.send(fact);
  //     } catch (err) {
  //       next(err);
  //     }
  //   })

  .get('/', async (req, res, next) => {
    try {
      const facts = await Fact.retrieve();
      res.send(facts);
    } catch (err) {
      next(err);
    }
  });
