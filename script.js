// BANCO DE DADOS DE PRODUTOS SIMULADO
const products = [
    { id: 1, name: "Sementes de Soja Premium (Sacaria)", category: "graos", price: 180.00, img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=500" },
    { id: 2, name: "Trator Agrícola 4x4 Semi-Novo", category: "maquinas", price: 245000.00, img: "https://images.unsplash.com/photo-1594142345020-f5979c3ba455?q=80&w=500" },
    { id: 3, name: "Fertilizante Orgânico NPK (Tonelada)", category: "insumos", price: 1200.00, img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=500" },
    { id: 4, name: "Sementes de Milho Híbrido", category: "graos", price: 210.00, img: "https://images.unsplash.com/photo-1551754625-e0329ea3181d?q=80&w=500" },
    { id: 5, name: "Drone de Pulverização Agrícola T40", category: "maquinas", price: 89000.00, img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=500" },
    { id: 6, name: "Defensivo Agrícola Protetor", category: "insumos", price: 450.00, img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=500" }
];

let cart = [];

// ELEMENTOS DO DOM
const productsGrid = document.getElementById('products-grid');
const themeToggleBtn = document.getElementById('theme-toggle');
const googleLoginBtn = document.getElementById('google-login-btn');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const filterBtns = document.querySelectorAll('.filter-btn');

// 1. MODO CLARO / MODO ESCURO
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});

// 2. SIMULAÇÃO LOGIN COM GOOGLE
googleLoginBtn.addEventListener('click', () => {
    if(googleLoginBtn.classList.contains('logged-in')) {
        // Deslogar
        googleLoginBtn.innerHTML = '<i class="fa-brands fa-google"></i> Entrar com Google';
        googleLoginBtn.classList.remove('logged-in');
        googleLoginBtn.style.backgroundColor = '#4285F4';
        alert('Você saiu da sua conta.');
    } else {
        // Logar
        googleLoginBtn.innerHTML = '<i class="fa-solid fa-user"></i> Olá, Produtor Rural';
        googleLoginBtn.classList.add('logged-in');
        googleLoginBtn.style.backgroundColor = '#27ae60';
        alert('Login efetuado com sucesso via Google (Simulação)!');
    }
});

// 3. RENDERIZAR PRODUTOS DO MARKETPLACE
function displayProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3>${product.name}</h3>
                <div class="product-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// FILTROS DO MARKETPLACE
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        displayProducts(e.target.dataset.filter);
    });
});

// 4. FUNCIONALIDADES DO CARRINHO
cartToggle.addEventListener('click', () => cartSidebar.classList.add('open'));
closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));

window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const inCart = cart.find(item => item.id === id);

    if (inCart) {
        inCart.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    cartSidebar.classList.add('open'); // abre o carrinho ao adicionar
};

function updateCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Seu carrinho está vazio.</p>';
        cartCount.innerText = '0';
        cartTotal.innerText = 'R$ 0,00';
        return;
    }

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <small>${item.quantity}x R$ ${item.price.toFixed(2)}</small>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:#e74c3c; cursor:pointer;">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartCount.innerText = count;
    cartTotal.innerText = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

// INICIALIZAÇÃO
displayProducts();