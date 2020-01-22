const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const {setupWebsocket} = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://lfmg:021193@cluster0-eke6f.mongodb.net/week10?retryWrites=true&w=majority',{
     useNewUrlParser: true, 
     useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes); // todas rotas da aplicação estao cadastradas

//METODOS HTTP get,post,put,delete

//tipos de parametros:
//Query Params: request.query (Filtros,ordenação,Paginação)
//Route Params: request.params (indentificar um recurso na alteração/remoção)
//Body: request.body (dados para criação ou alteração de um registro)

//MongoDB -> Banco nao relacional



app.listen(3333);