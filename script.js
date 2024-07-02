let form = document.querySelector("#form-input");


class Book{
    constructor(name, author, isbn){
        this.name = name;
        this.author = author;
        this.isbn = isbn;
    }
}
class Ui{
    constructor(){

    }
    addtobooklist(book){
        let table = document.querySelector('#book-list');
        let row = document.createElement('tr')
        row.innerHTML = `<td>${book.name}</td>   
                         <td>${book.author}</td>
                         <td>${book.isbn}</td>
                         <td><button type="button" id="delete-btn" name="dlt-btn">Delete</button></td>`

        table.appendChild(row);

        document.querySelector('#name').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }

    showMessage(messege, classname){
        let div = document.createElement('div');
        div.className = classname;
        div.innerHTML = `<p>${messege}</p>`;

        //getting the other needed contents.
        let cont = document.querySelector('#first-container');
        let form = document.querySelector('#form-input');

        cont.insertBefore(div, form);

        setTimeout(()=>{
            document.querySelector(`.${classname}`).remove();
        }, 2000);
    }

    static deleteRow(tar){
        if (tar.hasAttribute('type')){
            let row = tar.parentElement.parentElement;
            let isbndelete = tar.parentElement.previousElementSibling.textContent.trim();

        
            
            ToStorage.deleteStorage(isbndelete);

            row.remove();

            let ui = new Ui();
            ui.showMessage('Deleted', 'notEntered');
        }
    }



}



class ToStorage{
    static addtostore(book){
        
        let booklist;

        if(localStorage.getItem('booklist') === null){
            booklist = [];
        }else{
            booklist = JSON.parse(localStorage.getItem('booklist'));
        }

        booklist.push(book);

        localStorage.setItem('booklist', JSON.stringify(booklist));
    }

    static resumeList(){
        let booklist;
        let ui = new Ui();

        if(localStorage.getItem('booklist') === null){
            booklist = [];
        }else{
            booklist = JSON.parse(localStorage.getItem('booklist'));
        }

        booklist.forEach(book => {
            ui.addtobooklist(book);
        });

    }

    static deleteStorage(isbn){
        let booklist;
        let ui = new Ui();

        if(localStorage.getItem('booklist') === null){
            booklist = [];
        }else{
            booklist = JSON.parse(localStorage.getItem('booklist'));
        }

        booklist = booklist.filter(book => book.isbn != isbn);

        localStorage.setItem('booklist', JSON.stringify(booklist));

    }
}


function newBook(e){
    let name = document.querySelector('#name').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

    let ui = new Ui();

    if (name === '' || author === '' || isbn === ''){

        ui.showMessage("Please fill all the inputs", 'notEntered');

    }else{
        let newBook = new Book(name, author, isbn);            
        ui.addtobooklist(newBook);
        ToStorage.addtostore(newBook);

        ui.showMessage('Added sucessfuly', 'sucess');

    }
    e.preventDefault();
}

function deleteBook(e){

    Ui.deleteRow(e.target);

    e.preventDefault();
}





form.addEventListener('submit', newBook);
document.querySelector('#book-list').addEventListener('click', deleteBook);
document.addEventListener('DOMContentLoaded', ToStorage.resumeList);