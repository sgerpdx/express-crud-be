const { Router } = require('express');
const Fact = require('../models/Fact');
const FactService = require('../services/FactService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const fact = await FactService.create(req.body);
      res.send(fact);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const facts = await Fact.retrieve();
      res.send(facts);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const fact = await Fact.retrieveById(id);
      res.send(fact);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const fact = await FactService.validate(req.body, id);
      res.send(fact);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const fact = await Fact.deleteById(id);
      res.send(fact);
    } catch (err) {
      next(err);
    }
  });
