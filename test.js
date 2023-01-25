const { Matrix4 } = require('three');

const matA = new Matrix4();
matA.set(
  1, 2, 3, 4,
  2, 3, 4, 5,
  3, 4, 5, 6,
  4, 5, 6, 7
);
const matB = new Matrix4();
matB.set(
  1, 2, 3, 4,
  5, 6, 7, 8,
  9, 10, 11, 12,
  13, 14, 15, 16
)
const matC = new Matrix4();
matC.set(
  3, 1, 4, 1,
  5, 9, 2, 6,
  5, 3, 5, 8,
  9, 7, 9, 3
);

console.log(matA.multiply(matB))
matA.multiply(matC);

console.log(matA);