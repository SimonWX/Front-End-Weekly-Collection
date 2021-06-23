function getMatrixPath(matrix) {
  let row = matrix.length;
  let col = matrix[0].length;
  let tempMatrix = [];
  for (let i = 0; i < row; i++) {
    tempMatrix[i] = [];
    for (let j = 0; j < col; j++) {
      if (matrix[i][j] == 0) {
        tempMatrix[i][j] = 0;
      }
      if (j > 0) {
        tempMatrix[i][j] = Math.min(tempMatrix[i][j - 1] + 1, tempMatrix[i][j]);
      }
      if (i > 0) {
        tempMatrix[i][j] = Math.min(tempMatrix[i - 1][j] + 1, tempMatrix[i][j]);
      }
    }
  }

  for (let i = row - 1; i >= 0; i--) {
    for (let j = col - 1; j >= 0; j--) {
      if (j < col - 1) {
        tempMatrix[i][j] = Math.min(tempMatrix[i][j + 1] + 1, tempMatrix[i][j]);
      }
      if (i < row - 1) {
        tempMatrix[i][j] = Math.min(tempMatrix[i + 1][j] + 1, tempMatrix[i][j]);
      }
    }
  }
  return tempMatrix;
}
