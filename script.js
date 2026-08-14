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
        backLang: "⬅️ 返回語言選擇",
        cartBtn: "🛒 購物車",
        backMenu: "⬅️ 繼續點餐",
        cartTitle: "購物車 (訂單明細)",
        checkoutBtn: "送出訂單",
        logoutAdmin: "⬅️ 登出並返回首頁",
        clearOrders: "🗑️ 清空所有歷史訂單",
        adminTitle: "管理員後台",
        addMenuTitle: "➕ 新增 / 編輯餐點",
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
        backLang: "⬅️ Back",
        cartBtn: "🛒 Cart",
        backMenu: "⬅️ Continue",
        cartTitle: "Cart (Order Details)",
        checkoutBtn: "Submit Order",
        logoutAdmin: "⬅️ Logout & Home",
        clearOrders: "🗑️ Clear All History",
        adminTitle: "Admin Dashboard",
        addMenuTitle: "➕ Add / Edit Dish",
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
        backLang: "⬅️ 戻る",
        cartBtn: "🛒 カート",
        backMenu: "⬅️ 注文続行",
        cartTitle: "カート (注文詳細)",
        checkoutBtn: "注文を送信",
        logoutAdmin: "⬅️ ログアウト",
        clearOrders: "🗑️ 履歴をすべてクリア",
        adminTitle: "管理者画面",
        addMenuTitle: "➕ 新規追加 / 編集",
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
        backLang: "⬅️ 뒤로",
        cartBtn: "🛒 장바구니",
        backMenu: "⬅️ 계속 주문",
        cartTitle: "장바구니 (주문 상세)",
        checkoutBtn: "주문하기",
        logoutAdmin: "⬅️ 로그아웃",
        clearOrders: "🗑️ 전체 내역 삭제",
        adminTitle: "관리자 대시보드",
        addMenuTitle: "➕ 메뉴 추가 / 수정",
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
        name_zh: "經典牛肉麵", desc_zh: "慢熬牛骨湯頭搭配手工麵條",
        name_en: "Classic Beef Noodle Soup", desc_en: "Slow-cooked beef bone broth with hand-pulled noodles",
        name_jp: "定番の牛肉麺", desc_jp: "じっくり煮込んだ牛骨スープと手作り麺",
        name_kr: "클래식 우육면", desc_kr: "천천히 끓인 소사골 육수와 수제 면"
    }
];

let menuData = [];
let savedOrders = [];
let currentLang = 'zh'; 
let currentCategory = 'all';
let editingItemId = null; 
let cart = []; 
let salesChartInstance = null; 

// === 1. 直接串接 Google Translate 隱藏版引擎 API ===
async function translateWithGoogle(text, targetLang) {
    if (!text || text.trim() === "") return "";
    try {
        // 將系統語言代碼對應為 Google 的代碼
        let tl = targetLang;
        if (targetLang === 'jp') tl = 'ja';
        if (targetLang === 'kr') tl = 'ko';

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-TW&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Google 回傳的格式為陣列，我們將翻譯片段提取並組合
        if (data && data[0]) {
            return data[0].map(segment => segment[0]).join('');
        }
        return text;
    } catch (error) {
        console.error("Google 翻譯 API 連線錯誤:", error);
        return text; // 失敗時保持原樣
    }
}

// === 2. 舊資料的備用翻譯字典 (當前台客人載入舊菜色時備用) ===
function fallbackTranslate(text, lang) {
    if (!text || lang === 'zh') return text;
    const dict = {
        "燙蝦子": { en: "Boiled Shrimp", jp: "エビの湯引き", kr: "데친 새우" },
        "魚下巴": { en: "Grilled Fish Collar", jp: "魚のカマ焼き", kr: "생선 턱살 구이" }
    };
    if (dict[text] && dict[text][lang]) return dict[text][lang];
    if (lang === 'en') return text + " (Special Dish)";
    if (lang === 'jp') return text + " (特製料理)";
    if (lang === 'kr') return text + " (특선 요리)";
    return text;
}

// === 3. 後台「打字即時自動翻譯」防手震聯動 ===
document.addEventListener("DOMContentLoaded", () => {
    const nameZhInput = document.getElementById('new-name-zh');
    const descZhInput = document.getElementById('new-desc-zh');
    let translateTimeout = null;

    const autoTranslate = (inputId, type) => {
        const val = document.getElementById(inputId).value;
        clearTimeout(translateTimeout);
        
        // 如果清空輸入框，就一併清空翻譯
        if (!val.trim()) {
            document.getElementById(`new-${type}-en`).value = "";
            document.getElementById(`new-${type}-jp`).value = "";
            document.getElementById(`new-${type}-kr`).value = "";
            return;
        }

        // 停止打字 0.8 秒後，顯示「翻譯中...」並呼叫 Google 翻譯
        translateTimeout = setTimeout(async () => {
            document.getElementById(`new-${type}-en`).value = "翻譯中...";
            document.getElementById(`new-${type}-jp`).value = "翻譯中...";
            document.getElementById(`new-${type}-kr`).value = "翻譯中...";

            const enText = await translateWithGoogle(val, 'en');
            const jpText = await translateWithGoogle(val, 'jp');
            const krText = await translateWithGoogle(val, 'kr');

            document.getElementById(`new-${type}-en`).value = enText;
            document.getElementById(`new-${type}-jp`).value = jpText;
            document.getElementById(`new-${type}-kr`).value = krText;
        }, 800);
    };

    if (nameZhInput) {
        nameZhInput.addEventListener('input', () => autoTranslate('new-name-zh', 'name'));
    }
    if (descZhInput) {
        descZhInput.addEventListener('input', () => autoTranslate('new-desc-zh', 'desc'));
    }
});

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
    document.getElementById('ui-save-btn').innerText = editingItemId ? "確認修改餐點" : "儲存新餐點";
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
        let dbName = item[`name_${currentLang}`];
        let primaryName = (currentLang === 'zh') ? item.name_zh : 
                          ((dbName && dbName.trim() !== "" && dbName !== item.name_zh) ? dbName : fallbackTranslate(item.name_zh, currentLang));
        let secondaryName = (currentLang !== 'zh') ? `(${item.name_zh})` : '';

        let dbDesc = item[`desc_${currentLang}`];
        let primaryDesc = (currentLang === 'zh') ? item.desc_zh : 
                          ((dbDesc && dbDesc.trim() !== "" && dbDesc !== item.desc_zh) ? dbDesc : fallbackTranslate(item.desc_zh, currentLang));
        let secondaryDesc = (currentLang !== 'zh') ? `(${item.desc_zh})` : '';

        let menuItemHTML = `
            <div class="menu-item">
                <img src="${item.image_url}" alt="${primaryName}">
                <div class="menu-info">
                    <div class="dish-title-container">
                        <h2 class="dish-main-name">${primaryName}</h2>
                        ${secondaryName ? `<span class="dish-sub-name">${secondaryName}</span>` : ''}
                    </div>
                    <p class="dish-desc">${primaryDesc} ${secondaryDesc ? `<br><small style="color:#888;">${secondaryDesc}</small>` : ''}</p>
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

function editMenuItem(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;

    editingItemId = itemId;
    document.getElementById('new-name-zh').value = item.name_zh || '';
    document.getElementById('new-desc-zh').value = item.desc_zh || '';
    document.getElementById('new-name-en').value = item.name_en || '';
    document.getElementById('new-desc-en').value = item.desc_en || '';
    document.getElementById('new-name-jp').value = item.name_jp || '';
    document.getElementById('new-desc-jp').value = item.desc_jp || '';
    document.getElementById('new-name-kr').value = item.name_kr || '';
    document.getElementById('new-desc-kr').value = item.desc_kr || '';
    document.getElementById('new-category').value = item.category || '熱炒';
    document.getElementById('new-price').value = item.price;
    document.getElementById('new-img').value = ''; 

    const saveBtn = document.getElementById('ui-save-btn');
    saveBtn.innerText = "確認修改餐點";
    saveBtn.style.background = "#d69e2e";

    document.getElementById('ui-cancel-btn').style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
    editingItemId = null;
    document.getElementById('new-name-zh').value = '';
    document.getElementById('new-desc-zh').value = '';
    document.getElementById('new-name-en').value = '';
    document.getElementById('new-desc-en').value = '';
    document.getElementById('new-name-jp').value = '';
    document.getElementById('new-desc-jp').value = '';
    document.getElementById('new-name-kr').value = '';
    document.getElementById('new-desc-kr').value = '';
    document.getElementById('new-price').value = '';
    document.getElementById('new-img').value = '';
    
    const saveBtn = document.getElementById('ui-save-btn');
    saveBtn.innerText = "儲存新餐點";
    saveBtn.style.background = "#007BFF";

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

function addNewItem() {
    const nameZh = document.getElementById('new-name-zh').value;
    const descZh = document.getElementById('new-desc-zh').value;
    const nameEn = document.getElementById('new-name-en').value;
    const descEn = document.getElementById('new-desc-en').value;
    const nameJp = document.getElementById('new-name-jp').value;
    const descJp = document.getElementById('new-desc-jp').value;
    const nameKr = document.getElementById('new-name-kr').value;
    const descKr = document.getElementById('new-desc-kr').value;
    const category = document.getElementById('new-category').value;
    const price = parseInt(document.getElementById('new-price').value);
    const fileInput = document.getElementById('new-img');

    if (!nameZh || !descZh || isNaN(price)) {
        alert("⚠️ 請至少填寫中文名稱、中文簡介與價格！");
        return;
    }

    if (editingItemId) {
        const item = menuData.find(i => i.id === editingItemId);
        if (!item) return;

        item.name_zh = nameZh;
        item.desc_zh = descZh;
        item.name_en = nameEn;
        item.desc_en = descEn;
        item.name_jp = nameJp;
        item.desc_jp = descJp;
        item.name_kr = nameKr;
        item.desc_kr = descKr;
        item.category = category;
        item.price = price;

        if (fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                item.image_url = e.target.result;
                saveMenuToFirebase(nameZh);
            };
            reader.readAsDataURL(file);
        } else {
            saveMenuToFirebase(nameZh);
        }
    } else {
        if (!fileInput.files[0]) {
            alert("⚠️ 請選擇要上傳的餐點圖片！");
            return;
        }
        const fileInputFile = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const newId = "A_" + new Date().getTime();
            const newItem = {
                id: newId,
                price: price,
                category: category,
                image_url: e.target.result,
                name_zh: nameZh, 
                desc_zh: descZh,
                name_en: nameEn,
                desc_en: descEn,
                name_jp: nameJp,
                desc_jp: descJp,
                name_kr: nameKr,
                desc_kr: descKr
            };

            menuData.push(newItem);
            saveMenuToFirebase(nameZh);
        };
        reader.readAsDataURL(fileInputFile);
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