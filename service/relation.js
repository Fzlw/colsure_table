const Relation = require('../model/relation');
const {
  sequelize
} = require('../db/sequelize');
const {
  COMMON
} = require('../enums');

class RelationService {

  async getNodeIsExistAndIsRoot(nodeId) {
    try {
      let entity = await Relation.findOne({
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

  async getNodeIsRoot(nodeId) {
    try {
      let entity = await Relation.findOne({
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

  async getParentsOfNode(nodeId) {
    let list = [];
    try {
      list = await Relation.findAll({
        attributes: ['ancestor', 'distance'],
        where: {
          valid: COMMON.VALID.valid,
          descendant: nodeId
        }
      });
      return list;
    } catch (error) {
      throw error;
    }
  }

  async getChildrenOfNode(nodeId) {
    let list = [];
    try {
      list = await Relation.findAll({
        attributes: ['ancestor', 'distance'],
        where: {
          valid: COMMON.VALID.valid,
          ancestor: nodeId
        }
      });
      return list;
    } catch (error) {
      throw error;
    }
  }

  async addNodeForNoExist(pId, nId) {
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
      const result = await Relation.bulkCreate(data);
      if (Array.isArray(result) && result.length === data.length) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async addNodeForRoot(pId, nId) {
    try {
      const newRecord = await Relation.create({
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

  async addNodeForChild(parents, parentId, nodeId) {
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
      const result = await Relation.bulkCreate(newParents);
      if (Array.isArray(result) && result.length === newParents.length) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async isRecord(pId, nodeId) {
    try {
      let entity = await Relation.findOne({
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

  async getNodeMaxDistance(nodeId) {
    try {
      let entity = await Relation.findOne({
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

  async getNodeIsLeaf(nodeId) {
    try {
      const entities = await sequelize.query(`
        select (
          select count(*)
          from relation where valid=:valid and ancestor=:ancestorId
        ) as num_1,
        (
          select count(*)
          from relation where valid=:valid and descendant=:descendantId
        ) as num_2
      `, {
        trye: sequelize.QueryTypes.SELECT,
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

  async getDirectParents(nodeId) {
    try {
      const list = await Relation.findAll({
        attributes: [['ancestor', 'id']],
        where: {
          descendant: nodeId,
          distance: 1,
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

  async getDirectChildren(nodeId) {
    try {
      const list = await Relation.findAll({
        attributes: [['descendant', 'id']],
        where: {
          ancestor: nodeId,
          distance: 1,
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

}

module.exports = new RelationService();