function createCart() {
    let items = [];
    let discount = 0;
    let shipDiscount = 0;

    return {
        addItem(product, quantity = 1) {
            const found = items.find(i => i.id === product.id);
            if (found) found.quantity += quantity;
            else items.push({ ...product, quantity });
        },

        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) item.quantity = newQuantity;
        },

        getTotal() {
            const total = items.reduce((s,i)=>s+i.price*i.quantity,0);
            return total - total * discount - shipDiscount;
        },

        applyDiscount(code) {
            if (code === "SALE10") discount = 0.1;
            else if (code === "SALE20") discount = 0.2;
            else if (code === "FREESHIP") shipDiscount = 30000;
        },

        printCart() {
            console.table(items);
            console.log("Tổng:", this.getTotal().toLocaleString()+"đ");
        },

        getItemCount() {
            return items.reduce((s,i)=>s+i.quantity,0);
        },

        clearCart() {
            items = [];
        }
    };
}
