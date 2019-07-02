const Relation = require('../model/relation');

class RelationService {
  async getAll() {
    const data = await Relation.findAll();
    return data;
  }
}

module.exports = new RelationService();