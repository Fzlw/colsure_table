module.exports = app => {
  const {
    router,
    controller
  } = app;
  // 增加一个节点
  router.get('/relation/add', controller.relation.addNewNode);
  // 获取当前节点深度
  router.get('/relation/node/len', controller.relation.getNodeDistance);
  // 获取节点所有父节点(最大层级)
  router.get('/relation/node/parents', controller.relation.getNodeParents);
  // 获取节点所有子节点(最大层级)
  router.get('/relation/node/children', controller.relation.getNodeChildren);
  // 判断节点是否为叶子节点
  router.get('/relation/node/leaf', controller.relation.getNodeIsLeaf);
  // 获取节点的直接父节点
  router.get('/relation/direct/parent', controller.relation.getDirectParent);
  // 获取节点的直接子节点
  router.get('/relation/direct/children', controller.relation.getDirectChildren);
  // 获取所有节点id
  router.get('/relation/nodes/all', controller.relation.getAllNodes);
  // 获取当前节点指定层级的父/子节点id
  router.get('/relation/nodes/lenlist', controller.relation.getDistanceList);
  // 获取指定节点的所有子节点(最大深度)
  router.get('/relation/nodes/tree', controller.relation.getNodesByAncestors);
};