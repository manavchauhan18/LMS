document.addEventListener('DOMContentLoaded', function() {

    var modal = document.getElementById("editBookModel");
    var btn = document.getElementById("edit-book");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";

        let hiddenTitle = document.getElementById("hidden-book-title");
        hiddenTitle.value = btn.getAttribute('data-name');
        document.getElementById('newBookName').value = btn.getAttribute('data-name');
        document.getElementById('newBookAuthor').value = btn.getAttribute('data-author');
        document.getElementById('newBookPrice').value = btn.getAttribute('data-price');
        document.getElementById('newBookPages').value = btn.getAttribute('data-pages');    
    }

    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


});
