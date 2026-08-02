const firebaseConfig = {
    apiKey: "AIzaSyBdD-WLkR8qv3PwH5olNCBiAi5wU_ojdfA",
    authDomain: "bananaorder.firebaseapp.com",
    databaseURL: "https://bananaorder-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bananaorder",
    storageBucket: "bananaorder.firebasestorage.app",
    messagingSenderId: "556082870280",
    appId: "1:556082870280:web:c6b1dc46c2494f215b79bd"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const uiTexts = {
    zh: {
        selectLang: "請選擇語言 / Select Language",
        adminLogin: "⚙️ 管理員登入",
        backLang: "⬅️ 返回上一頁 (更改語言)",
        cartBtn: "🛒 購物車",
        backMenu: "⬅️ 返回上一頁 (繼續點餐)",
        cartTitle: "購物車 (訂單明細)",
        checkoutBtn: "送出訂單",
        logoutAdmin: "⬅️ 登出並返回首頁",
        clearOrders: "🗑️ 清空所有歷史訂單",
        adminTitle: "管理員後台",
        addMenuTitle: "➕ 新增 / 編輯餐點",
        lblImg: "1. 餐點圖片 (上傳):",
        lblName: "2. 餐點名稱 (中文):",
        lblDesc: "3. 餐點簡介:",
        lblCategory: "4. 餐點分類:",
        lblPrice: "5. 價格 (NT$):",
        saveBtn: "儲存新餐點",
        manageMenuTitle: "📝 管理現有菜單 (編輯與刪除)",
        salesChartTitle: "📊 銷售數量統計",
        orderListTitle: "📝 詳細訂單列表",
        allCategory: "全部餐點",
        qtyText: "數量:",
        addCartBtn: "➕ 加入購物車",
        totalText: "總計",
        emptyCart: "購物車是空的喔！",
        orderSuccess: "訂單已送出！老闆已經收到通知囉！"
    },
    en: {
        selectLang: "Select Language",
        adminLogin: "⚙️ Admin Login",
        backLang: "⬅️ Back (Change Language)",
        cartBtn: "🛒 Cart",
        backMenu: "⬅️ Back (Continue)",
        cartTitle: "Cart (Order Details)",
        checkoutBtn: "Submit Order",
        logoutAdmin: "⬅️ Logout & Home",
        clearOrders: "🗑️ Clear All History",
        adminTitle: "Admin Dashboard",
        addMenuTitle: "➕ Add / Edit Dish",
        lblImg: "1. Dish Image:",
        lblName: "2. Dish Name (CN):",
        lblDesc: "3. Description:",
        lblCategory: "4. Category:",
        lblPrice: "5. Price (NT$):",
        saveBtn: "Save Dish",
        manageMenuTitle: "📝 Manage Menu (Edit & Delete)",
        salesChartTitle: "📊 Sales Statistics",
        orderListTitle: "📝 Order List",
        allCategory: "All Dishes",
        qtyText: "Qty:",
        addCartBtn: "➕ Add to Cart",
        totalText: "Total",
        emptyCart: "Cart is empty!",
        orderSuccess: "Order submitted! Boss notified!"
    },
    jp: {
        selectLang: "言語を選択してください / Select Language",
        adminLogin: "⚙️ 管理者ログイン",
        backLang: "⬅️ 戻る (言語変更)",
        cartBtn: "🛒 カート",
        backMenu: "⬅️ 戻る (注文続行)",
        cartTitle: "カート (注文詳細)",
        checkoutBtn: "注文を送信",
        logoutAdmin: "⬅️ ログアウト",
        clearOrders: "🗑️ 履歴をすべてクリア",
        adminTitle: "管理者画面",
        addMenuTitle: "➕ 新規追加 / 編集",
        lblImg: "1. 料理画像:",
        lblName: "2. 料理名 (中国語):",
        lblDesc: "3. 説明:",
        lblCategory: "4. カテゴリ:",
        lblPrice: "5. 価格 (NT$):",
        saveBtn: "メニューを保存",
        manageMenuTitle: "📝 メニュー管理 (編集・削除)",
        salesChartTitle: "📊 売上統計",
        orderListTitle: "📝 注文リスト",
        allCategory: "すべて",
        qtyText: "数量:",
        addCartBtn: "🛒 カートに追加",
        totalText: "合計",
        emptyCart: "カートは空です！",
        orderSent: "注文を送信しました！"
    },
    kr: {
        selectLang: "언어 선택 / Select Language",
        adminLogin: "⚙️ 관리자 로그인",
        backLang: "⬅️ 뒤로 (언어 변경)",
        cartBtn: "🛒 장바구니",
        backMenu: "⬅️ 뒤로 (계속 주문)",
        cartTitle: "장바구니 (주문 상세)",
        checkoutBtn: "주문하기",
        logoutAdmin: "⬅️ 로그아웃",
        clearOrders: "🗑️ 전체 내역 삭제",
        adminTitle: "관리자 대시보드",
        addMenuTitle: "➕ 메뉴 추가 / 수정",
        lblImg: "1. 음식 이미지:",
        lblName: "2. 음식 이름 (중국어):",
        lblDesc: "3. 설명:",
        lblCategory: "4. 카테고리:",
        lblPrice: "5. 가격 (NT$):",
        saveBtn: "메뉴 저장",
        manageMenuTitle: "📝 메뉴 관리 (수정 및 삭제)",
        salesChartTitle: "📊 판매 통계",
        orderListTitle: "📝 주문 목록",
        allCategory: "전체 메뉴",
        qtyText: "수량:",
        addCartBtn: "➕ 장바구니 담기",
        totalText: "합계",
        emptyCart: "장바구니가 비어 있습니다!",
        orderSent: "주문이 완료되었습니다!"
    }
};

const categoriesMap = {
    "涼拌": { zh: "涼拌", en: "Cold Dishes", jp: "冷菜", kr: "냉채" },
    "生鮮": { zh: "生鮮", en: "Fresh Seafood", jp: "生鮮・刺身", kr: "생선회/신선" },
    "燒烤": { zh: "燒烤", en: "Grilled", jp: "焼き物", kr: "구이" },
    "熱炒": { zh: "熱炒", en: "Stir-fry", jp: "炒め物", kr: "볶음" },
    "火鍋": { zh: "火鍋", en: "Hot Pot", jp: "火鍋", kr: "훠궈/전골" },
    "蒜酥": { zh: "蒜酥", en: "Garlic Crisp", jp: "ガーリック揚げ", kr: "마늘튀김" },
    "三杯煲仔": { zh: "三杯煲仔", en: "Three-Cup & Claypot", jp: "三杯・土鍋煮込み", kr: "싼베이/뚝배기" },
    "鐵板": { zh: "鐵板", en: "Teppanyaki", jp: "鉄板焼き", kr: "철판요리" }
};

const defaultMenu = [
    {
        id: "A001", price: 180, category: "熱炒",
        image_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400", 
        name_zh: "經典牛肉麵", desc_zh: "慢熬牛骨湯頭搭配手工麵條"
    },
    {
        id: "A002", price: 60, category: "涼拌",
        image_url: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400", 
        name_zh: "珍珠奶茶", desc_zh: "台灣特選紅茶與Q彈珍珠"
    }
];

let menuData = [];
let savedOrders = [];
let currentLang = 'zh'; 
let currentCategory = 'all';
let editingItemId = null; // 記錄目前正在編輯的餐點 ID
let cart = []; 
let salesChartInstance = null; 

function smartTranslate(text, lang) {
    if (!text) return "";
    if (lang === 'zh') return text;

    const culinaryDict = {
        "蝦子": { en: "Shrimp", jp: "エビ", kr: "새우" },
        "蝦": { en: "Shrimp", jp: "エビ", kr: "새우" },
        "牛肉": { en: "Beef", jp: "牛肉", kr: "소고기" },
        "豬肉": { en: "Pork", jp: "豚肉", kr: "돼지고기" },
        "雞肉": { en: "Chicken", jp: "鶏肉", kr: "닭고기" },
        "魚": { en: "Fish", jp: "魚", kr: "생선" },
        "蛤蜊": { en: "Clams", jp: "ハマグリ", kr: "조개" },
        "中卷": { en: "Squid", jp: "イカ", kr: "오징어" },
        "透抽": { en: "Squid", jp: "イカ", kr: "오징어" },
        "豆腐": { en: "Tofu", jp: "豆腐", kr: "두부" },
        "蛋": { en: "Egg", jp: "卵", kr: "계란" },
        "高麗菜": { en: "Cabbage", jp: "キャベツ", kr: "양배추" },
        "空心菜": { en: "Water Spinach", jp: "空心菜", kr: "공심채" },
        "下巴": { en: "Fish Collar", jp: "カマ", kr: "생선 턱살" },
        "鯖魚": { en: "Mackerel", jp: "サバ", kr: "고등어" },
        "秋刀魚": { en: "Saury", jp: "サンマ", kr: "꽁치" },
        "燙": { en: "Boiled", jp: "湯引き", kr: "데친" },
        "炒": { en: "Stir-fried", jp: "炒め", kr: "볶은" },
        "烤": { en: "Grilled", jp: "焼き", kr: "구운" },
        "炸": { en: "Fried", jp: "揚げ", kr: "튀긴" },
        "清蒸": { en: "Steamed", jp: "蒸し", kr: "찜" },
        "紅燒": { en: "Braised", jp: "醤油煮込み", kr: "조림" },
        "三杯": { en: "Three-Cup", jp: "三杯", kr: "싼베이" },
        "鐵板": { en: "Teppanyaki", jp: "鉄板焼き", kr: "철판" },
        "宮保": { en: "Kung Pao", jp: "宮保", kr: "쿵보" },
        "麻婆": { en: "Mapo", jp: "麻婆", kr: "마파" },
        "蒜泥": { en: "Garlic Sauce", jp: "ニンニクソース", kr: "마늘소스" },
        "沙茶": { en: "Sacha Sauce", jp: "沙茶ソース", kr: "사차소스" },
        "新鮮": { en: "Fresh", jp: "新鮮な", kr: "신선한" }
    };

    let translated = text;
    for (let key in culinaryDict) {
        if (translated.includes(key)) {
            translated = translated.replace(new RegExp(key, 'g'), culinaryDict[key][lang] || key);
        }
    }

    if (translated === text) {
        if (lang === 'en') return text + " (Special Dish)";
        if (lang === 'jp') return text + " (特製料理)";
        if (lang === 'kr') return text + " (특선 요리)";
    }
    return translated;
}

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

db.ref('restaurant_orders').on('value', (snapshot) => {
    let data = snapshot.val();
    savedOrders = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
    if (document.getElementById('admin-screen').style.display === 'block') {
        renderAdminOrders();
        renderSalesChart();
    }
});

function chooseLang(lang) {
    currentLang = lang;
    updateUITexts();
    document.getElementById('lang-screen').style.display = 'none';
    document.getElementById('menu-screen').style.display = 'block';
    currentCategory = 'all';
    renderMenu(); 
}

function updateUITexts() {
    const t = uiTexts[currentLang];
    document.getElementById('ui-select-lang').innerText = t.selectLang;
    document.getElementById('ui-admin-login').innerText = t.adminLogin;
    document.getElementById('ui-back-lang').innerText = t.backLang;
    document.getElementById('ui-cart-btn').innerHTML = `🛒 ${t.cartBtn} (<span id="cart-count">0</span>)`;
    document.getElementById('ui-back-menu').innerText = t.backMenu;
    document.getElementById('ui-cart-title').innerText = t.cartTitle;
    document.getElementById('ui-checkout-btn').innerText = t.checkoutBtn;
    document.getElementById('ui-logout-admin').innerText = t.logoutAdmin;
    document.getElementById('ui-clear-orders').innerText = t.clearOrders;
    document.getElementById('ui-admin-title').innerText = t.adminTitle;
    document.getElementById('ui-add-menu-title').innerText = t.addMenuTitle;
    document.getElementById('ui-lbl-img').innerText = t.lblImg;
    document.getElementById('ui-lbl-name').innerText = t.lblName;
    document.getElementById('ui-lbl-desc').innerText = t.lblDesc;
    document.getElementById('ui-lbl-category').innerText = t.lblCategory;
    document.getElementById('ui-lbl-price').innerText = t.lblPrice;
    document.getElementById('ui-save-btn').innerText = editingItemId ? "確認修改餐點" : t.saveBtn;
    document.getElementById('ui-manage-menu-title').innerText = t.manageMenuTitle;
    document.getElementById('ui-sales-chart-title').innerText = t.salesChartTitle;
    document.getElementById('ui-order-list-title').innerText = t.orderListTitle;
    updateCartCount();
}

function backToLang() {
    document.getElementById('lang-screen').style.display = 'block';
    document.getElementById('menu-screen').style.display = 'none';
}

function backToMenu() {
    document.getElementById('cart-screen').style.display = 'none';
    document.getElementById('menu-screen').style.display = 'block';
}

function renderCategoryScroll() {
    const scrollContainer = document.getElementById('category-scroll');
    scrollContainer.innerHTML = '';

    const categories = ["all", "涼拌", "生鮮", "燒烤", "熱炒", "火鍋", "蒜酥", "三杯煲仔", "鐵板"];
    
    categories.forEach(cat => {
        let displayName = "";
        if (cat === 'all') {
            displayName = uiTexts[currentLang].allCategory;
        } else {
            displayName = categoriesMap[cat] ? categoriesMap[cat][currentLang] : cat;
        }

        let tab = document.createElement('button');
        tab.className = `category-tab ${currentCategory === cat ? 'active' : ''}`;
        tab.innerText = displayName;
        tab.onclick = () => {
            currentCategory = cat;
            renderCategoryScroll();
            renderFilteredMenu();
        };
        scrollContainer.appendChild(tab);
    });
}

function renderMenu() {
    renderCategoryScroll();
    renderFilteredMenu();
}

function renderFilteredMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = ''; 

    let filteredItems = menuData;
    if (currentCategory !== 'all') {
        filteredItems = menuData.filter(item => item.category === currentCategory);
    }

    if (filteredItems.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-size:18px; color:#777; padding:30px;">目前此分類沒有餐點</p>`;
        return;
    }

    filteredItems.forEach(item => {
        let displayName = currentLang === 'zh' ? item.name_zh : smartTranslate(item.name_zh, currentLang);
        let displayDesc = currentLang === 'zh' ? item.desc_zh : smartTranslate(item.desc_zh, currentLang);

        let menuItemHTML = `
            <div class="menu-item">
                <img src="${item.image_url}" alt="${displayName}">
                <div class="menu-info">
                    <h2>${displayName}</h2>
                    <p>${displayDesc}</p>
                    <div class="price">NT$ ${item.price}</div>
                    
                    <div class="add-action">
                        ${uiTexts[currentLang].qtyText} <input type="number" id="qty-${item.id}" value="1" min="1">
                        <button class="add-btn" onclick="addToCart('${item.id}')">${uiTexts[currentLang].addCartBtn}</button>
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
    const countSpan = document.getElementById('cart-count');
    if (countSpan) countSpan.innerText = totalItems;
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
    
    cartList.innerHTML += `<h3>${uiTexts[currentLang].totalText}: NT$ ${total}</h3>`;
}

function checkout() {
    if (cart.length === 0) {
        alert(uiTexts[currentLang].emptyCart);
        return;
    }
    
    const newOrder = {
        time: new Date().toLocaleString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
    
    const updatedOrders = [...savedOrders, newOrder];
    
    db.ref('restaurant_orders').set(updatedOrders).then(() => {
        alert(uiTexts[currentLang].orderSuccess);
        cart = []; 
        updateCartCount();
        document.getElementById('cart-screen').style.display = 'none';
        document.getElementById('lang-screen').style.display = 'block'; 
    }).catch(error => {
        alert("連線失敗：" + error);
    });
}

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

function deleteOrder(index) {
    if (confirm(`確定要刪除「訂單編號 #${index + 1}」嗎？`)) {
        savedOrders.splice(index, 1);
        db.ref('restaurant_orders').set(savedOrders).then(() => {
            alert("已成功刪除該筆訂單！");
        });
    }
}

function renderSalesChart() {
    let salesData = {}; 
    savedOrders.forEach(order => {
        order.items.forEach(item => {
            salesData[item.name] = (salesData[item.name] || 0) + item.quantity;
        });
    });

    const labels = Object.keys(salesData);
    const data = Object.values(salesData);
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    if (salesChartInstance) salesChartInstance.destroy();

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
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });
}

function clearOrders() {
    if (confirm("⚠️ 確定要清空所有的歷史訂單嗎？")) {
        db.ref('restaurant_orders').remove().then(() => {
            alert("歷史訂單已清空！");
        });
    }
}

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
                <span>[${item.category || '未分類'}] ${item.name_zh} (NT$ ${item.price})</span>
                <div class="admin-menu-actions">
                    <button class="edit-btn" onclick="editMenuItem('${item.id}')">✏️ 編輯餐點</button>
                    <button class="delete-btn" onclick="deleteMenuItem('${item.id}')">🗑️ 刪除餐點</button>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// === 點擊編輯：將該餐點的所有資料自動帶入上方表單 ===
function editMenuItem(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;

    editingItemId = itemId;
    document.getElementById('new-name').value = item.name_zh;
    document.getElementById('new-desc').value = item.desc_zh || '';
    document.getElementById('new-category').value = item.category || '熱炒';
    document.getElementById('new-price').value = item.price;
    document.getElementById('new-img').value = ''; // 清空檔案選擇器

    // 修改按鈕文字與顯示取消按鈕
    const saveBtn = document.getElementById('ui-save-btn');
    saveBtn.innerText = "確認修改餐點";
    saveBtn.style.background = "#ffc107";
    saveBtn.style.color = "#000";

    document.getElementById('ui-cancel-btn').style.display = "block";

    // 自動捲動到畫面最上方讓你直接修改
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === 取消編輯狀態 ===
function cancelEdit() {
    editingItemId = null;
    document.getElementById('new-name').value = '';
    document.getElementById('new-desc').value = '';
    document.getElementById('new-price').value = '';
    document.getElementById('new-img').value = '';
    
    const saveBtn = document.getElementById('ui-save-btn');
    saveBtn.innerText = uiTexts[currentLang].saveBtn;
    saveBtn.style.background = "#007BFF";
    saveBtn.style.color = "#fff";

    document.getElementById('ui-cancel-btn').style.display = "none";
}

function deleteMenuItem(itemId) {
    if (confirm("確定要刪除這道餐點嗎？")) {
        const updatedMenu = menuData.filter(item => item.id !== itemId);
        db.ref('restaurant_menu').set(updatedMenu).then(() => {
            alert("已成功刪除！");
        });
    }
}

// === 新增或更新餐點 (支援全欄位修改與圖片更新) ===
function addNewItem() {
    const name = document.getElementById('new-name').value;
    const desc = document.getElementById('new-desc').value;
    const category = document.getElementById('new-category').value;
    const price = parseInt(document.getElementById('new-price').value);
    const fileInput = document.getElementById('new-img');

    if (!name || !desc || isNaN(price)) {
        alert("⚠️ 請填寫完整資訊 (名稱、簡介、價格)！");
        return;
    }

    if (editingItemId) {
        // === 編輯模式：更新現有餐點 ===
        const item = menuData.find(i => i.id === editingItemId);
        if (!item) return;

        item.name_zh = name;
        item.desc_zh = desc;
        item.category = category;
        item.price = price;

        if (fileInput.files[0]) {
            // 如果有上傳新圖片就更新圖片
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                item.image_url = e.target.result;
                saveMenuToFirebase(name);
            };
            reader.readAsDataURL(file);
        } else {
            // 沒換圖片就保留原本的圖片
            saveMenuToFirebase(name);
        }
    } else {
        // === 新增模式：建立新餐點 ===
        if (!fileInput.files[0]) {
            alert("⚠️ 請選擇要上傳的餐點圖片！");
            return;
        }
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const newId = "A_" + new Date().getTime();
            const newItem = {
                id: newId,
                price: price,
                category: category,
                image_url: e.target.result,
                name_zh: name, 
                desc_zh: desc
            };

            menuData.push(newItem);
            saveMenuToFirebase(name);
        };
        reader.readAsDataURL(file);
    }
}

function saveMenuToFirebase(name) {
    db.ref('restaurant_menu').set(menuData).then(() => {
        alert(editingItemId ? `✅ 成功更新餐點：${name}！` : `✅ 成功新增餐點：${name}！`);
        cancelEdit();
    }).catch(error => {
        alert("儲存失敗：" + error);
    });
}