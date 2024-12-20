// script.js

// Banco de dados simulado para armazenar os usuários
let users = {};

// Registro de usuário
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;

    if (!regUsername.startsWith('!')) {
        alert('O nome de usuário deve começar com "!"');
        return;
    }

    if (users[regUsername]) {
        alert('Usuário já existe.');
        return;
    }

    users[regUsername] = regPassword;
    alert('Registro bem-sucedido!');
    localStorage.setItem('currentUser', regUsername);
    localStorage.setItem('users', JSON.stringify(users)); // Armazena usuários no localStorage
    window.location.href = 'index.html';
});

// Login de usuário
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    users = JSON.parse(localStorage.getItem('users')) || {}; // Recupera os usuários do localStorage

    if (users[username] && users[username] === password) {
        alert('Login bem-sucedido!');
        localStorage.setItem('currentUser', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuário ou senha incorretos.');
    }
});

// Exibição do nome do usuário na página inicial e de perfil
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.innerText = `Bem-vindo, ${currentUser}!`;
        }

        const profileUsername = document.getElementById('profileUsername');
        if (profileUsername) {
            profileUsername.innerText = `Nome de Usuário: ${currentUser}`;
        }
    } else {
        const path = window.location.pathname.split('/').pop();
        if (path !== 'login.html' && path !== 'register.html') {
            window.location.href = 'login.html'; // Redireciona para a página de login se não estiver logado
        }
    }
};

// Postagem de conteúdo
document.getElementById('postForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    addPost(title, description);
    document.getElementById('postForm').reset();
});

function addPost(title, description) {
    const postsContainer = document.getElementById('postsContainer');
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    postsContainer.appendChild(postDiv);
}

// Função de logout
function logout() {
    localStorage.removeItem('currentUser');
    alert('Você saiu!');
    window.location.href = 'login.html';
}
