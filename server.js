const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

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

app.get('/', (req, res) => {
  DB.collection('items').find().toArray((err, items) => {
    res.render('todo.ejs', {todoTasks: items});
  });
})

app.post('/create-item', (req, res) => {
  DB.collection('items').insertOne({text: req.body.item}, () => {
    res.redirect('/');
  })
})

app.post('/update-item', (req, res) => {
  DB.collection('items').updateOne({_id: new mongodb.ObjectID(req.body.id)}, {$set: {text: req.body.text}}, () => {
    res.redirect('/');
  })
})

app.post('/delete-item', (req, res) => {
  DB.collection('items').deleteOne({_id: new mongodb.ObjectID(req.body.id)}, () => {
    res.redirect('/');
  })
})

