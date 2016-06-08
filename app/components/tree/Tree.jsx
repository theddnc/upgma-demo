import React, { PropTypes } from 'react';

class Tree extends React.Component {
  static propTypes = {
    nodeStructure: PropTypes.object
  };

  componentDidMount() {
    console.log(['componentDidMount'], this.props);
    const newickData = this.treeConfigToNewickFormat(this.props.nodeStructure);
    console.log(newickData);
    const tree = new Smits.PhyloCanvas(newickData, 'phylogenetic-tree', 500, 500);
  }

  treeConfigToNewickFormat(treeConfig) {
    return `${this.convertSubtree(treeConfig)}${treeConfig.name}${treeConfig.distance ? `:${treeConfig.distance}` : ''};`;
  }

  convertSubtree(tree) {
    let result = '(';
    tree.children.map((child, idx) => {
      if (child.children && child.children.length > 0) {
        result = `${result}${this.convertSubtree(child)}`;
      }
      const name = `${child.name}${child.distance ? ` [${child.distance}]` : ''}`;
      result = `${result}${name}${
        child.distance ? `:${child.distance}` : ''
      }`;
      result = `${result}${idx < tree.children.length-1 ? ',' : `)`}`;
    });
    return result;
  }
  
  render() {
    return (
      <div style={{ width: '500px', height: '500px' }} id="phylogenetic-tree"></div>
    )
  }
}

export default Tree;
