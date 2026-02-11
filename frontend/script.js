const API_URL = 'https://actividad-4-fullstack.onrender.com'
let token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        mostrarDashboard();
    } else {
        mostrarLogin();
    }

    // Event Listeners (Escuchamos los clics y envíos)
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('product-form').addEventListener('submit', handleCreateProduct);
    document.getElementById('btn-logout').addEventListener('click', logout);
    document.getElementById('btn-register').addEventListener('click', registrarRapido);
});

function mostrarDashboard() {
    document.getElementById('auth-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    cargarProductos();
}

function mostrarLogin() {
    document.getElementById('auth-view').classList.remove('hidden');
    document.getElementById('dashboard-view').classList.add('hidden');
}


// 1. LOGIN
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            token = data.token;
            localStorage.setItem('token', token);
            mostrarDashboard();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Error de conexión');
    }
}

// 2. OBTENER PRODUCTOS
async function cargarProductos() {
    const list = document.getElementById('product-list');
    const countBadge = document.getElementById('prod-count');
    
    try {
        const res = await fetch(`${API_URL}/products`);
        const products = await res.json();

        list.innerHTML = ''; // Limpiar
        countBadge.innerText = `${products.length} items`;

        if (products.length === 0) {
            list.innerHTML = '<div class="alert alert-light text-center">No hay productos. ¡Agrega uno!</div>';
            return;
        }

        products.forEach(prod => {
            const item = document.createElement('div');
            item.className = 'list-group-item d-flex justify-content-between align-items-center p-3';
            item.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="ms-2">
                        <h6 class="mb-0 fw-bold">${prod.name}</h6>
                        <small class="text-muted">${prod.category || 'General'} • Stock: ${prod.stock}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <span class="price-tag me-3">$${prod.price}</span>
                    <button class="btn btn-outline-danger btn-sm rounded-circle" onclick="borrarProducto('${prod._id}')">
                        🗑️
                    </button>
                </div>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        list.innerHTML = '<p class="text-danger">Error al cargar productos</p>';
    }
}

// 3. CREAR PRODUCTO
async function handleCreateProduct(e) {
    e.preventDefault();
    
    const newProduct = {
        name: document.getElementById('prod-name').value,
        price: Number(document.getElementById('prod-price').value),
        description: document.getElementById('prod-desc').value,
        stock: Number(document.getElementById('prod-stock').value),
        category: document.getElementById('prod-cat').value
    };

    try {
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(newProduct)
        });

        if (res.ok) {
            document.getElementById('product-form').reset();
            cargarProductos();
        } else {
            alert('No tienes permiso o faltan datos.');
        }
    } catch (error) { console.error(error); }
}

// 4. BORRAR PRODUCTO
window.borrarProducto = async (id) => {
    if(!confirm('¿Eliminar este producto permanentemente?')) return;

    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': token }
        });

        if (res.ok) {
            cargarProductos();
        } else {
            alert('Error al eliminar');
        }
    } catch (error) { console.error(error); }
};

function logout() {
    localStorage.removeItem('token');
    token = null;
    mostrarLogin();
}

async function registrarRapido() {
    const user = prompt("Usuario nuevo:");
    const email = prompt("Email nuevo:");
    const pass = prompt("Contraseña nueva:");
    
    if(!user || !email || !pass) return;

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, email, password: pass })
        });
        if(res.ok) alert('Registrado. Ahora inicia sesión.');
    } catch (e) { console.error(e); }
}