function loadBooksUnam() {
    fetch('LibrosUNAM.csv')
    .then(response => response.text())
    .then(data => {
        const books = data.split('\n').map(line => line.split(','));
        displayBooks(books, 'listaLibrosUNAM');
    });
}

function loadBooks() {
    fetch('Libros.csv')
    .then(response => response.text())
    .then(data => {
        const books = data.split('\n').map(line => line.split(','));
        displayBooks(books, 'listaLibros');
    });
}

function displayBooks(books, listId) {
    const listaLibros = document.getElementById(listId);
    listaLibros.innerHTML = '';
    
    // Cargar los enlaces desde linksparte1.csv
    fetch('linksparte1.csv')
    .then(response => response.text())
    .then(linksData => {
        const links = linksData.split('\n').map(line => line.trim());
        
        // Iterar sobre cada libro y su enlace correspondiente
        books.forEach((book, index) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = `${book[0]} ${book[1]} ${book[2]} ${book[3]} ${book[4]} ${book[5]} ${book[6]}`;
            link.href = links[index] || '#'; // Asignar el enlace correspondiente, o '#' si no hay enlace disponible
            li.appendChild(link);
            listaLibros.appendChild(li);
        });
    });
}

function displayBooksUnam(books, listId) {
    const listaLibros = document.getElementById(listId);
    listaLibros.innerHTML = '';
    books.slice(0, 18).forEach(book => { // Mostrar solo los primeros 6 libros
        const li = document.createElement('li');
        li.textContent = `${book[0]} ${book[1]} ${book[2]} ${book[3]} ${book[4]} ${book[5]}`; // Mostrar solo los primeros 6 elementos del array
        listaLibros.appendChild(li);
    });
}

function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    
    fetch('Libros.csv')
    .then(response => response.text())
    .then(data => {
        const books = data.split('\n').map(line => line.split(','));
        const filteredBooks = books.filter(book => {
            const bookInfo = book.join(' ').toLowerCase(); // Concatenar la información del libro en una sola cadena
            return bookInfo.includes(searchTerm); // Verificar si la cadena contiene el término de búsqueda
        });
        displayBooks(filteredBooks, 'listaLibros');
    });
}


function searchBooksUnam(event) {
    const searchTermUnam = event.target.value.toLowerCase();
    
    fetch('LibrosUNAM.csv')
    .then(response => response.text())
    .then(data => {
        const books = data.split('\n').map(line => line.split(','));
        const filteredBooks = books.filter(book => {
            const bookInfo = book.join(' ').toLowerCase();
            return bookInfo.includes(searchTermUnam);
        });
        displayBooksUnam(filteredBooks, 'listaLibrosUNAM');
    });
}


loadBooksUnam();
loadBooks();


function loadInformation() {
    fetch('ContenidoInformacion.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const informationContent = lines.join('<br>'); 
            const informationSection = document.getElementById('info');
            informationSection.innerHTML = informationContent;
            // showSection('info');
        })
        .catch(error => {
            console.error('Error al cargar la información:', error);
        });
}

loadInformation();


function loadMaterials() {
    const listaMateriales = document.getElementById('listaMateriales');
    listaMateriales.innerHTML = '';

    const materials = [
        ["Kolman B. Busby C. & Ross S.", "(1997).", "Estructuras de matemáticas discretas para la computación (3.a ed.).", "Pearson Educación.", "https://books.google.com.mx/books?id=7GJXRsNkglIC&printsec=frontcover&hl=es&source=gbs_ge_summary_r&cad=0#v=onepage&q&f=false"],
        ["Grimaldi P.", "(1998).", "Matemáticas discretas y combinatoria: una introducción con aplicaciones.", "Argentina: Pearson Educación.", "https://cutt.ly/nwB4vQhB"],
        ["Espinosa R.", "(2010).", "Matemáticas discretas.", "Colombia: Bookwire GmbH.", "https://cutt.ly/kwB4vKQX"],
        ["Fernández A. Sánchez HernándezJ. Martínez Montaña M.", "(2023).", "Matemáticas Discretas: Con un enfoque desde la ingeniería y ciencias sociales - Conceptos básicos.", "Colombia: Editorial de la Universidad Pedagógica y Tecnológica de Colombia, UPTC.", "https://cutt.ly/nwB4v0lK"],
        ["Vílchez E.", "(2015).", "Estructuras discretas con Mathematica.", "Colombia: Alpha Editorial.", "https://cutt.ly/bwB4by0I"]
    ];

    materials.forEach(material => {
        const li = document.createElement('li');
        material.forEach((item, index) => {
            if (index === 4) { 
                const a = document.createElement('a');
                a.textContent = item;
                a.href = item; 
                a.target = "_blank"; 
                li.appendChild(a);
            } else {
                const span = document.createElement('span');
                span.textContent = item;
                li.appendChild(span);
            }
            if (index !== material.length - 1) { 
                li.appendChild(document.createTextNode(' '));
            }
        });
        listaMateriales.appendChild(li);
    });
}

loadMaterials();


var isLoggedIn = false; 

function showSection(sectionId) {
    
    var sections = document.querySelectorAll('.content');
    sections.forEach(function(section) {
        section.classList.remove('slide-down'); 
        section.style.display = 'none';
    });

    
    var section = document.getElementById(sectionId);
    section.classList.add('slide-down'); 
    section.style.display = 'block';

    
    document.body.style.backgroundColor = window.getComputedStyle(section).getPropertyValue('background-color');
}

function toggleLoginForm() {
    var loginSection = document.getElementById('loginSection');
    loginSection.style.display = (loginSection.style.display === 'none' || loginSection.style.display === '') ? 'block' : 'none';
    document.body.style.backgroundColor = loginSection.style.display === 'block' ? 'black' : ''; 
}

function login(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    readCSV("users.csv")
        .then(usersData => {
            var isAuthenticated = checkCredentials(usersData, email, password);

            if (isAuthenticated) {
                var userSection = document.getElementById('userSection');
                userSection.innerHTML = '<p>Bienvenido, ' + email + '!</p><button class="login-btn" onclick="logout()">Cerrar sesión</button>';

                var loginSection = document.getElementById('loginSection');
                loginSection.style.display = 'none';

                var editButtons = document.querySelectorAll('.edit-btn');
                editButtons.forEach(function(button) {
                    button.style.display = 'inline-block';
                });

                isLoggedIn = true;
            } else {
                alert('Credenciales incorrectas. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de usuarios:', error);
        });
}

function readCSV(filename) {
    return new Promise((resolve, reject) => {
        fetch(filename)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(csvData => {
                const lines = csvData.trim().split('\n');
                const usersData = lines.map(line => line.split(','));
                resolve(usersData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function checkCredentials(usersData, email, password) {
    for (var i = 0; i < usersData.length; i++) {
        if (usersData[i][0] === email && usersData[i][1] === password) {
            return true;
        }
    }
    return false;
}

function logout() {
    
    var userSection = document.getElementById('userSection');
    userSection.innerHTML = '<button id="loginBtn" class="login-btn" onclick="toggleLoginForm()">Iniciar sesión</button>';

    
    var editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(function(button) {
        button.style.display = 'none';
    });

    isLoggedIn = false; 
}

function openModal() {
    var modal = document.getElementById('editModal');
    modal.style.display = 'block';
    modal.style.width = '100%'; 
    modal.style.height = '100%'; 
    modal.style.margin = '5% auto'; 
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function checkAndLoadContentForEdit(sectionId) {
    if (isLoggedIn) {
        loadContentForEdit(sectionId);
    } else {
        alert('Debes iniciar sesión para editar contenido.');
    }
}

function loadContentForEdit(sectionId) {
    toggleEdit(sectionId);
    var section = document.getElementById(sectionId);
    var content = section.innerHTML;
    document.getElementById('editContent').value = content;
    openModal();
}

function saveEditedContent() {
    var editedContent = document.getElementById('editContent').value;
    var sectionId = document.querySelector('.modal').dataset.sectionId;
    var section = document.getElementById(sectionId);
    section.innerHTML = editedContent;
    saveContent(sectionId, editedContent);
    closeModal();
}

function saveContent(sectionId, content) {
    localStorage.setItem(sectionId, content);
}

function loadContent() {
    Object.keys(localStorage).forEach(function(key) {
        var section = document.getElementById(key);
        if (section) {
            section.innerHTML = localStorage.getItem(key);
        }
    });
}

window.addEventListener('load', function() {
    loadContent();
});

function toggleEdit(sectionId) {
    if (isLoggedIn) {
        var section = document.getElementById(sectionId);
        var content = section.innerHTML;
        var newContent = prompt('Edita el contenido:', content);

        if (newContent !== null) {
            section.innerHTML = newContent;
            saveContent(sectionId, newContent);
        }
    } else {
        alert('Debes iniciar sesión para editar contenido.');
    }
}
