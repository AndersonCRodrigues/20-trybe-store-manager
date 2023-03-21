const express = require('express');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productRouter = require('./router/productRouter');
const salesRouter = require('./router/salesRouter');

app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.use(require('./middlewares/erroHandler'));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;

// *
