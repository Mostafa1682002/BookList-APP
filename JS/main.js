class Book{
    constructor(title,auther,isbn){
        this.title=title;
        this.auther=auther;
        this.isbn=isbn;
    }
}


class UI{
    static displayBooks(){
        // const storegBooks=[
        //     {
        //         title:"Book one",
        //         auther:"Mostafa",
        //         isbn:"#5746"
        //     },
        //     {
        //         title:"Book Two",
        //         auther:"Mostafa",
        //         isbn:"#5746"
        //     },
        //     {
        //         title:"Book three",
        //         auther:"Mostafa",
        //         isbn:"#5746"
        //     }
        // ]
        // const Books=Store.storegBooks;
        const Books=Store.getBook();
        Books.forEach((book)=>UI.addBookToList(book));
    }

    //ADD BOOK To Lost
    static addBookToList(book){
        let row=document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
                    <td>${book.auther}</td>
                    <td>${book.isbn}</td>
                    <td>
                        <span class="btn btn-danger btn-sm delete">Delete</span>
                    </td>`
        document.querySelector('tbody').appendChild(row);
    }

    //Clear Fields
    static clearfilds(){
        document.getElementById('title').value='';
        document.getElementById('autour').value='';
        document.getElementById('isbn').value='';
    }

    //Alert
    static showAlert(message,className){
        let div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        form.before(div);
        //delete alert after 3 seconds
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
    }

    //delete Book
    static deleteBook(ele){
        if(ele.classList.contains('delete')){
            console.log(ele.parentElement.parentElement);
            ele.parentElement.parentElement.remove();
        }
    }
    
}

class Store{
    static getBook(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books=Store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    
    static removeBook(isbn){
        const books=Store.getBook();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

document.addEventListener("DOMContentLoaded",UI.displayBooks);



let form=document.getElementById("book-form");
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let title=document.getElementById('title').value;
    let autour=document.getElementById('autour').value;
    let isbn=document.getElementById('isbn').value;

    //validate
    if(title==''||autour=='' ||isbn==''){
        UI.showAlert('Please Fill In All Felids','danger');
    }else{
        //New Object 
        let book=new Book(title,autour,isbn);

        //add book to list
        UI.addBookToList(book);

        //Add Book To Store 
        Store.addBook(book);

        //Alert Success
        UI.showAlert('Book Added','success');

        //claer All Fields
        UI.clearfilds();        
    }
})

let book_list=document.getElementById("book-list")

book_list.addEventListener('click',(e)=>{
    //remove book from UI
    UI.deleteBook(e.target);

    //remove book from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Alert Success
    UI.showAlert('Book Removed','success');
})


