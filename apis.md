### 说明文档
1. 在MySql数据库中存一棵树
  * 使用 colsure_table 实现
  * 对于邀请关系不复杂且层级不深的可以不考虑

2. TODO_LIST
  * 实现服务注册功能,创建相同的表给不同的服务使用

3. 接口文档
  * 所有请求均使用 `GET` 请求
  * 创建一个节点
    * params
      ```
      {
        _name: String,  // 表名
        node_id: Number|String,  // 子节点id
        p_id: Number|String,  // 父节点id
      }
      ```
    * res
      ```
      {
        success: Boolean
      }
      ```