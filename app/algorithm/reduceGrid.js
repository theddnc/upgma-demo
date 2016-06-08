export default (gridConfig, step) => {
  var newGridConfig = Object.assign({}, gridConfig, {
    editable: false
  });



  return newGridConfig;
}

class GridModel {
  constructor(gridConfig){
    this.nodes = [];
    this.initNodes(gridConfig);
    this.distanceMatrix = gridConfig.values;
    this.currGridConfig = gridConfig;
    this.currTreeConfig = this.getTree()
    this.gridConfigHistory = [];
    this.treeConfigHistory = [];
    this.finished = false;
    this.nodeCount = gridConfig.values.length * 2 + 1
  }

  initNodes(gridConfig){
    for (i=0; i<gridConfig.values.length; i++){
      var node = new Node([new Point(i, gridConfig.names[i])], null, null, -1);
      this.nodes.push(node)
    }
  }

  step(){
    this.saveCurrentState()

    var minDistance = Infinity;
    var chosenOne = null;
    var chosenSecondOne = null;
    for (i = 0; i<this.nodes.length; i ++){
      if (this.nodes[i].alive){
        for (j = i+1; j <this.nodes.length; j++){
          if(this.nodes[j].alive) {
            var n1 = this.nodes[i];
            var n2 = this.nodes[j];
            var dis = this.getDistance(n1, n2);
            if(dis<minDistance){
              minDistance = dis;
              chosenOne = n1;
              chosenSecondOne = n2;
            }
          }
        }
      }
    }

    this.nodes.push(GridModel.getJoinedNode(chosenOne, chosenSecondOne, minDistance));
    chosenOne.alive = false;
    chosenSecondOne.alive = false;

    this.refreshConfigs()

    if (this.nodeCount === this.nodes.length){
      this.finished = true;
    }
  }

  refreshConfigs(){
    this.currTreeConfig = this.getTree();
    this.currGridConfig = this.getGrid();
  }


  saveCurrentState(){
    this.gridConfigHistory.push(this.currGridConfig)
    this.treeConfigHistory.push(this.currTreeConfig)
  }

  getTree(){
    var root = this.nodes[this.nodes.length-1]
    return {
      nodeStructure: this.getTreeConf(root)
    }
  }

  getTreeConf(node){
    var nodeConf = {
      name: node.label,
      distance: node.distance
    };
    if (node.left == null && node.right == null) {
      return nodeConf
    }
    nodeConf.children = [];
    if (node.left != null){
      nodeConf.push(this.getTreeConf(node.left))
    }
    if (node.right != null){
      nodeConf.push(this.getTreeConf(node.right))
    }
    return nodeConf
  }


  static getJoinedNode(node1, node2, distance) {
    var points = node1.points.slice().concat(node2.points.slice());
    return new Node(points, node1, node2, distance);
  }

  getDistance(node1, node2) {
    var distance = 0;
    for (var point1 in node1.points){
      for (var point2 in node2.points){
        distance += this.getOriginalDistance(point1, point2)
      }
    }
    return distance / (node1.points.length() + node2.points.length())
  }

  getOriginalDistance(p1, p2) {
    return this.distanceMatrix[p1.id][p2.id]
  }

  getGrid() {

  }
}

class Node{
  constructor(points, left, right, distance) {
    this.points = points;
    this.left = left;
    this.right = right;
    this.distance = distance;
    this.alive = true;

    if(points.length === 2){
      this.id = points[0].id;
      this.label = points[0].label + "+" + points[1].label
    }
    else {
      this.id = left.id;
      this.label = left.label + "+" + right.label
    }
  }
}

class Point {
  constructor(id, label) {
    this.id = id;
    this.label = label
  }
}