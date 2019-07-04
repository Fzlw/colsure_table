const relation = require('../service/relation');
const {
  APIS,
  COMMON
} = require('../enums');

class Relation {

  /**
   * 增加一个节点
   * GET
   */
  async addNewNode(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !(query._name in COMMON._NAMES) ||
      !query.node_id || typeof query.node_id !== 'string' ||
      !query.p_id || typeof query.p_id !== 'string' ||
      query.p_id === query.node_id) {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const isCreate = await relation.isRecord({
        nodeId: query.node_id,
        pId: query.p_id,
        _name: query._name
      });
      if (isCreate) {
        result = APIS.getSuccess();
        res.send(result);
        return;
      }
      const existAndRoot = await relation.getNodeIsExistAndIsRoot({
        nodeId: query.node_id,
        _name: query._name
      });
      if (!existAndRoot.exist) {
        const suc = await relation.addNodeForNoExist({
          pId: query.p_id,
          nId: query.node_id,
          _name: query._name
        });
        !suc && (result.message = '创建失败');
        suc && (result.success = true);
        res.send(result);
        return;
      }
      if (existAndRoot.root) {
        const suc = await relation.addNodeForRoot({
          pId: query.p_id,
          nId: query.node_id,
          _name: query._name
        });
        !suc && (result.message = '创建失败');
        suc && (result.success = true);
        res.send(result);
        return;
      }
      const parents = await relation.getParentsOfNode({
        nodeId: query.node_id,
        _name: query._name
      });
      const addNode = await relation.addNodeForChild({
        nodeId: query.node_id,
        parents,
        parentId: query.p_id,
        _name: query._name
      });
      if (!addNode) {
        result.message = '创建失败';
        res.send(result);
        return;
      }
      result = APIS.getSuccess();
    } catch (error) {
      result = APIS.getError();
    }
    res.send(result);
  }

  /**
   * 获取当前节点深度
   * GET
   */
  async getNodeDistance(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !(query._name in COMMON._NAMES) ||
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const len = await relation.getNodeMaxDistance({
        nodeId: query.node_id,
        _name: query._name
      });
      if (len === -1) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      result = {
        ...APIS.getSuccess(),
        data: {
          descendant: len
        }
      };
    } catch (error) {
      result = APIS.getError();
    }
    res.send(result);
  }

  /**
   * 获取节点所有父节点(最大层级)
   * GET
   */
  async getNodeParents(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !(query._name in COMMON._NAMES) ||
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    const maxLen = Number(query.max_len);
    if (query.max_len) {
      if (!maxLen || Number.isNaN(maxLen)) {
        result.message = '参数无效';
        res.send(result);
        return;
      }
    }
    try {
      const parents = await relation.getParentsOfNode({
        nodeId: query.node_id,
        _name: query._name,
        maxLen
      });
      if (!Array.isArray(parents) || !parents.length) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      result = {
        ...APIS.getSuccess(),
        data: {
          list: parents
        }
      };
    } catch (error) {
      result = APIS.getError();
    }
    res.send(result);
  }

  /**
   * 获取节点所有子节点(最大层级)
   * GET
   */
  async getNodeChildren(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !(query._name in COMMON._NAMES) ||
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    const maxLen = Number(query.max_len);
    if (query.max_len) {
      if (!maxLen || Number.isNaN(maxLen)) {
        result.message = '参数无效';
        res.send(result);
        return;
      }
    }
    try {
      const {
        exist
      } = await relation.getNodeIsExistAndIsRoot({
        nodeId: query.node_id,
        _name: query._name
      });
      if (!exist) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      const children = await relation.getChildrenOfNode({
        nodeId: query.node_id,
        _name: query._name,
        maxLen
      });
      result = {
        ...APIS.getSuccess(),
        data: {
          list: children
        }
      };
    } catch (error) {
      result = APIS.getError();
    }
    res.send(result);
  }

  /**
   * 判断节点是否为叶子节点
   * GET
   */
  async getNodeIsLeaf(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !(query._name in COMMON._NAMES) ||
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const leaf = await relation.getNodeIsLeaf({
        nodeId: query.node_id
      });
      if (leaf === null) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      result = {
        ...APIS.getSuccess(),
        data: {
          isLeaf: leaf
        }
      };
    } catch (error) {
      result = APIS.getError();
    }
    res.send(result);
  }

  /**
   * 获取节点的直接父节点
   * GET
   */
  async getDirectParent(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !(query._name in COMMON._NAMES) ||
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const {
        exist
      } = await relation.getNodeIsExistAndIsRoot({
        nodeId: query.node_id,
        _name: query._name
      });
      if (!exist) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      const directParents = await relation.getGivenDistanceParents({
        nodeId: query.node_id,
        _name: query._name,
        distance: 1
      });
      result = {
        ...APIS.getSuccess(),
        data: {
          parents: directParents
        }
      };
    } catch (error) {
      result = APIS.getError();
    }
    res.send(result);
  }

  /**
   * 获取节点的直接子节点
   * GET
   */
  async getDirectChildren(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !(query._name in COMMON._NAMES) ||
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const {
        exist
      } = await relation.getNodeIsExistAndIsRoot({
        nodeId: query.node_id,
        _name: query._name
      });
      if (!exist) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      const directChildren = await relation.getGivenDistanceChildren({
        nodeId: query.node_id,
        _name: query._name,
        distance: 1
      });
      result = {
        ...APIS.getSuccess(),
        data: {
          children: directChildren
        }
      };
    } catch (error) {
      result = APIS.getError();
    }
    res.send(result);
  }

  /**
   * 获取所有节点id
   * GET
   */
  async getAllNodes(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !(query._name in COMMON._NAMES)) {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const list = await relation.getAllNode({
        _name: COMMON._NAMES[query._name]
      });
      result = {
        ...APIS.getSuccess(),
        data: {
          nodes: list
        }
      };
    } catch (error) {
      result = APIS.getError();
    }
    res.send(result);
  }

  /**
   * 获取当前节点指定层级的父/子节点id
   * GET
   */
  async getDistanceList(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !(query._name in COMMON._NAMES) ||
      !query.len || !Number(query.len) || typeof query.len !== 'string' ||
      typeof query.up !== 'string' ||
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const {
        exist
      } = await relation.getNodeIsExistAndIsRoot({
        nodeId: query.node_id,
        _name: query._name
      });
      if (!exist) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      let serviceName = 'getGivenDistanceChildren';
      !!query.up && (serviceName = 'getGivenDistanceParents');
      const list = await relation[serviceName]({
        nodeId: query.node_id,
        _name: query._name,
        distance: Number(query.len)
      });
      result = {
        ...APIS.getSuccess(),
        data: {
          list
        }
      };
    } catch (error) {
      result = APIS.getError();
    }
    res.send(result);
  }

}

module.exports = new Relation();