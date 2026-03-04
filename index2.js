
document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });
    
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    const searchTrigger = document.getElementById('searchTrigger');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    const products = [
        { name: 'Diamond Solitaire Ring', price: '$3,450', category: 'ring', img: 'assets/jewellary image 1.avif' },
        { name: 'Gold Pendant', price: '$1,200', category: 'necklace', img: 'assets/jewelalry image 2.avif' },
        { name: 'Pearl Drops Earrings', price: '$450', category: 'earring', img: 'assets/jwellary image3.avif' },
        { name: 'Gold Bracelet', price: '$890', category: 'bracelet', img: 'assets/jewellary image4.avif' },
        { name: 'Emerald Ring', price: '$2,100', category: 'ring', img: 'assets/jewellary image 5.avif' },
        { name: 'Diamond Tennis Necklace', price: '$4,200', category: 'necklace', img: 'assets/jewellary image 6.avif' },
        { name: 'Royal Gold Watch', price: '$5,999', category: 'watch', img: 'assets/jewellary image 11.jpg' },
        { name: 'Diamond Earrings', price: '$1,800', category: 'earring', img: 'assets/jewellary image 12.jpg' }
    ];
    
    searchTrigger.addEventListener('click', () => {
        searchModal.classList.add('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        setTimeout(() => searchInput.focus(), 100);
    });
    closeSearch.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });
    
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchResults.innerHTML = '';
        
        if (query.length > 0) {
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query)
            );
            
            if (filtered.length > 0) {
                filtered.forEach(product => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `
                        <img src="${product.img}" alt="${product.name}">
                        <div>
                            <h4>${product.name}</h4>
                            <p>${product.price}</p>
                        </div>
                    `;
                    item.addEventListener('click', () => {
                        searchModal.classList.remove('active');
                        document.querySelector('#collections').scrollIntoView({ behavior: 'smooth' });
                    });
                    searchResults.appendChild(item);
                });
            } else {
                searchResults.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-light)">No products found</p>';
            }
        }
    });
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cartTotal');
    
    let cart = [];
    
    
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });
    
    const closeCartFunc = () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    };
    
    closeCart.addEventListener('click', closeCartFunc);
    overlay.addEventListener('click', closeCartFunc);
    
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent.replace('$', '').replace(',', '');
            const productImg = productCard.querySelector('img').src;
            
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.qty++;
            } else {
                cart.push({
                    name: productName,
                    price: parseFloat(productPrice),
                    img: productImg,
                    qty: 1
                });
            }
            
            updateCartUI();
            
            this.textContent = 'Added!';
            this.style.background = 'var(--primary-color)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = 'white';
                this.style.color = 'black';
            }, 1500);
        });
    });
    
    function updateCartUI() {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCount.textContent = totalQty;
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        cartTotal.textContent = '$' + total.toLocaleString();
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your bag is empty</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toLocaleString()}</p>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                            <button class="remove-item" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    window.updateQty = (index, change) => {
        cart[index].qty += change;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        updateCartUI();
    };
    
    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
           
            filterBtns.forEach(b => b.classList.remove('active'));
            
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
    
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('liked');
            if (this.classList.contains('liked')) {
                this.innerHTML = '<i class="fa-solid fa-heart"></i>';
                this.style.color = '#ff4444';
            } else {
                this.innerHTML = '<i class="fa-regular fa-heart"></i>';
                this.style.color = '#333';
            }
        });
    });
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        alert(`Thank you, ${name}! Your message has been sent. We will contact you at ${email} soon.`);
        contactForm.reset();
    });
    
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}! You'll receive our latest updates.`);
        newsletterForm.reset();
    });
    
    const scrollTop = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });
    
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 5%';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '20px 5%';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    });
    
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout! Total: ' + cartTotal.textContent);
        } else {
            alert('Your cart is empty! Please add some items first.');
        }
    });
});