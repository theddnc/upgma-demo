const defaultTableConfig = {
  names: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  values: [
    [],
    [19.00],
    [27.00, 31.00],
    [8.00, 18.00, 26.00],
    [33.00, 36.00, 41.00, 31.00],
    [18.00, 1.00, 32.00, 17.00, 35.00],
    [13.00, 13.00, 29.00, 14.00, 28.00, 12.00]
  ],
  highlightedRow: 5,
  highlightedCol: 5,
  highlightedPairs: [
    { first: { x: 2, y: 3 }, second: { x: 3, y: 4 } }
  ],
  editable: true
};

export {
  defaultTableConfig
};