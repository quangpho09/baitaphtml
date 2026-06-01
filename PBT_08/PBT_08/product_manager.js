const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

const getInStock = p => p.filter(x => x.stock > 0);

const filterProducts = (p, c, min, max) =>
    p.filter(x => x.category === c && x.price >= min && x.price <= max);

const sortByPrice = (p, order="asc") =>
    [...p].sort((a,b) => order==="asc" ? a.price-b.price : b.price-a.price);

const cheapestByCategory = p =>
    p.reduce((acc, cur) => {
        if (!acc[cur.category] || cur.price < acc[cur.category].price)
            acc[cur.category] = cur;
        return acc;
    }, {});

const totalInventoryValue = p =>
    p.reduce((sum,x) => sum + x.price * x.stock, 0);

const formatProductList = p =>
    p.map(x => ({
        name: x.name,
        formattedPrice: x.price.toLocaleString("vi-VN") + "đ"
    }));

const averageRating = p =>
    p.reduce((s,x)=>s+x.rating,0) / p.length;

const searchProducts = (p, keyword) =>
    p.filter(x => x.name.toLowerCase().includes(keyword.toLowerCase()));
