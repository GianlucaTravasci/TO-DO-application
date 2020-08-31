const handleRead = (req, res, DB) => {
    DB.collection('items').find().toArray((err, items) => {
        res.render('todo.ejs', {todoTasks: items});
    });
}

module.exports = {
    handleRead
}