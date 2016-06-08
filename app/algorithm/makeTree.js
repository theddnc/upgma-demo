import reduceGrid from './reduceGrid';

export default (gridConfig, step) => {
  const newGridConfig = reduceGrid(gridConfig);

  //todo: write make-tree algorithm

  const treeConfig = {
    nodeStructure: {
      name: '',
      distance: 0.5,
      children: [
        { name: 'E', distance: 17 },
        {
          name: '',
          distance: 2.5,
          children: [
            { name: 'C', distance: 14.5 },
            {
              name: '',
              distance: 6.25,
              children: [
                {
                  name: '',
                  distance: 4.25,
                  children: [
                    { name: 'A', distance: 4.0 },
                    { name: 'D', distance: 4.0 }
                  ]
                },
                {
                  name: '',
                  distance: 2.0,
                  children: [
                    { name: 'G', distance: 6.25 },
                    {
                      name: '',
                      distance: 5.75,
                      children: [
                        { name: 'B', distance: 0.5 },
                        { name: 'F', distance: 0.5 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    grid: newGridConfig
  };

  return treeConfig;
}