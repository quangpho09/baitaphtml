# PHẦN A

## A1
```js
function tinhThueBaoHiem(luong){
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
}

const tinhThueBaoHiem2 = function(luong){
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};

const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

Hoisting:
- Function Declaration: dùng được trước khi khai báo.
- Function Expression và Arrow Function: không dùng được trước khi gán.

## A2
Đoạn 1 output:
1
2
3
2
2

Đoạn 2:
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2

Vì var dùng chung một biến i cho toàn vòng lặp, còn let tạo binding mới cho mỗi lần lặp.

## A3
```js
nums.filter(x => x % 2 === 0);
nums.map(x => x * 3);
nums.reduce((a,b) => a + b, 0);
nums.find(x => x > 7);
nums.some(x => x > 10);
nums.every(x => x > 0);
nums.map(x => `Số ${x} là ${x%2===0?'chẵn':'lẻ'}`);
[...nums].reverse();
```

## A4
Output:
```js
iPhone 16 25990000 8 Titan
ReferenceError: specs is not defined

23990000
true
25990000

16
```

Spread chỉ copy nông (shallow copy), nên copy.specs và product.specs cùng tham chiếu object.

# PHẦN C

## C1
```js
const processOrders = orders =>
    orders
        .filter(o => o.status === "completed" && o.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

## C2
```js
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) result.push(fn(arr[i], i, arr));
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++)
            if (fn(arr[i], i, arr)) result.push(arr[i]);
        return result;
    },

    reduce(arr, fn, initialValue) {
        let acc = initialValue;
        for (let i = 0; i < arr.length; i++)
            acc = fn(acc, arr[i], i, arr);
        return acc;
    }
};
```
