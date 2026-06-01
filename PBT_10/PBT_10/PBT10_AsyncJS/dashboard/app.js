// ============================================
// MULTI-API DASHBOARD
// ============================================

const dashboardAPIs = {
    // API 1: JSONPlaceholder - Users
    async getUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },

    // API 2: JSONPlaceholder - Posts
    async getPosts() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },

    // API 3: Open-Meteo Weather
    async getWeather() {
        // Hanoi coordinates: 21.0285, 105.8542
        const response = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current_weather=true'
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },

    // API 4: REST Countries
    async getCountries() {
        const response = await fetch('https://restcountries.com/v3.1/name/vietnam');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },

    // API 5: Random User
    async getRandomUsers() {
        const response = await fetch('https://randomuser.me/api/?results=3');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },

    // API 6: Dog Images
    async getDogImages() {
        const response = await fetch('https://dog.ceo/api/breeds/image/random/4');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    }
};

// ============================================
// UI LAYER
// ============================================

const dashboardUI = {
    widgets: {
        users: document.getElementById('usersWidget'),
        posts: document.getElementById('postsWidget'),
        weather: document.getElementById('weatherWidget'),
        countries: document.getElementById('countriesWidget'),
        randomUsers: document.getElementById('randomUsersWidget'),
        dogs: document.getElementById('dogsWidget')
    },

    elements: {
        refreshBtn: document.getElementById('refreshBtn'),
        loadTime: document.getElementById('loadTime')
    },

    setWidgetLoading(widgetName) {
        const widget = this.widgets[widgetName];
        widget.querySelector('.widget-status').classList.add('loading');
        widget.querySelector('.widget-content').classList.remove('hidden');
        widget.querySelector('.widget-error').classList.remove('visible');
        widget.querySelector('.widget-content').innerHTML = '<div class="skeleton"></div><div class="skeleton"></div>';
    },

    setWidgetSuccess(widgetName) {
        const widget = this.widgets[widgetName];
        widget.querySelector('.widget-status').classList.remove('loading', 'error');
        widget.querySelector('.widget-status').classList.add('success');
        widget.querySelector('.widget-error').classList.remove('visible');
    },

    setWidgetError(widgetName, message) {
        const widget = this.widgets[widgetName];
        widget.querySelector('.widget-status').classList.remove('loading');
        widget.querySelector('.widget-status').classList.add('error');
        widget.querySelector('.widget-content').classList.add('hidden');
        const errorDiv = widget.querySelector('.widget-error');
        errorDiv.querySelector('.error-text').textContent = message;
        errorDiv.classList.add('visible');
    },

    renderUsers(users) {
        const widget = this.widgets.users;
        const html = users.map(user => `
            <div class="user-item">
                <strong>${user.name}</strong>
                <p>Email: ${user.email}</p>
            </div>
        `).join('');
        widget.querySelector('.widget-content').innerHTML = html;
        this.setWidgetSuccess('users');
    },

    renderPosts(posts) {
        const widget = this.widgets.posts;
        const html = posts.slice(0, 3).map(post => `
            <div class="post-item">
                <strong>${post.title}</strong>
                <p>${post.body.substring(0, 50)}...</p>
            </div>
        `).join('');
        widget.querySelector('.widget-content').innerHTML = html;
        this.setWidgetSuccess('posts');
    },

    renderWeather(data) {
        const widget = this.widgets.weather;
        const current = data.current_weather;
        const iconMap = {
            0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
            45: '🌫️', 48: '🌫️', 51: '🌧️', 61: '🌧️',
            80: '⛈️', 95: '⛈️'
        };
        const icon = iconMap[current.weather_code] || '🌤️';
        
        const html = `
            <div class="weather-content">
                <div class="weather-icon">${icon}</div>
                <p><strong>${current.temperature}°C</strong></p>
                <p>Tốc độ gió: ${current.wind_speed} km/h</p>
            </div>
        `;
        widget.querySelector('.widget-content').innerHTML = html;
        this.setWidgetSuccess('weather');
    },

    renderCountries(countries) {
        const widget = this.widgets.countries;
        const country = countries[0];
        const html = `
            <div class="country-item">
                <strong>${country.name.official}</strong>
                <p>Thủ đô: ${country.capital?.[0] || 'N/A'}</p>
                <p>Dân số: ${(country.population / 1000000).toFixed(1)}M</p>
            </div>
        `;
        widget.querySelector('.widget-content').innerHTML = html;
        this.setWidgetSuccess('countries');
    },

    renderRandomUsers(data) {
        const widget = this.widgets.randomUsers;
        const html = data.results.map(user => `
            <div class="random-user-item">
                <strong>${user.name.first} ${user.name.last}</strong>
                <p>Email: ${user.email}</p>
            </div>
        `).join('');
        widget.querySelector('.widget-content').innerHTML = html;
        this.setWidgetSuccess('randomUsers');
    },

    renderDogs(data) {
        const widget = this.widgets.dogs;
        const html = `
            <div class="dog-images">
                ${data.message.map(url => `<img src="${url}" class="dog-image" alt="dog">`).join('')}
            </div>
        `;
        widget.querySelector('.widget-content').innerHTML = html;
        this.setWidgetSuccess('dogs');
    }
};

// ============================================
// MAIN FUNCTION - Promise.allSettled
// ============================================

async function loadDashboard() {
    const startTime = Date.now();

    // Show all loading states
    Object.keys(dashboardUI.widgets).forEach(key => {
        dashboardUI.setWidgetLoading(key);
    });

    // TODO: Implement loadDashboard with Promise.allSettled
    // 1. Gọi 6 APIs song song
    // 2. Xử lý từng result
    // 3. Hiển thị load time
    
    try {
        const results = await Promise.allSettled([
            dashboardAPIs.getUsers(),
            dashboardAPIs.getPosts(),
            dashboardAPIs.getWeather(),
            dashboardAPIs.getCountries(),
            dashboardAPIs.getRandomUsers(),
            dashboardAPIs.getDogImages()
        ]);

        // Xử lý kết quả
        const [users, posts, weather, countries, randomUsers, dogs] = results;

        if (users.status === 'fulfilled') {
            dashboardUI.renderUsers(users.value);
        } else {
            dashboardUI.setWidgetError('users', users.reason.message);
        }

        if (posts.status === 'fulfilled') {
            dashboardUI.renderPosts(posts.value);
        } else {
            dashboardUI.setWidgetError('posts', posts.reason.message);
        }

        if (weather.status === 'fulfilled') {
            dashboardUI.renderWeather(weather.value);
        } else {
            dashboardUI.setWidgetError('weather', weather.reason.message);
        }

        if (countries.status === 'fulfilled') {
            dashboardUI.renderCountries(countries.value);
        } else {
            dashboardUI.setWidgetError('countries', countries.reason.message);
        }

        if (randomUsers.status === 'fulfilled') {
            dashboardUI.renderRandomUsers(randomUsers.value);
        } else {
            dashboardUI.setWidgetError('randomUsers', randomUsers.reason.message);
        }

        if (dogs.status === 'fulfilled') {
            dashboardUI.renderDogs(dogs.value);
        } else {
            dashboardUI.setWidgetError('dogs', dogs.reason.message);
        }

        // Show load time
        const loadTimeMs = Date.now() - startTime;
        dashboardUI.elements.loadTime.textContent = `⏱️ Tải dữ liệu trong ${loadTimeMs}ms`;

    } catch (error) {
        console.error('Dashboard load error:', error);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

dashboardUI.elements.refreshBtn.addEventListener('click', () => {
    loadDashboard();
});

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard initialized');
    loadDashboard();
});
