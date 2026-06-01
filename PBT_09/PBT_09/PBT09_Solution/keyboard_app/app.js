// ============================================
// KEYBOARD SHORTCUTS APP - Accessibility
// ============================================

const keyboardApp = {
    // Gallery data
    images: [
        { id: 1, src: 'https://placehold.co/800x600/3498db/ffffff?text=Image+1', alt: 'Gallery image 1' },
        { id: 2, src: 'https://placehold.co/800x600/2ecc71/ffffff?text=Image+2', alt: 'Gallery image 2' },
        { id: 3, src: 'https://placehold.co/800x600/e74c3c/ffffff?text=Image+3', alt: 'Gallery image 3' },
        { id: 4, src: 'https://placehold.co/800x600/f39c12/ffffff?text=Image+4', alt: 'Gallery image 4' },
        { id: 5, src: 'https://placehold.co/800x600/9b59b6/ffffff?text=Image+5', alt: 'Gallery image 5' },
        { id: 6, src: 'https://placehold.co/800x600/1abc9c/ffffff?text=Image+6', alt: 'Gallery image 6' },
        { id: 7, src: 'https://placehold.co/800x600/34495e/ffffff?text=Image+7', alt: 'Gallery image 7' },
        { id: 8, src: 'https://placehold.co/800x600/16a085/ffffff?text=Image+8', alt: 'Gallery image 8' },
        { id: 9, src: 'https://placehold.co/800x600/c0392b/ffffff?text=Image+9', alt: 'Gallery image 9' },
        { id: 10, src: 'https://placehold.co/800x600/8e44ad/ffffff?text=Image+10', alt: 'Gallery image 10' },
        { id: 11, src: 'https://placehold.co/800x600/2980b9/ffffff?text=Image+11', alt: 'Gallery image 11' },
        { id: 12, src: 'https://placehold.co/800x600/27ae60/ffffff?text=Image+12', alt: 'Gallery image 12' }
    ],
    
    currentImageIndex: 0,
    isPlaying: false,
    slideshowInterval: null,
    
    // Commands
    commands: [
        { id: 1, name: 'Previous Image', desc: '← Previous', action: () => keyboardApp.previousImage() },
        { id: 2, name: 'Next Image', desc: '→ Next', action: () => keyboardApp.nextImage() },
        { id: 3, name: 'Play/Pause Slideshow', desc: 'Space', action: () => keyboardApp.toggleSlideshow() },
        { id: 4, name: 'Go to Image 1', desc: '1', action: () => keyboardApp.goToImage(0) },
        { id: 5, name: 'Go to Image 2', desc: '2', action: () => keyboardApp.goToImage(1) },
        { id: 6, name: 'Go to Image 3', desc: '3', action: () => keyboardApp.goToImage(2) },
        { id: 7, name: 'Open in Fullscreen', desc: 'Enter', action: () => keyboardApp.openFullscreen() },
        { id: 8, name: 'Close Command Palette', desc: 'Escape', action: () => keyboardApp.closePalette() }
    ],
    
    selectedCommandIndex: 0,
    
    // DOM Elements
    galleryImage: document.querySelector('#galleryImage'),
    slideCounter: document.querySelector('#slideCounter'),
    playBtn: document.querySelector('#playBtn'),
    galleryThumbnails: document.querySelector('#galleryThumbnails'),
    imageModal: document.querySelector('#imageModal'),
    modalImage: document.querySelector('#modalImage'),
    commandPalette: document.querySelector('#commandPalette'),
    commandInput: document.querySelector('#commandInput'),
    commandList: document.querySelector('#commandList'),
    
    // Initialize
    init() {
        this.renderGallery();
        this.displayImage();
        this.attachEventListeners();
    },
    
    // ========== EVENT LISTENERS ==========
    attachEventListeners() {
        // Navigation buttons
        document.querySelector('.nav-btn.prev').addEventListener('click', () => {
            this.previousImage();
        });
        
        document.querySelector('.nav-btn.next').addEventListener('click', () => {
            this.nextImage();
        });
        
        // Play button
        this.playBtn.addEventListener('click', () => {
            this.toggleSlideshow();
        });
        
        // Gallery image click - open fullscreen
        this.galleryImage.addEventListener('click', () => {
            this.openFullscreen();
        });
        
        // Thumbnails - Event delegation
        this.galleryThumbnails.addEventListener('click', (e) => {
            const thumbnail = e.target.closest('.thumbnail');
            if (thumbnail) {
                const index = parseInt(thumbnail.dataset.index);
                this.goToImage(index);
            }
        });
        
        // Modal close
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });
        
        this.imageModal.addEventListener('click', (e) => {
            if (e.target === this.imageModal) {
                this.closeModal();
            }
        });
        
        // Command palette overlay
        document.querySelector('.palette-overlay').addEventListener('click', () => {
            this.closePalette();
        });
        
        // Command input
        this.commandInput.addEventListener('input', (e) => {
            this.filterCommands(e.target.value);
        });
        
        this.commandInput.addEventListener('keydown', (e) => {
            this.handleCommandPaletteKeydown(e);
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeydown(e);
        });
    },
    
    // ========== KEYBOARD HANDLERS ==========
    handleGlobalKeydown(e) {
        // Ctrl+K or Cmd+K - Open command palette
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.openPalette();
            return;
        }
        
        // Don't process if command palette or modal is open
        if (!this.commandPalette.classList.contains('hidden')) {
            return;
        }
        
        // Arrow keys - Navigate gallery
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.previousImage();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.nextImage();
        }
        
        // Number keys 1-9 - Jump to image
        if (e.key >= '1' && e.key <= '9') {
            const index = parseInt(e.key) - 1;
            if (index < this.images.length) {
                this.goToImage(index);
            }
        }
        
        // Space - Play/Pause
        if (e.key === ' ') {
            e.preventDefault();
            this.toggleSlideshow();
        }
        
        // Escape - Close modal
        if (e.key === 'Escape') {
            if (!this.imageModal.classList.contains('hidden')) {
                this.closeModal();
            }
        }
    },
    
    handleCommandPaletteKeydown(e) {
        const items = this.commandList.querySelectorAll('.command-item');
        
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedCommandIndex = Math.max(0, this.selectedCommandIndex - 1);
            this.updateSelectedCommand(items);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedCommandIndex = Math.min(items.length - 1, this.selectedCommandIndex + 1);
            this.updateSelectedCommand(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const selected = items[this.selectedCommandIndex];
            if (selected) {
                this.executeCommand(selected.dataset.commandId);
                this.closePalette();
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            this.closePalette();
        }
    },
    
    updateSelectedCommand(items) {
        items.forEach((item, index) => {
            if (index === this.selectedCommandIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
                item.focus();
            } else {
                item.classList.remove('selected');
            }
        });
    },
    
    // ========== GALLERY FUNCTIONS ==========
    renderGallery() {
        this.images.forEach((image, index) => {
            const thumbnail = document.createElement('button');
            thumbnail.className = 'thumbnail';
            thumbnail.dataset.index = index;
            thumbnail.setAttribute('aria-label', `Ảnh ${index + 1} từ ${this.images.length}`);
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            
            thumbnail.appendChild(img);
            this.galleryThumbnails.appendChild(thumbnail);
        });
    },
    
    displayImage() {
        const image = this.images[this.currentImageIndex];
        this.galleryImage.src = image.src;
        this.galleryImage.alt = image.alt;
        
        this.slideCounter.textContent = `${this.currentImageIndex + 1} / ${this.images.length}`;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            if (index === this.currentImageIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    },
    
    previousImage() {
        this.currentImageIndex = this.currentImageIndex > 0 
            ? this.currentImageIndex - 1 
            : this.images.length - 1;
        this.displayImage();
    },
    
    nextImage() {
        this.currentImageIndex = this.currentImageIndex < this.images.length - 1
            ? this.currentImageIndex + 1
            : 0;
        this.displayImage();
    },
    
    goToImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.currentImageIndex = index;
            this.displayImage();
        }
    },
    
    toggleSlideshow() {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.playBtn.textContent = '⏸️ Pause';
            this.slideshowInterval = setInterval(() => {
                this.nextImage();
            }, 2000);
        } else {
            this.playBtn.textContent = '▶️ Play';
            clearInterval(this.slideshowInterval);
        }
    },
    
    openFullscreen() {
        const image = this.images[this.currentImageIndex];
        this.modalImage.src = image.src;
        this.modalImage.alt = image.alt;
        this.imageModal.classList.remove('hidden');
        document.querySelector('.modal-close').focus();
    },
    
    closeModal() {
        this.imageModal.classList.add('hidden');
        this.galleryImage.focus();
    },
    
    // ========== COMMAND PALETTE ==========
    openPalette() {
        this.commandPalette.classList.remove('hidden');
        this.commandInput.focus();
        this.commandInput.value = '';
        this.selectedCommandIndex = 0;
        this.renderCommands(this.commands);
    },
    
    closePalette() {
        this.commandPalette.classList.add('hidden');
        this.commandInput.value = '';
        this.selectedCommandIndex = 0;
    },
    
    renderCommands(commands) {
        this.commandList.innerHTML = '';
        
        commands.forEach((command, index) => {
            const li = document.createElement('li');
            li.className = 'command-item';
            li.dataset.commandId = command.id;
            li.setAttribute('role', 'option');
            
            if (index === 0) {
                li.classList.add('selected');
            }
            
            li.innerHTML = `
                <div class="command-name">${command.name}</div>
                <div class="command-desc">${command.desc}</div>
            `;
            
            li.addEventListener('click', () => {
                this.executeCommand(command.id);
                this.closePalette();
            });
            
            this.commandList.appendChild(li);
        });
    },
    
    filterCommands(searchTerm) {
        const term = searchTerm.toLowerCase();
        const filtered = this.commands.filter(cmd => 
            cmd.name.toLowerCase().includes(term) ||
            cmd.desc.toLowerCase().includes(term)
        );
        
        this.selectedCommandIndex = 0;
        this.renderCommands(filtered);
    },
    
    executeCommand(commandId) {
        const command = this.commands.find(cmd => cmd.id === commandId);
        if (command) {
            command.action();
        }
    },
    
    // ========== UTILITY ==========
    announceForAccessibility(message) {
        // ARIA live region would be added to HTML
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => announcement.remove(), 1000);
    }
};

// ========== START APP ==========
document.addEventListener('DOMContentLoaded', () => {
    keyboardApp.init();
});
