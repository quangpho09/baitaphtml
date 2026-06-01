// ============================================
// GALLERY - INFINITE SCROLL
// ============================================

const galleryAPI = {
    baseURL: "https://jsonplaceholder.typicode.com",
    currentPage: 1,
    itemsPerPage: 20,
    allPhotos: [],

    async loadPhotos(page) {
        // TODO: Fetch photos từ API
        // GET https://jsonplaceholder.typicode.com/photos?_page={page}&_limit=20
        // Hoặc: https://picsum.photos/v2/list?page={page}&limit=20
        
        throw new Error("TODO: Implement loadPhotos");
    }
};

// ============================================
// LAZY LOADING - IntersectionObserver
// ============================================

const lazyLoader = {
    observer: null,

    init() {
        // TODO: Tạo IntersectionObserver
        // Khi ảnh xuất hiện trong viewport → load ảnh thật
        // Thay thế src từ placeholder
    },

    observeImage(img) {
        if (this.observer) {
            this.observer.observe(img);
        }
    }
};

// ============================================
// INFINITE SCROLL - IntersectionObserver
// ============================================

const infiniteScroll = {
    observer: null,
    isLoading: false,

    init() {
        // TODO: Tạo IntersectionObserver cho #loadTrigger
        // Khi loadTrigger visible → gọi loadMorePhotos()
    }
};

// ============================================
// UI LAYER
// ============================================

const ui = {
    elements: {
        gallery: document.getElementById('gallery'),
        loadingIndicator: document.getElementById('loadingIndicator'),
        lightbox: document.getElementById('lightbox'),
        lightboxImage: document.getElementById('lightboxImage'),
        lightboxClose: document.querySelector('.lightbox-close'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn')
    },

    showLoading() {
        this.elements.loadingIndicator.classList.remove('hidden');
    },

    hideLoading() {
        this.elements.loadingIndicator.classList.add('hidden');
    },

    addPhotos(photos) {
        photos.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'gallery-item loading';
            
            // TODO: Tạo img element
            // Dùng placeholder image hoặc data-src for lazy loading
            
            item.onclick = () => this.openLightbox(photo);
            this.elements.gallery.appendChild(item);
        });
    },

    openLightbox(photo) {
        // TODO: Hiển thị ảnh lớn trong lightbox
        this.elements.lightbox.classList.remove('hidden');
    },

    closeLightbox() {
        this.elements.lightbox.classList.add('hidden');
    }
};

// ============================================
// STATE
// ============================================

let currentPhotoIndex = 0;

// ============================================
// MAIN FUNCTIONS
// ============================================

async function loadMorePhotos() {
    if (infiniteScroll.isLoading) return;

    infiniteScroll.isLoading = true;
    ui.showLoading();

    try {
        const photos = await galleryAPI.loadPhotos(galleryAPI.currentPage);
        galleryAPI.allPhotos = [...galleryAPI.allPhotos, ...photos];
        ui.addPhotos(photos);
        galleryAPI.currentPage++;
    } catch (error) {
        console.error('Error loading photos:', error);
    } finally {
        ui.hideLoading();
        infiniteScroll.isLoading = false;
    }
}

function showPrevPhoto() {
    currentPhotoIndex--;
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = galleryAPI.allPhotos.length - 1;
    }
    updateLightboxImage();
}

function showNextPhoto() {
    currentPhotoIndex++;
    if (currentPhotoIndex >= galleryAPI.allPhotos.length) {
        currentPhotoIndex = 0;
    }
    updateLightboxImage();
}

function updateLightboxImage() {
    // TODO: Cập nhật ảnh trong lightbox
}

// ============================================
// EVENT LISTENERS
// ============================================

ui.elements.lightboxClose.addEventListener('click', () => {
    ui.closeLightbox();
});

ui.elements.lightbox.addEventListener('click', (e) => {
    if (e.target === ui.elements.lightbox) {
        ui.closeLightbox();
    }
});

ui.elements.prevBtn.addEventListener('click', showPrevPhoto);
ui.elements.nextBtn.addEventListener('click', showNextPhoto);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (ui.elements.lightbox.classList.contains('hidden')) return;

    if (e.key === 'ArrowLeft') showPrevPhoto();
    if (e.key === 'ArrowRight') showNextPhoto();
    if (e.key === 'Escape') ui.closeLightbox();
});

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Gallery initialized');
    
    // TODO:
    // 1. Initialize lazyLoader
    // 2. Initialize infiniteScroll
    // 3. Load initial photos
    
    await loadMorePhotos();
});
