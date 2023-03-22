const findAll = [
  [
    {
      "saleId": 1,
      "date": "2023-03-22T14:56:51.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "saleId": 1,
      "date": "2023-03-22T14:56:51.000Z",
      "productId": 2,
      "quantity": 10
    },
    {
      "saleId": 2,
      "date": "2023-03-22T14:56:51.000Z",
      "productId": 3,
      "quantity": 15
    }
  ]
];

const findById = [
  [
    {
      "date": "2023-03-22T14:56:51.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "date": "2023-03-22T14:56:51.000Z",
      "productId": 2,
      "quantity": 10
    }
  ]
];

const create = [{ insertId: 1 }];

const prodDelete = [{affectedRows: 1}]

module.exports = { findAll, findById, create, prodDelete };