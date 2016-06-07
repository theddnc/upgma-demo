import reduceGrid from './reduceGrid';

export default (gridConfig, step) => {
  const newGridConfig = reduceGrid(gridConfig);

  //todo: write make-tree algorithm

  const treeConfig = {
    tree: {},
    grid: newGridConfig
  };

  return treeConfig;
}