const relation = require('../service/relation');
const {
  apis
} = require('../enums');

class Relation {

  /**
   * 增加一个节点
   * GET
   */
  async addNewNode(req, res) {
    const query = req.query;
    // 参数验证
    if (!query._name || typeof query._name !== 'string' ||
      !query.node_id || typeof query.node_id !== 'string' ||
      !query.p_id || typeof query.p_id !== 'string') {
      res.send(apis.getParamsNotValid());
      return;
    }
    res.send('test')
  }

  /**
   * 获取当前节点深度
   * GET
   */
  async getNodeDistance(req, res) {}

  /**
   * 获取节点所有父节点
   * GET
   */
  async getNodeParents(req, res) {}

  /**
   * 获取节点所有子节点
   * GET
   */
  async getNodeChildren(req, res) {}

  /**
   * 判断节点是否为叶子节点
   * GET
   */
  async getNodeIsLeaf(req, res) {}

  /**
   * 获取节点的直接父节点
   * GET
   */
  async getDirectParent(req, res) {}

  /**
   * 获取节点的直接子节点
   * GET
   */
  async getDirectChildren(req, res) {}

}

module.exports = new Relation();