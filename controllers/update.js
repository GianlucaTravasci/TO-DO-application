const mongodb = require('mongodb');

const handleUpdate = (req, res, DB) => {
    DB.collection('items').updateOne({_id: new mongodb.ObjectID(req.body.id)}, {$set: {text: req.body.text}}, () => {
        res.redirect('/');
      })
}

module.exports = {
    handleUpdate
}