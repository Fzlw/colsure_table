#!/bin/bash

echo 'Test Start.....'
rand() {
echo "$RANDOM"
}

pId=`rand`
nId=`rand`
nId_2=`rand`
# 增加一个节点
curl http://127.0.0.1:3000/relation/add?_name=relation\&node_id=$nId\&p_id=$pId
echo "\r"
curl http://127.0.0.1:3000/relation/add?_name=relation\&node_id=$nId_2\&p_id=$pId
echo "\r"
# 获取当前节点深度
curl http://127.0.0.1:3000/relation/node/len?_name=relation\&node_id=$nId
echo "\r"
# 获取节点所有父节点
curl http://127.0.0.1:3000/relation/node/parents?_name=relation\&node_id=$nId
echo "\r"
# 获取节点所有子节点
curl http://127.0.0.1:3000/relation/node/children?_name=relation\&node_id=$pId
echo "\r"
# 判断节点是否为叶子节点
curl http://127.0.0.1:3000/relation/node/leaf?_name=relation\&node_id=$pId
echo "\r"
# 获取节点的直接父节点
curl http://127.0.0.1:3000/relation/direct/parent?_name=relation\&node_id=$nId_2
echo "\r"
# 获取节点的直接子节点
curl http://127.0.0.1:3000/relation/direct/children?_name=relation\&node_id=$pId
echo "\r"
# 获取所有节点id
curl http://127.0.0.1:3000/relation/nodes/all?_name=relation
echo "\r"
# 获取所有节点id
curl http://127.0.0.1:3000/relation/nodes/lenlist?_name=relation\&node_id=$nId_2\&len=1\&up=

echo "\r"
echo 'Test End.......'