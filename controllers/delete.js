const mongodb = require('mongodb');

const handleDelete = (req, res, DB) => {
    DB.collection('items').deleteOne({_id: new mongodb.ObjectID(req.body.id)}, () => {
        res.redirect('/');
    })
}

module.exports = {
    handleDelete
}