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

  static async validate({ content, validity, contributorId }, id) {
    await sendEmail(
      `Regarding nougat, the fact '${content}' has been reevaluated as ${validity}`
    );

    const fact = await Fact.update({ content, validity, contributorId }, id);
    return fact;
  }
};
