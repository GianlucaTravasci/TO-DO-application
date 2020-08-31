const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;
let DB;


mongodb.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  DB = client.db()
  app.listen(PORT, () => {
    console.log(`check http://localhost:${PORT}`);
  })
})

app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");



app.get('/', (req, res) => {
    res.render('todo.ejs');
})

app.post('/create-item', (req, res) => {
  DB.collection('items').insertOne({text: req.body.item}, () => {
    res.send('Thanks for submit a task!');
  })
})

