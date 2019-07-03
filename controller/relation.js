const relation = require('../service/relation');
const {
  APIS
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
      !query.node_id || typeof query.node_id !== 'string' ||
      !query.p_id || typeof query.p_id !== 'string' ||
      query.p_id === query.node_id) {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const isCreate = await relation.isRecord(query.p_id, query.node_id);
      if (isCreate) {
        result = APIS.getSuccess();
        res.send(result);
        return;
      }
      const existAndRoot = await relation.getNodeIsExistAndIsRoot(query.p_id);
      if (!existAndRoot.exist) {
        const suc = await relation.addNodeForNoExist(
          query.p_id, query.node_id
        );
        !suc && (result.message = '创建失败');
        suc && (result.success = true);
        res.send(result);
        return;
      }
      if (existAndRoot.root) {
        const suc = await relation.addNodeForRoot(query.p_id, query.node_id);
        !suc && (result.message = '创建失败');
        suc && (result.success = true);
        res.send(result);
        return;
      }
      const parents = await relation.getParentsOfNode(query.p_id);
      const addNode = await relation.addNodeForChild(parents, query.p_id, query.node_id);
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
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const len = await relation.getNodeMaxDistance(query.node_id);
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
   * 获取节点所有父节点
   * GET
   */
  async getNodeParents(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const parents = await relation.getParentsOfNode(query.node_id);
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
   * 获取节点所有子节点
   * GET
   */
  async getNodeChildren(req, res) {
    const query = req.query;
    let result = APIS.getBaseResponse();
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const {
        exist
      } = await relation.getNodeIsExistAndIsRoot(query.node_id);
      if (!exist) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      const children = await relation.getChildrenOfNode(query.node_id);
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
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const leaf = await relation.getNodeIsLeaf(query.node_id);
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
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const {
        exist
      } = await relation.getNodeIsExistAndIsRoot(query.node_id);
      if (!exist) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      const directParents = await relation.getDirectParents(query.node_id);
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
      !query.node_id || typeof query.node_id !== 'string') {
      result.message = '参数无效';
      res.send(result);
      return;
    }
    try {
      const {
        exist
      } = await relation.getNodeIsExistAndIsRoot(query.node_id);
      if (!exist) {
        result.message = '节点不存在';
        res.send(result);
        return;
      }
      const directChildren = await relation.getDirectChildren(query.node_id);
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

}

module.exports = new Relation();