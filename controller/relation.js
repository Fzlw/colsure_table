const relation = require('../service/relation');

class Relation {

  /**
   * 增加一个节点
   * GET
   */
  async addNewNode() {}

  /**
   * 获取当前节点深度
   * GET
   */
  async getNodeDistance() {}

  /**
   * 获取节点所有父节点
   * GET
   */
  async getNodeParents() {}

  /**
   * 获取节点所有子节点
   * GET
   */
  async getNodeChildren() {}

  /**
   * 判断节点是否为叶子节点
   * GET
   */
  async getNodeIsLeaf() {}

  /**
   * 获取节点的直接父节点
   * GET
   */
  async getDirectParent() {}

  /**
   * 获取节点的直接子节点
   * GET
   */
  async getDirectChildren() {}

}

module.exports = new Relation();