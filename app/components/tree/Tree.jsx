import React, { PropTypes } from 'react';
import formatNumber from '../../formatters/formatNumber';

class Tree extends React.Component {
  static propTypes = {
    nodeStructure: PropTypes.object
  };

  componentWillReceiveProps(newProps) {
    this.renderTree(newProps);
  }

  componentDidMount() {
    this.renderTree(this.props);
  }

  treeConfigToNewickFormat(treeConfig) {
    const label = treeConfig.name.indexOf('+') === -1 ? treeConfig.name : '';
    const distance = `${treeConfig.distance ? ` [${formatNumber(treeConfig.distance)}]` : ''}`;
    const name = `${treeConfig.hidden ? '*' : ''}${label}${distance}`;
    return `${this.convertSubtree(treeConfig)}${treeConfig.hidden ? '*': ''}${name}${treeConfig.distance ? `:${treeConfig.distance}` : ''};`;
  }

  convertSubtree(tree) {
    let result = '(';
    tree.children.map((child, idx) => {
      if (child.children && child.children.length > 0) {
        result = `${result}${this.convertSubtree(child)}`;
      }
      const label = child.name.indexOf('+') === -1 ? child.name : '';
      const distance = `${child.distance ? ` [${formatNumber(child.distance)}]` : ''}`;
      const name = `${child.hidden ? '*' : ''}${label}${distance}`;
      result = `${result}${name}${
        child.distance ? `:${child.distance}` : ''
      }`;
      result = `${result}${idx < tree.children.length-1 ? ',' : `)`}`;
    });
    return result;
  }

  renderTree(props) {
    const div = document.getElementById('phylogenetic-tree');
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }
    const newickData = this.treeConfigToNewickFormat(props.nodeStructure);
    console.log(['renderTree'], newickData);
    const tree = new Smits.PhyloCanvas(newickData, 'phylogenetic-tree', 800, 500);
  }
  
  render() {
    return (
      <div style={{ width: '800px', height: '1000px' }} id="phylogenetic-tree"></div>
    )
  }
}

export default Tree;
