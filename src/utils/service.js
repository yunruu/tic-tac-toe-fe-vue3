export const convertCellIdxToLabel = (idx) => {
  switch (idx) {
    case 0:
      return 'Top-left'
    case 1:
      return 'Top-center'
    case 2:
      return 'Top-right'
    case 3:
      return 'Center-left'
    case 4:
      return 'Center'
    case 5:
      return 'Center-right'
    case 6:
      return 'Bottom-left'
    case 7:
      return 'Bottom-center'
    case 8:
      return 'Bottom-right'
  }
}
