// ============================================
// WEATHER APP - API LAYER
// ============================================

const weatherAPI = {
    // API: https://wttr.in/Hanoi?format=j1
    // Hoặc: https://api.open-meteo.com/v1/forecast
    
    async getWeatherByCity(city) {
        // TODO: Fetch dữ liệu thời tiết từ API
        // 1. Kiểm tra response.ok
        // 2. Parse JSON
        // 3. Xử lý lỗi với try...catch
        
        throw new Error("TODO: Implement API call");
    }
};

// ============================================
// UI LAYER
// ============================================

const ui = {
    elements: {
        cityInput: document.getElementById('cityInput'),
        searchBtn: document.getElementById('searchBtn'),
        loadingState: document.getElementById('loadingState'),
        successState: document.getElementById('successState'),
        errorState: document.getElementById('errorState'),
        historyList: document.getElementById('historyList'),
        // TODO: Thêm các element khác
    },

    showLoading() {
        this.hideAllStates();
        this.elements.loadingState.classList.remove('hidden');
    },

    showSuccess(weatherData) {
        this.hideAllStates();
        // TODO: Điền dữ liệu vào các element
        // - cityName, tempValue, description, humidity, windSpeed, weatherIcon
        this.elements.successState.classList.remove('hidden');
    },

    showError(errorMessage) {
        this.hideAllStates();
        document.getElementById('errorMessage').textContent = errorMessage;
        this.elements.errorState.classList.remove('hidden');
    },

    hideAllStates() {
        this.elements.loadingState.classList.add('hidden');
        this.elements.successState.classList.add('hidden');
        this.elements.errorState.classList.add('hidden');
    },

    renderHistory(cities) {
        this.elements.historyList.innerHTML = '';
        if (cities.length === 0) {
            this.elements.historyList.innerHTML = '<p class="empty-history">Chưa có lịch sử</p>';
            return;
        }

        cities.forEach(city => {
            const item = document.createElement('button');
            item.className = 'history-item';
            item.textContent = city;
            item.onclick = () => {
                this.elements.cityInput.value = city;
                handleSearch();
            };
            this.elements.historyList.appendChild(item);
        });
    }
};

// ============================================
// LOCAL STORAGE - LƯU LỊCH SỬ
// ============================================

const storage = {
    storageKey: 'weatherAppHistory',
    maxItems: 5,

    getHistory() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    },

    addCity(city) {
        const history = this.getHistory();
        const filtered = history.filter(c => c.toLowerCase() !== city.toLowerCase());
        const newHistory = [city, ...filtered].slice(0, this.maxItems);
        localStorage.setItem(this.storageKey, JSON.stringify(newHistory));
        ui.renderHistory(newHistory);
    },

    loadHistory() {
        const history = this.getHistory();
        ui.renderHistory(history);
    }
};

// ============================================
// MAIN LOGIC
// ============================================

async function handleSearch() {
    const city = ui.elements.cityInput.value.trim();

    if (!city) {
        ui.showError('Vui lòng nhập tên thành phố');
        return;
    }

    ui.showLoading();

    try {
        const weatherData = await weatherAPI.getWeatherByCity(city);
        
        // Thêm vào lịch sử
        storage.addCity(city);
        
        // Hiển thị kết quả
        ui.showSuccess(weatherData);
    } catch (error) {
        console.error('Error:', error);
        
        if (error.message.includes('404')) {
            ui.showError('Thành phố không tồn tại');
        } else if (error.message.includes('Network')) {
            ui.showError('Mất kết nối Internet');
        } else {
            ui.showError('Có lỗi xảy ra, vui lòng thử lại');
        }
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

ui.elements.searchBtn.addEventListener('click', handleSearch);

ui.elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    storage.loadHistory();
    console.log('Weather App initialized');
});
