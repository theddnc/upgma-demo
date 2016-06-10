class Algorithm {
  constructor(gridConfig){
    console.log(['Algorithm()'], gridConfig);
    this.nodes = [];
    this.initNodes(gridConfig);
    this.distanceMatrix = gridConfig.values;
    this.nodeHistory = [];
    this.gridHistory = [];
    this.currGridConf = (Object.assign({}, gridConfig));
    this.currGridConf.editable = false;
    this.treeHistory = [];
    this.highlightedGroups = [];
    this.finished = false;
    this.nodeCount = 2*gridConfig.values.length - 1;
    this.calculateTree();
  }

  initNodes(gridConfig){
    for (var i=0; i<gridConfig.values.length; i++) {
      var node = new Node([new Point(i, gridConfig.names[i])], null, null, -1);
      this.nodes.push(node)
    }
  }

  calculateTree(){
    while(!this.finished){
      let minDistance = Infinity;
      let chosenOne = null;
      let chosenSecondOne = null;
      for (let i = 0; i<this.nodes.length; i ++){
        if (this.nodes[i].alive){
          for (var j = i+1; j <this.nodes.length; j++){
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
      var newNode = Algorithm.getJoinedNode(chosenOne, chosenSecondOne, minDistance);
      this.nodes.push(newNode);
      chosenOne.alive = false;
      chosenSecondOne.alive = false;
      this.nodeHistory.push(newNode);

      if (this.nodeCount === this.nodes.length){
        this.finished = true;
      }
    }
    this.treeHistory.push(this.getTree());
    this.gridHistory.push(Object.assign({}, this.currGridConf));
    for (let i=0; i<this.nodeHistory.length ; i++){
      this.refreshTree(i);
      this.refreshGrid(i);
    }
  }
  
  getGridConfByStep(i){
    console.log(['getGridConfByStep'], i, this.gridHistory[i]);
    return i < this.gridHistory.length ? this.gridHistory[i] : null;
  }
  
  getTreeConfByStep(i){
    console.log(['getTreeConfByStep'], i, this.treeHistory[i]);
    return i < this.treeHistory.length ? this.treeHistory[i] : this.treeHistory[this.treeHistory.length-1];
  }

  getHighlightedGroupsByStep(i){
    return {
      highlightedGroups: []
    }
  }

  getHistory(){
    return this.gridHistory;
  }

  refreshGrid(i){
    this.gridHistory.push(this.currGridConf);
    this.currGridConf = this.getNextGrid(i)
  }

  getHighlightedGroups(i){

  }

  getNextGrid(i) {
    var newNode = this.nodeHistory[i];
    var names = this.currGridConf.names.slice();
    var values = [];
    var leftId = names.indexOf(newNode.left.label);
    var rightId = names.indexOf(newNode.right.label);
    //Replace old label with combined one
    names[leftId] = newNode.label;
    //Remove second old label
    names.splice(rightId,1);
    //recalculate distances
    for (let i =0; i< names.length; i++){
      values.push([]);
      for(let j = 0; j<i;j++){
        var node1 = this.getNodeByLabel(names[j]);
        var node2 = this.getNodeByLabel(names[i]);
        values[i].push(this.getDistance(node1, node2));
      }
    }
    //highlight previous table
    this.currGridConf.highlightedRows = [leftId+1, rightId+1];
    this.currGridConf.highlightedCols = [leftId+1, rightId+1];
    var highlightedRows= [];
    var highlightedCols = [];
    var highlightedGroups = [];
    var editable = false;
    return {
      names,
      values,
      highlightedRows,
      highlightedCols,
      highlightedGroups,
      editable
    };
  }
  
  getPoints(node1, node2) {
    var points = [];
    for (var point1 of node1.points) {
      for (var point2 of node2.points) {
        if (point1.id > point2.id)
          points.push({x:point2.id, y:point1.id});
        else
          points.push({x:point1.id, y:point2.id});
      }
    }
    return points;
  }

  getNodeByLabel(label){
    for (var node of this.nodes){
      if (node.label === label){
        return node
      }
    }
  }

  refreshTree(i){
    this.nodeHistory[i].setVisible();
    this.treeHistory.push(this.getTree());
  }

  getTree(){
    var root = this.nodes[this.nodes.length-1];
    return {
      nodeStructure: this.getTreeConf(root)
    }
  }

  getTreeConf(node){
    var nodeConf = {
      name: node.label.indexOf("+")!= -1? "" : node.label,
      distance: node.distance/2,
      hidden: node.hidden
    };
    if (node.left == null && node.right == null) {
      return nodeConf;
    }
    nodeConf.children = [];
    if (node.left != null){
      nodeConf.children.push(this.getTreeConf(node.left));
    }
    if (node.right != null){
      nodeConf.children.push(this.getTreeConf(node.right));
    }
    return nodeConf;
  }


  static getJoinedNode(node1, node2, distance) {
    var points = node1.points.slice().concat(node2.points.slice());
    node1.setDistance(distance);
    node2.setDistance(distance);
    return new Node(points, node1, node2, 0);
  }

  getDistance(node1, node2) {
    var distance = 0;
    for (var point1 of node1.points) {
      for (var point2 of node2.points) {
        distance += this.getOriginalDistance(point1, point2)
      }
    }
    return distance / (node1.points.length * node2.points.length)
  }

  getOriginalDistance(p1, p2) {
    if (p1.id > p2.id)
      return this.distanceMatrix[p1.id][p2.id];
    else
      return this.distanceMatrix[p2.id][p1.id];
  }

}

class Node{
  constructor(points, left, right, distance) {
    this.points = points;
    this.left = left;
    this.right = right;
    this.distance = distance;
    this.alive = true;
    this.hidden = true;

    if(left != null){
      this.id = left.id;
      this.label = `${left.label}+${right.label}`;
    }
    else {
      this.id = points[0].id;
      this.label = `${points[0].label}`;
    }
  }

  setDistance(distance){
    if (this.left == null){
      this.distance = distance;
    }
    else {
      this.distance = distance - this.getChildrenDistance();
    }
  }

  getChildrenDistance(){
    var dist = 0;
    var child = this.left;
    while (child != null){
      dist += child.distance;
      child = child.left
    }
    return dist;
  }

  setVisible(){
    this.hidden = false;
    if (this.left != null)
      this.left.setVisible();
    if (this.right != null)
      this.right.setVisible();
  }
}

class Point {
  constructor(id, label) {
    this.id = id;
    this.label = label
  }
}

export {
  Algorithm
}