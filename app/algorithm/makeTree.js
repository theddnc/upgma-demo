import reduceGrid from './reduceGrid';

export default (gridConfig, step) => {

  //todo: write make-tree algorithm

  const treeConfig = {
    nodeStructure: {
      name: '',
      distance: 0.5,
      hidden: true,
      children: [
        { name: 'E', distance: 17, hidden: true},
        {
          name: '',
          distance: 2.5,
          hidden: true,
          children: [
            { name: 'C', distance: 14.5, hidden: true },
            {
              name: '',
              distance: 6.25,
              hidden: true,
              children: [
                {
                  name: '',
                  distance: 4.25,
                  hidden: true,
                  children: [
                    { name: 'A', distance: 4.0, hidden: true },
                    { name: 'D', distance: 4.0, hidden: true }
                  ]
                },
                {
                  name: '',
                  distance: 2.0,
                  hidden: true,
                  children: [
                    { name: 'G', distance: 6.25, hidden: true },
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