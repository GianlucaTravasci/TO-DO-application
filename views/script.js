document.addEventListener('click', (event) => {
    const eventSearch = event.target.classList;

    //EDIT BUTTON PRESSED
    if(eventSearch.contains("edit-me")) {
        let typed = prompt('Edit the value:', event.target.parentElement.parentElement.querySelector('.item-text').innerHTML);
        if (typed) {
            axios.post('/update-item', {text: typed, id: event.target.getAttribute('data-id')})
            .then(event.target.parentElement.parentElement.querySelector('.item-text').innerHTML = typed)
            .catch(err => {
                console.log(err); 
            })
        }
    }  
    
    //DELETE BUTTON PRESSED
    if(eventSearch.contains("delete-me")) {
        if (confirm("Do you really want to delete this item?"))
        axios.post('/delete-item', {id: event.target.getAttribute('data-id')})
            .then(event.target.parentElement.parentElement.remove())
            .catch(err => console.log('something goes wrong!'))
    }

})