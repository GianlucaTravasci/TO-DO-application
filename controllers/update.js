const mongodb = require('mongodb');
const sanitizeHTML = require('sanitize-html');

const handleUpdate = (req, res, DB) => {
    const safeInput = sanitizeHTML(req.body.text, {allowedTags: [], allowedAttributes: {}});
    DB.collection('items').updateOne({_id: new mongodb.ObjectID(req.body.id)}, {$set: {text: safeInput}}, () => {
        res.redirect('/');
      })
}

module.exports = {
    handleUpdate
}