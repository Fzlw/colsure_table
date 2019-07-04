const model = require('../model');
const {
  COMMON
} = require('../enums');

class RelationService {

  async getNodeIsExistAndIsRoot(options) {
    const {
      nodeId,
      _name
    } = options;
    try {
      let entity = await model[_name].findOne({
        where: {
          valid: COMMON.VALID.valid,
          descendant: nodeId
        },
        order: [
          ['distance', 'asc']
        ]
      });
      entity = entity && entity.dataValues;
      let result = {
        exist: false,
        root: false
      };
      if (entity && entity.id) {
        result.exist = true;
      }
      if (entity && entity.distance === 0) {
        result.root = true;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getNodeIsRoot(options) {
    const {
      nodeId,
      _name
    } = options;
    try {
      let entity = await model[_name].findOne({
        where: {
          valid: COMMON.VALID.valid,
          ancestor: nodeId,
          descendant: nodeId,
          distance: 0
        }
      });
      entity = entity && entity.dataValues;
      if (!entity || !entity.id) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getParentsOfNode(options) {
    const {
      nodeId,
      _name,
      maxLen
    } = options;
    let list = [];
    try {
      const where = {
        valid: COMMON.VALID.valid,
        descendant: nodeId
      };
      maxLen && (where.distance = {
        $lte: maxLen
      });
      list = await model[_name].findAll({
        attributes: ['ancestor', 'distance'],
        where
      });
      return list;
    } catch (error) {
      throw error;
    }
  }

  async getChildrenOfNode(options) {
    const {
      nodeId,
      _name,
      maxLen
    } = options;
    let list = [];
    try {
      const where = {
        valid: COMMON.VALID.valid,
        ancestor: nodeId
      };
      maxLen && (where.distance = {
        $lte: maxLen
      });
      list = await model[_name].findAll({
        attributes: ['ancestor', 'distance'],
        where
      });
      return list;
    } catch (error) {
      throw error;
    }
  }

  async addNodeForNoExist(options) {
    const {
      pId,
      nId,
      _name
    } = options;
    try {
      const data = [{
        ancestor: pId,
        descendant: pId,
        distance: 0,
        create_time: new Date()
      }, {
        ancestor: pId,
        descendant: nId,
        distance: 1,
        create_time: new Date()
      }];
      const result = await model[_name].bulkCreate(data);
      if (Array.isArray(result) && result.length === data.length) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async addNodeForRoot(options) {
    const {
      pId,
      nId,
      _name
    } = options;
    try {
      const newRecord = await model[_name].create({
        ancestor: pId,
        descendant: nId,
        distance: 1,
        create_time: new Date()
      });
      if (newRecord && newRecord.id) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async addNodeForChild(options) {
    const {
      nodeId,
      parents,
      parentId,
      _name
    } = options;
    const newParents = parents.map(parent => {
      parent = parent && parent.dataValues;
      return {
        ancestor: parent.ancestor,
        descendant: nodeId,
        distance: parent.distance + 1,
        create_time: new Date()
      }
    });
    newParents.push({
      ancestor: parentId,
      descendant: nodeId,
      distance: 1,
      create_time: new Date()
    });
    try {
      const result = await model[_name].bulkCreate(newParents);
      if (Array.isArray(result) && result.length === newParents.length) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async isRecord(options) {
    const {
      nodeId,
      pId,
      _name
    } = options;
    try {
      let entity = await model[_name].findOne({
        where: {
          ancestor: pId,
          descendant: nodeId,
          distance: 1,
          valid: COMMON.VALID.valid,
        }
      });
      entity = entity && entity.dataValues;
      if (entity && entity.id) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async getNodeMaxDistance(options) {
    const {
      nodeId,
      _name
    } = options;
    try {
      let entity = await model[_name].findOne({
        where: {
          valid: COMMON.VALID.valid,
          descendant: nodeId
        }
      });
      entity = entity && entity.dataValues;
      if (!entity || !entity.id) {
        return -1;
      }
      return entity.distance;
    } catch (error) {
      throw error;
    }
  }

  async getNodeIsLeaf(options) {
    const {
      nodeId
    } = options;
    try {
      const entities = await model.sequelize.query(`
        select (
          select count(*)
          from relation where valid=:valid and ancestor=:ancestorId
        ) as num_1,
        (
          select count(*)
          from relation where valid=:valid and descendant=:descendantId
        ) as num_2
      `, {
        trye: model.sequelize.QueryTypes.SELECT,
        replacements: {
          valid: COMMON.VALID.valid,
          ancestorId: nodeId,
          descendantId: nodeId
        }
      });
      const entity = entities && entities[0] && entities[0][0];
      if (typeof entity === 'object' && entity.num_1 === 0 && entity.num_2 !== 0) {
        return true;
      }
      if (typeof entity === 'object' && entity.num_1 !== 0 && entity.num_2 !== 0) {
        return false;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getGivenDistanceParents(options) {
    const {
      nodeId,
      _name,
      distance
    } = options;
    try {
      const list = await model[_name].findAll({
        attributes: [
          ['ancestor', 'id']
        ],
        where: {
          descendant: nodeId,
          distance,
          valid: COMMON.VALID.valid,
        },
        order: [
          ['create_time', 'desc']
        ]
      });
      return list.map(ele => ele.id);
    } catch (error) {
      throw error;
    }
  }

  async getGivenDistanceChildren(options) {
    const {
      nodeId,
      _name,
      distance
    } = options;
    try {
      const list = await model[_name].findAll({
        attributes: [
          ['descendant', 'id']
        ],
        where: {
          ancestor: nodeId,
          distance,
          valid: COMMON.VALID.valid,
        },
        order: [
          ['create_time', 'desc']
        ]
      });
      return list.map(ele => ele.id);
    } catch (error) {
      throw error;
    }
  }

  async getAllNode(options) {
    const {
      _name
    } = options;
    try {
      const allList = await model[_name].findAll({
        attributes: [
          ['descendant', 'id']
        ],
        group: 'descendant',
        where: {
          valid: COMMON.VALID.valid,
        }
      });
      return allList.map(ele => ele.id);
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new RelationService();