const express = require("express");
const routes = require('./routes')

require('../config/associations')

const app = express();
const port = 3000

app.use(
    express.json(),
    routes
)


app.listen(port, () => console.log(`Servidor Ativo na porta ${port}`))