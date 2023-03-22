const findAll = [[
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    "id": 3,
    name: "Escudo do Capitão América"
  }
]];

const findById = [[
  {
    id: 1,
    name: "Martelo de Thor"
  },
]];

const create = [
  {
    insertId: 1
  },
  null
];

const uptade = [
  {
    affectedRows: 1
  },
  null
];

const serviceCreate = {
  id: 1,
  name: 'produto'
}

const search = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
  }
];

const searchQ = [
    {
        id: 1,
        name: "Martelo de Thor"
    }
]

module.exports = { findAll, findById, create, uptade, serviceCreate, search, searchQ };