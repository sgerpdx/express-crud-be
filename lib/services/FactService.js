const Fact = require('../models/Fact');
const { sendEmail } = require('../utils/amazon-ses');

module.exports = class FactService {
  static async create({ content, validity, contributorId }) {
    await sendEmail(
      `Here is a fact about nougat, verified ${validity} and contributed by user ${contributorId}: ${content}`
    );

    const fact = await Fact.insert({ content, validity, contributorId });
    return fact;
  }
};
