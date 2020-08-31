const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

//IMPORT CONTROLLERS
const create = require('./controllers/create');
const deleteItem = require('./controllers/delete');
const update = require('./controllers/update');
const read = require('./controllers/read');


const app = express();
const PORT = 3000;
let DB;

//DATABASE CONNECTION 
mongodb.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  DB = client.db()
  app.listen(PORT, () => {
    console.log(`check http://localhost:${PORT}`);
  })
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('views'))

app.set("view engine", "ejs");

function passwordProtected(req, res, next) {
  res.set('WWW-Authenticate', 'Basic realm="Simple to do App"')
  if (req.headers.authorization == 'Basic R2lhbmx1Y2E6Z2lhbmx1Y2E=') {
    next()
  } else {
    res.status(401).send("Authrntication required")
  }
  //console.log('costum fun');
}

app.get('/', passwordProtected, (req, res) => {
  read.handleRead(req, res, DB)
})

app.post('/create-item', (req, res) => {
  create.handleCreate(req, res, DB);
})

app.post('/update-item', (req, res) => {
  update.handleUpdate(req, res, DB);
})

app.post('/delete-item', (req, res) => {
  deleteItem.handleDelete(req, res, DB);
})

