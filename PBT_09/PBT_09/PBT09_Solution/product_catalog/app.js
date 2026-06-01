// ============================================
// PRODUCT CATALOG - DOM Manipulation & Events
// ============================================

// Products Data
const productsData = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/250x200/3498db/ffffff?text=iPhone+16", rating: 4.5, inStock: true, description: "Smartphone cao cấp với camera AI và chip A18 Pro" },
    { id: 2, name: "Samsung Galaxy S24", price: 21990000, category: "phone", image: "https://placehold.co/250x200/2ecc71/ffffff?text=Galaxy+S24", rating: 4.3, inStock: true, description: "Điện thoại flagship với màn hình Dynamic AMOLED 6.2 inch" },
    { id: 3, name: "Google Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/250x200/e74c3c/ffffff?text=Pixel+9", rating: 4.4, inStock: true, description: "Pixel phone với AI magic eraser và computational photography" },
    { id: 4, name: "OnePlus 13", price: 16990000, category: "phone", image: "https://placehold.co/250x200/f39c12/ffffff?text=OnePlus+13", rating: 4.2, inStock: false, description: "Smartphone nhanh với Snapdragon 8 Elite" },
    
    { id: 5, name: "MacBook Pro 16", price: 59990000, category: "laptop", image: "https://placehold.co/250x200/34495e/ffffff?text=MacBook+Pro", rating: 4.7, inStock: true, description: "Laptop cao cấp với chip M3 Max cho creators" },
    { id: 6, name: "Dell XPS 15", price: 49990000, category: "laptop", image: "https://placehold.co/250x200/16a085/ffffff?text=Dell+XPS+15", rating: 4.6, inStock: true, description: "Ultrabook mạnh mẽ với RTX 4080" },
    { id: 7, name: "Lenovo ThinkPad X1", price: 42990000, category: "laptop", image: "https://placehold.co/250x200/c0392b/ffffff?text=ThinkPad+X1", rating: 4.4, inStock: true, description: "Business laptop chuyên nghiệp với độ bền cao" },
    { id: 8, name: "ASUS ROG Zephyrus", price: 55990000, category: "laptop", image: "https://placehold.co/250x200/8e44ad/ffffff?text=ROG+Zephyrus", rating: 4.5, inStock: false, description: "Gaming laptop mỏng nhẹ với RTX 4090" },
    
    { id: 9, name: "Sony WH-1000XM5", price: 8990000, category: "audio", image: "https://placehold.co/250x200/2980b9/ffffff?text=Sony+WH", rating: 4.8, inStock: true, description: "Tai nghe chống ồn tốt nhất thế giới" },
    { id: 10, name: "Apple AirPods Max", price: 12990000, category: "audio", image: "https://placehold.co/250x200/95a5a6/ffffff?text=AirPods+Max", rating: 4.4, inStock: true, description: "Tai nghe over-ear tương lai từ Apple" },
    { id: 11, name: "Sennheiser Momentum", price: 7990000, category: "audio", image: "https://placehold.co/250x200/1abc9c/ffffff?text=Momentum", rating: 4.5, inStock: true, description: "Tai nghe âm thanh chất lượng cao" },
    { id: 12, name: "JBL Flip 6", price: 3990000, category: "audio", image: "https://placehold.co/250x200/e67e22/ffffff?text=JBL+Flip+6", rating: 4.2, inStock: true, description: "Loa bluetooth di động cho mọi lúc, mọi nơi" },
    
    { id: 13, name: "iPad Pro 12.9", price: 34990000, category: "tablet", image: "https://placehold.co/250x200/3498db/ffffff?text=iPad+Pro", rating: 4.6, inStock: true, description: "Tablet cao cấp với chip M2 cho creators" },
    { id: 14, name: "Samsung Galaxy Tab S10", price: 29990000, category: "tablet", image: "https://placehold.co/250x200/2ecc71/ffffff?text=Tab+S10", rating: 4.4, inStock: true, description: "Tablet Android mạnh mẽ với S Pen" },
    { id: 15, name: "Microsoft Surface Pro 10", price: 27990000, category: "tablet", image: "https://placehold.co/250x200/e74c3c/ffffff?text=Surface+Pro", rating: 4.5, inStock: false, description: "Tablet 2-in-1 chuyên nghiệp" },
];

// App State
const catalogApp = {
    products: productsData,
    filteredProducts: productsData,
    currentFilter: 'all',
    currentSort: 'default',
    cartCount: 0,
    isDarkMode: false,
    
    // DOM Elements
    searchInput: document.querySelector('#searchInput'),
    productsGrid: document.querySelector('#productsGrid'),
    emptyState: document.querySelector('#emptyState'),
    categoryFilter: document.querySelector('#categoryFilter'),
    sortSelect: document.querySelector('#sortSelect'),
    darkModeBtn: document.querySelector('#darkModeBtn'),
    cartBadge: document.querySelector('#cartCount'),
    productModal: document.querySelector('#productModal'),
    modalBody: document.querySelector('#modalBody'),
    modalClose: document.querySelector('.modal-close'),
    notification: document.querySelector('#notification'),
    notificationText: document.querySelector('#notificationText'),
    
    // Initialize
    init() {
        this.loadDarkMode();
        this.renderCategories();
        this.render();
        this.attachEventListeners();
    },
    
    // ========== EVENT LISTENERS ==========
    attachEventListeners() {
        // Search
        this.searchInput.addEventListener('input', () => {
            this.filterAndRender();
        });
        
        // Sort
        this.sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.filterAndRender();
        });
        
        // Dark mode
        this.darkModeBtn.addEventListener('click', () => {
            this.toggleDarkMode();
        });
        
        // Category filter - Event delegation
        this.categoryFilter.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.category;
                this.filterAndRender();
            }
        });
        
        // Products grid - Event delegation
        this.productsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            
            if (e.target.classList.contains('btn-view')) {
                const id = parseInt(card.dataset.id);
                this.showProductDetail(id);
            } else if (e.target.classList.contains('btn-cart')) {
                e.stopPropagation();
                this.showNotification('✅ Thêm vào giỏ hàng thành công!');
                this.cartCount++;
                this.updateCartBadge();
            }
        });
        
        // Modal close
        this.modalClose.addEventListener('click', () => {
            this.closeModal();
        });
        
        document.addEventListener('click', (e) => {
            if (e.target === this.productModal) {
                this.closeModal();
            }
        });
        
        // Keyboard: Escape để đóng modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.productModal.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    },
    
    // ========== RENDER FUNCTIONS ==========
    renderCategories() {
        const categories = ['all', ...new Set(this.products.map(p => p.category))];
        
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            if (cat === 'all') btn.classList.add('active');
            btn.dataset.category = cat;
            
            const labels = {
                'all': '📋 Tất cả',
                'phone': '📱 Điện thoại',
                'laptop': '💻 Laptop',
                'audio': '🎧 Âm thanh',
                'tablet': '📱 Tablet'
            };
            
            btn.textContent = labels[cat] || cat;
            this.categoryFilter.appendChild(btn);
        });
    },
    
    filterAndRender() {
        this.filteredProducts = this.products.filter(product => {
            // Filter by category
            if (this.currentFilter !== 'all' && product.category !== this.currentFilter) {
                return false;
            }
            
            // Filter by search
            const searchTerm = this.searchInput.value.toLowerCase();
            if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) {
                return false;
            }
            
            return true;
        });
        
        // Sort
        this.applySort();
        this.render();
    },
    
    applySort() {
        switch(this.currentSort) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating-desc':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }
    },
    
    render() {
        this.productsGrid.innerHTML = '';
        
        if (this.filteredProducts.length === 0) {
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            this.filteredProducts.forEach(product => {
                const card = this.createProductCard(product);
                this.productsGrid.appendChild(card);
            });
        }
    },
    
    createProductCard(product) {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.dataset.id = product.id;
        
        // Image
        const img = document.createElement('img');
        img.className = 'product-image';
        img.src = product.image;
        img.alt = product.name;
        div.appendChild(img);
        
        // Info
        const info = document.createElement('div');
        info.className = 'product-info';
        
        // Name
        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.name;
        info.appendChild(name);
        
        // Category
        const category = document.createElement('p');
        category.className = 'product-category';
        category.textContent = this.getCategoryLabel(product.category);
        info.appendChild(category);
        
        // Rating
        const rating = document.createElement('p');
        rating.className = 'product-rating';
        rating.textContent = '⭐ ' + product.rating + '/5.0';
        info.appendChild(rating);
        
        // Price
        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = this.formatPrice(product.price);
        info.appendChild(price);
        
        // Stock
        const stock = document.createElement('p');
        stock.className = 'product-stock ' + (product.inStock ? 'in-stock' : 'out-of-stock');
        stock.textContent = product.inStock ? '✅ Có sẵn' : '❌ Hết hàng';
        info.appendChild(stock);
        
        // Actions
        const actions = document.createElement('div');
        actions.className = 'product-actions';
        
        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn btn-view';
        viewBtn.textContent = 'Xem chi tiết';
        actions.appendChild(viewBtn);
        
        const cartBtn = document.createElement('button');
        cartBtn.className = 'btn btn-cart';
        cartBtn.textContent = '🛒 Giỏ';
        cartBtn.disabled = !product.inStock;
        actions.appendChild(cartBtn);
        
        info.appendChild(actions);
        div.appendChild(info);
        
        return div;
    },
    
    showProductDetail(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;
        
        this.modalBody.innerHTML = '';
        
        // Image
        const img = document.createElement('img');
        img.className = 'modal-image';
        img.src = product.image;
        img.alt = product.name;
        this.modalBody.appendChild(img);
        
        // Title
        const title = document.createElement('h2');
        title.className = 'modal-title';
        title.textContent = product.name;
        this.modalBody.appendChild(title);
        
        // Category
        const category = document.createElement('p');
        category.className = 'modal-category';
        category.textContent = this.getCategoryLabel(product.category);
        this.modalBody.appendChild(category);
        
        // Rating
        const rating = document.createElement('p');
        rating.className = 'modal-rating';
        rating.textContent = '⭐ ' + product.rating + '/5.0';
        this.modalBody.appendChild(rating);
        
        // Price
        const price = document.createElement('p');
        price.className = 'modal-price';
        price.textContent = this.formatPrice(product.price);
        this.modalBody.appendChild(price);
        
        // Description
        const description = document.createElement('p');
        description.className = 'modal-description';
        description.textContent = product.description;
        this.modalBody.appendChild(description);
        
        // Button
        const btn = document.createElement('button');
        btn.className = 'modal-button';
        btn.textContent = product.inStock ? '🛒 Thêm vào giỏ' : '❌ Hết hàng';
        btn.disabled = !product.inStock;
        btn.addEventListener('click', () => {
            if (product.inStock) {
                this.showNotification('✅ Thêm vào giỏ hàng thành công!');
                this.cartCount++;
                this.updateCartBadge();
                this.closeModal();
            }
        });
        this.modalBody.appendChild(btn);
        
        this.productModal.classList.remove('hidden');
    },
    
    closeModal() {
        this.productModal.classList.add('hidden');
    },
    
    // ========== UTILITY FUNCTIONS ==========
    formatPrice(price) {
        return price.toLocaleString('vi-VN') + ' đ';
    },
    
    getCategoryLabel(category) {
        const labels = {
            'phone': '📱 Điện thoại',
            'laptop': '💻 Laptop',
            'audio': '🎧 Âm thanh',
            'tablet': '📱 Tablet'
        };
        return labels[category] || category;
    },
    
    showNotification(message) {
        this.notificationText.textContent = message;
        this.notification.classList.remove('hidden');
        
        setTimeout(() => {
            this.notification.classList.add('hidden');
        }, 2000);
    },
    
    updateCartBadge() {
        this.cartBadge.textContent = this.cartCount;
    },
    
    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', this.isDarkMode);
        this.darkModeBtn.textContent = this.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    },
    
    loadDarkMode() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            this.darkModeBtn.textContent = '☀️ Light Mode';
        }
    }
};

// ========== START APP ==========
document.addEventListener('DOMContentLoaded', () => {
    catalogApp.init();
});
