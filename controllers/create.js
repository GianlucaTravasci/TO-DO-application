const handleCreate = (req, res, DB) => {
    DB.collection('items').insertOne({text: req.body.item}, () => {
        res.redirect('/');
    })
}

module.exports = {
    handleCreate
}
