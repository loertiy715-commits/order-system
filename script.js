// === 1. 初始化 Firebase 連線金鑰 ===
const firebaseConfig = {
    apiKey: "AIzaSyBdD-WLkR8qv3PwH5olNCBiAi5wU_ojdfA",
    authDomain: "bananaorder.firebaseapp.com",
    databaseURL: "https://bananaorder-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bananaorder",
    storageBucket: "bananaorder.firebasestorage.app",
    messagingSenderId: "556082870280",
    appId: "1:556082870280:web:c6b1dc46c2494f215b79bd"
};

// 啟動資料庫
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// === 2. 預設資料與系統變數 ===
const defaultMenu = [
    {
        id: "A001", price: 180,
        image_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400", 
        name_zh: "經典牛肉麵", desc_zh: "慢熬牛骨湯頭搭配手工麵條",
        name_en: "Classic Beef Noodle Soup", desc_en: "Slow-cooked beef bone broth with hand-pulled noodles",
        name_jp: "定番の牛肉麺", desc_jp: "じっくり煮込んだ牛骨スープと手作り麺",
        name_kr: "클래식 우육면", desc_kr: "천천히 끓인 소사골 육수와 수제 면"
    },
    {
        id: "A002", price: 60,
        image_url: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400", 
        name_zh: "珍珠奶茶", desc_zh: "台灣特選紅茶與Q彈珍珠",
        name_en: "Bubble Milk Tea", desc_en: "Taiwanese black tea with chewy tapioca pearls",
        name_jp: "タピオカミルクティー", desc_jp: "台湾特選紅茶とモチモチタピオカ",
        name_kr: "버블 밀크티", desc_kr: "대만 특선 홍차와 쫄깃한 타피오카 펄"
    }
];

let menuData = [];
let savedOrders = [];
let currentLang = 'zh'; 
let cart = []; 
let salesChartInstance = null; 

// === 3. 【雲端魔法】自動監聽菜單變化 ===
db.ref('restaurant_menu').on('value', (snapshot) => {
    let data = snapshot.val();
    if (data) {
        menuData = Array.isArray(data) ? data : Object.values(data);
    } else {
        menuData = defaultMenu;
        db.ref('restaurant_menu').set(defaultMenu);
    }
    
    if (document.getElementById('menu-screen').style.display === 'block') {
        renderMenu();
    }
    if (document.getElementById('admin-screen').style.display === 'block') {
        renderAdminMenu();
    }
});

// === 4. 【雲端魔法】自動監聽訂單變化 ===
db.ref('restaurant_orders').on('value', (snapshot) => {
    let data = snapshot.val();
    savedOrders = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
    
    if (document.getElementById('admin-screen').style.display === 'block') {
        renderAdminOrders();
        renderSalesChart();
    }
});

// === 畫面切換與返回 ===
function chooseLang(lang) {
    currentLang = lang;
    document.getElementById('lang-screen').style.display = 'none';
    document.getElementById('menu-screen').style.display = 'block';
    renderMenu(); 
}

function backToLang() {
    document.getElementById('lang-screen').style.display = 'block';
    document.getElementById('menu-screen').style.display = 'none';
}

function backToMenu() {
    document.getElementById('cart-screen').style.display = 'none';
    document.getElementById('menu-screen').style.display = 'block';
}

// === 渲染菜單與購物車邏輯 ===
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = ''; 

    menuData.forEach(item => {
        let displayName = item[`name_${currentLang}`];
        let displayDesc = item[`desc_${currentLang}`];

        let menuItemHTML = `
            <div class="menu-item">
                <img src="${item.image_url}" alt="${displayName}">
                <div class="menu-info">
                    <h2>${displayName}</h2>
                    <p>${displayDesc}</p>
                    <div class="price">NT$ ${item.price}</div>
                    
                    <div class="add-action">
                        數量: <input type="number" id="qty-${item.id}" value="1" min="1">
                        <button class="add-btn" onclick="addToCart('${item.id}')">➕ 加入購物車</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += menuItemHTML;
    });
}

function addToCart(itemId) {
    const qtyInput = document.getElementById(`qty-${itemId}`);
    const quantity = parseInt(qtyInput.value);

    if (quantity <= 0 || isNaN(quantity)) {
        alert("請輸入正確數量！");
        return;
    }

    const item = menuData.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: item.id,
            name: item.name_zh, 
            price: item.price,
            quantity: quantity
        });
    }

    updateCartCount();
    alert(`已將 ${quantity} 份加入購物車！`); 
    qtyInput.value = 1; 
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
}

function showCart() {
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('cart-screen').style.display = 'block';
    
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; 

    let total = 0;
    cart.forEach(cartItem => {
        let subtotal = cartItem.price * cartItem.quantity;
        cartList.innerHTML += `<li>${cartItem.name} x ${cartItem.quantity}份 - NT$ ${subtotal}</li>`;
        total += subtotal;
    });
    
    cartList.innerHTML += `<h3>總計: NT$ ${total}</h3>`;
}

// === 送出訂單 (寫入雲端) ===
function checkout() {
    if (cart.length === 0) {
        alert("購物車是空的喔！");
        return;
    }
    
    const newOrder = {
        time: new Date().toLocaleString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
    
    const updatedOrders = [...savedOrders, newOrder];
    
    db.ref('restaurant_orders').set(updatedOrders).then(() => {
        alert("訂單已送出！老闆已經收到通知囉！");
        cart = []; 
        updateCartCount();
        
        document.getElementById('cart-screen').style.display = 'none';
        document.getElementById('lang-screen').style.display = 'block'; 
    }).catch(error => {
        alert("連線失敗，請確認網路狀態：" + error);
    });
}

// === 管理員後台 ===
function adminLogin() {
    const password = prompt("請輸入管理員密碼：");
    if (password === "0905852418") {
        document.getElementById('lang-screen').style.display = 'none';
        document.getElementById('admin-screen').style.display = 'block';
        renderAdminOrders();
        renderSalesChart();
        renderAdminMenu(); 
    } else if (password !== null) {
        alert("密碼錯誤！");
    }
}

function logoutAdmin() {
    document.getElementById('admin-screen').style.display = 'none';
    document.getElementById('lang-screen').style.display = 'block';
}

function renderAdminOrders() {
    const container = document.getElementById('admin-orders');
    
    if (savedOrders.length === 0) {
        container.innerHTML = "<p>目前沒有任何訂單紀錄。</p>";
        return;
    }
    
    container.innerHTML = "";
    savedOrders.forEach((order, index) => {
        let orderHTML = `<div class="order-card" style="position: relative;">
            <h3>訂單編號 #${index + 1} <span>(${order.time})</span></h3>
            <ul>`;
        order.items.forEach(item => {
            orderHTML += `<li>${item.name} x ${item.quantity} (NT$ ${item.price * item.quantity})</li>`;
        });
        orderHTML += `</ul>
            <h4>總計金額: NT$ ${order.total}</h4>
            <button onclick="deleteOrder(${index})" class="delete-btn" style="margin-top: 10px;">🗑️ 刪除此筆訂單</button>
        </div>`;
        container.innerHTML += orderHTML;
    });
}

// === 新增：刪除單筆訂單功能 ===
function deleteOrder(index) {
    if (confirm(`確定要刪除「訂單編號 #${index + 1}」嗎？`)) {
        // 從陣列中移除該筆訂單
        savedOrders.splice(index, 1);
        
        // 更新雲端資料庫
        db.ref('restaurant_orders').set(savedOrders).then(() => {
            alert("已成功刪除該筆訂單！");
        }).catch(error => {
            alert("刪除失敗：" + error);
        });
    }
}

function renderSalesChart() {
    let salesData = {}; 

    savedOrders.forEach(order => {
        order.items.forEach(item => {
            if (salesData[item.name]) {
                salesData[item.name] += item.quantity;
            } else {
                salesData[item.name] = item.quantity;
            }
        });
    });

    const labels = Object.keys(salesData);
    const data = Object.values(salesData);
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    if (salesChartInstance) {
        salesChartInstance.destroy();
    }

    salesChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '總銷售數量',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}

function clearOrders() {
    if (confirm("⚠️ 確定要清空所有的歷史訂單嗎？這個動作無法復原！")) {
        db.ref('restaurant_orders').remove().then(() => {
            alert("歷史訂單已清空！");
        });
    }
}

// === 新增/刪除 餐點邏輯 (同步雲端) ===
function renderAdminMenu() {
    const container = document.getElementById('admin-menu-list');
    container.innerHTML = '';

    if (menuData.length === 0) {
        container.innerHTML = "<p>目前沒有任何餐點。</p>";
        return;
    }

    menuData.forEach(item => {
        let html = `
            <div class="admin-menu-item">
                <span>${item.name_zh} (NT$ ${item.price})</span>
                <button class="delete-btn" onclick="deleteMenuItem('${item.id}')">🗑️ 刪除餐點</button>
            </div>
        `;
        container.innerHTML += html;
    });
}

function deleteMenuItem(itemId) {
    if (confirm("確定要刪除這道餐點嗎？前台菜單也會同步移除喔！")) {
        const updatedMenu = menuData.filter(item => item.id !== itemId);
        
        db.ref('restaurant_menu').set(updatedMenu).then(() => {
            alert("已成功刪除！客人手機上的菜單也會同步消失。");
        });
    }
}

function addNewItem() {
    const name = document.getElementById('new-name').value;
    const desc = document.getElementById('new-desc').value;
    const price = parseInt(document.getElementById('new-price').value);
    const fileInput = document.getElementById('new-img');

    if (!name || !desc || isNaN(price) || !fileInput.files[0]) {
        alert("⚠️ 請填寫完整資訊，並記得選擇要上傳的圖片！");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const newId = "A_" + new Date().getTime();
        
        const newItem = {
            id: newId,
            price: price,
            image_url: e.target.result,
            name_zh: name, desc_zh: desc,
            name_en: name, desc_en: desc, 
            name_jp: name, desc_jp: desc,
            name_kr: name, desc_kr: desc
        };

        const updatedMenu = [...menuData, newItem];
        
        db.ref('restaurant_menu').set(updatedMenu).then(() => {
            alert(`✅ 成功新增餐點：${name}！`);
            document.getElementById('new-name').value = '';
            document.getElementById('new-desc').value = '';
            document.getElementById('new-price').value = '';
            fileInput.value = '';
        });
    };

    reader.readAsDataURL(file);
}