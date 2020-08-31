const sanitizeHTML = require('sanitize-html');

const handleCreate = (req, res, DB) => {
    const safeInput = sanitizeHTML(req.body.item, {allowedTags: [], allowedAttributes: {}});
    DB.collection('items').insertOne({text: safeInput}, () => {
        res.redirect('/');
    })
}

module.exports = {
    handleCreate
}
