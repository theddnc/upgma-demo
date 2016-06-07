export default (gridConfig, step) => {
  const newGridConfig = Object.assign({}, gridConfig, {
    editable: false
  });
  //todo: write reduce algorithm
  return newGridConfig;
}