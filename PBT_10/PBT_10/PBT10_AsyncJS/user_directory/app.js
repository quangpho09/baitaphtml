// ============================================
// USER DIRECTORY - API LAYER
// ============================================

const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        // TODO: GET /users
        throw new Error("TODO: Implement getUsers");
    },

    async getUser(id) {
        // TODO: GET /users/:id
        throw new Error("TODO: Implement getUser");
    },

    async createUser(data) {
        // TODO: POST /users
        // data = { name, email, phone, address }
        throw new Error("TODO: Implement createUser");
    },

    async updateUser(id, data) {
        // TODO: PUT /users/:id
        // data = { name, email, phone, address }
        throw new Error("TODO: Implement updateUser");
    },

    async deleteUser(id) {
        // TODO: DELETE /users/:id
        throw new Error("TODO: Implement deleteUser");
    }
};

// ============================================
// UI LAYER
// ============================================

const ui = {
    elements: {
        loadingState: document.getElementById('loadingState'),
        usersList: document.getElementById('usersList'),
        usersTableBody: document.getElementById('usersTableBody'),
        errorState: document.getElementById('errorState'),
        errorMessage: document.getElementById('errorMessage'),
        searchInput: document.getElementById('searchInput'),
        addUserBtn: document.getElementById('addUserBtn'),
        userModal: document.getElementById('userModal'),
        userForm: document.getElementById('userForm'),
        userId: document.getElementById('userId'),
        userName: document.getElementById('userName'),
        userEmail: document.getElementById('userEmail'),
        userPhone: document.getElementById('userPhone'),
        userCity: document.getElementById('userCity'),
        modalTitle: document.getElementById('modalTitle'),
        closeModalBtn: document.getElementById('closeModalBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        toast: document.getElementById('toast')
    },

    showLoading() {
        this.elements.loadingState.classList.remove('hidden');
        this.elements.usersList.classList.add('hidden');
        this.elements.errorState.classList.add('hidden');
    },

    showUsers(users) {
        this.elements.loadingState.classList.add('hidden');
        this.elements.usersList.classList.remove('hidden');
        this.elements.errorState.classList.add('hidden');
        this.renderUsers(users);
    },

    showError(message) {
        this.elements.loadingState.classList.add('hidden');
        this.elements.usersList.classList.add('hidden');
        this.elements.errorState.classList.remove('hidden');
        this.elements.errorMessage.textContent = message;
    },

    renderUsers(users) {
        const tbody = this.elements.usersTableBody;
        tbody.innerHTML = '';

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone || '-'}</td>
                <td>${user.address?.city || '-'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-edit" onclick="editUser(${user.id})">✏️ Sửa</button>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id})">🗑️ Xóa</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    showModal(title) {
        this.elements.modalTitle.textContent = title;
        this.elements.userModal.classList.remove('hidden');
    },

    hideModal() {
        this.elements.userModal.classList.add('hidden');
        this.elements.userForm.reset();
        this.elements.userId.value = '';
    },

    populateForm(user) {
        this.elements.userId.value = user.id || '';
        this.elements.userName.value = user.name || '';
        this.elements.userEmail.value = user.email || '';
        this.elements.userPhone.value = user.phone || '';
        this.elements.userCity.value = user.address?.city || '';
    },

    getFormData() {
        return {
            id: this.elements.userId.value,
            name: this.elements.userName.value,
            email: this.elements.userEmail.value,
            phone: this.elements.userPhone.value,
            city: this.elements.userCity.value
        };
    },

    showToast(message, type = 'success') {
        const toast = this.elements.toast;
        toast.textContent = message;
        toast.classList.remove('hidden', 'error');
        
        if (type === 'error') {
            toast.classList.add('error');
        }

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
};

// ============================================
// LOCAL STATE
// ============================================

let allUsers = [];
let filteredUsers = [];

// ============================================
// MAIN FUNCTIONS
// ============================================

async function loadUsers() {
    ui.showLoading();

    try {
        allUsers = await api.getUsers();
        filteredUsers = [...allUsers];
        ui.showUsers(filteredUsers);
    } catch (error) {
        console.error('Error loading users:', error);
        ui.showError('Không thể tải danh sách người dùng');
    }
}

async function createUser(userData) {
    try {
        ui.showToast('⏳ Đang thêm...');
        const newUser = await api.createUser(userData);
        allUsers.unshift(newUser);
        filteredUsers = [...allUsers];
        ui.showUsers(filteredUsers);
        ui.hideModal();
        ui.showToast('✅ Thêm người dùng thành công');
    } catch (error) {
        console.error('Error creating user:', error);
        ui.showToast('❌ Thêm người dùng thất bại', 'error');
    }
}

async function updateUser(id, userData) {
    try {
        ui.showToast('⏳ Đang cập nhật...');
        const updated = await api.updateUser(id, userData);
        const index = allUsers.findIndex(u => u.id === id);
        if (index !== -1) {
            allUsers[index] = updated;
        }
        filteredUsers = [...allUsers];
        ui.showUsers(filteredUsers);
        ui.hideModal();
        ui.showToast('✅ Cập nhật thành công');
    } catch (error) {
        console.error('Error updating user:', error);
        ui.showToast('❌ Cập nhật thất bại', 'error');
    }
}

async function deleteUser(id) {
    if (!confirm('Bạn chắc chắn muốn xóa?')) return;

    try {
        ui.showToast('⏳ Đang xóa...');
        await api.deleteUser(id);
        allUsers = allUsers.filter(u => u.id !== id);
        filteredUsers = [...allUsers];
        ui.showUsers(filteredUsers);
        ui.showToast('✅ Xóa thành công');
    } catch (error) {
        console.error('Error deleting user:', error);
        ui.showToast('❌ Xóa thất bại', 'error');
    }
}

function editUser(id) {
    const user = allUsers.find(u => u.id === id);
    if (!user) return;

    ui.populateForm(user);
    ui.showModal('✏️ Chỉnh sửa người dùng');
}

function filterUsers(query) {
    const q = query.toLowerCase();
    filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
    );
    ui.renderUsers(filteredUsers);
}

// ============================================
// EVENT LISTENERS
// ============================================

ui.elements.addUserBtn.addEventListener('click', () => {
    ui.showModal('➕ Thêm người dùng mới');
});

ui.elements.closeModalBtn.addEventListener('click', () => {
    ui.hideModal();
});

ui.elements.cancelBtn.addEventListener('click', () => {
    ui.hideModal();
});

ui.elements.userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = ui.getFormData();

    if (data.id) {
        await updateUser(parseInt(data.id), data);
    } else {
        await createUser(data);
    }
});

ui.elements.searchInput.addEventListener('input', (e) => {
    filterUsers(e.target.value);
});

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    console.log('User Directory initialized');
});
