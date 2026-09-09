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
        tableLbl: "請輸入桌號：",
        checkoutBtn: "送出訂單",
        logoutAdmin: "⬅️ 登出並返回首頁",
        clearOrders: "🗑️ 清空未結帳訂單",
        adminTitle: "管理員後台",
        addMenuTitle: "➕ 新增 / 編輯餐點",
        manageMenuTitle: "📝 管理現有菜單 (編輯與刪除)",
        salesChartTitle: "📊 銷售數量統計",
        orderListTitle: "📝 進行中訂單 (收銀與加點)",
        allCategory: "全部餐點",
        qtyText: "數量:",
        addCartBtn: "➕ 加入購物車",
        totalText: "總計",
        emptyCart: "購物車是空的喔！",
        requireTable: "請選擇桌號！",
        orderSuccess: "訂單已送出！老闆已經收到通知囉！"
    },
    en: {
        selectLang: "Select Language",
        adminLogin: "⚙️ Admin Login",
        backLang: "⬅️ Back",
        cartBtn: "🛒 Cart",
        backMenu: "⬅️ Continue",
        cartTitle: "Cart (Order Details)",
        tableLbl: "Table No:",
        checkoutBtn: "Submit Order",
        logoutAdmin: "⬅️ Logout & Home",
        clearOrders: "🗑️ Clear Unpaid",
        adminTitle: "Admin Dashboard",
        addMenuTitle: "➕ Add / Edit Dish",
        manageMenuTitle: "📝 Manage Menu (Edit & Delete)",
        salesChartTitle: "📊 Sales Statistics",
        orderListTitle: "📝 Active Orders",
        allCategory: "All Dishes",
        qtyText: "Qty:",
        addCartBtn: "➕ Add to Cart",
        totalText: "Total",
        emptyCart: "Cart is empty!",
        requireTable: "Please enter your table number!",
        orderSuccess: "Order submitted! Boss notified!"
    },
    jp: {
        selectLang: "言語を選択してください / Select Language",
        adminLogin: "⚙️ 管理者ログイン",
        backLang: "⬅️ 戻る",
        cartBtn: "🛒 カート",
        backMenu: "⬅️ 注文続行",
        cartTitle: "カート (注文詳細)",
        tableLbl: "テーブル番号:",
        checkoutBtn: "注文を送信",
        logoutAdmin: "⬅️ ログアウト",
        clearOrders: "🗑️ 未会計をクリア",
        adminTitle: "管理者画面",
        addMenuTitle: "➕ 新規追加 / 編集",
        manageMenuTitle: "📝 メニュー管理 (編集・削除)",
        salesChartTitle: "📊 売上統計",
        orderListTitle: "📝 進行中の注文",
        allCategory: "すべて",
        qtyText: "数量:",
        addCartBtn: "🛒 カートに追加",
        totalText: "合計",
        emptyCart: "カートは空です！",
        requireTable: "テーブルを選択してください！",
        orderSent: "注文を送信しました！"
    },
    kr: {
        selectLang: "언어 선택 / Select Language",
        adminLogin: "⚙️ 관리자 로그인",
        backLang: "⬅️ 뒤로",
        cartBtn: "🛒 장바구니",
        backMenu: "⬅️ 계속 주문",
        cartTitle: "장바구니 (주문 상세)",
        tableLbl: "테이블 번호:",
        checkoutBtn: "주문하기",
        logoutAdmin: "⬅️ 로그아웃",
        clearOrders: "🗑️ 미결제 삭제",
        adminTitle: "관리자 대시보드",
        addMenuTitle: "➕ 메뉴 추가 / 수정",
        manageMenuTitle: "📝 메뉴 관리 (수정 및 삭제)",
        salesChartTitle: "📊 판매 통계",
        orderListTitle: "📝 진행 중인 주문",
        allCategory: "전체 메뉴",
        qtyText: "수량:",
        addCartBtn: "➕ 장바구니 담기",
        totalText: "합계",
        emptyCart: "장바구니가 비어 있습니다!",
        requireTable: "테이블을 선택해주세요!",
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

let menuData = [];
let savedOrders = [];
let ledgerData = []; 
let currentLang = 'zh'; 
let currentTable = ''; 
let currentCategory = 'all';
let editingItemId = null; 
let cart = []; 
let salesChartInstance = null; 

// === 核心運算：自動將散落的酒類統計並給予折抵 ===
window.calculateOrderTotal = function(items) {
    let total = 0;
    let specialWineCount = 0;
    
    items.forEach(item => {
        if (item.name.includes("特別酒類") && item.price === 100) {
            specialWineCount += item.quantity;
        }
        total += item.price * item.quantity; // 先以原價加總
    });
    
    // 如果符合 3 瓶以上，自動扣除折扣 (每 3 瓶扣 100)
    if (specialWineCount >= 3) {
        let promoSets = Math.floor(specialWineCount / 3);
        let discount = promoSets * 100;
        total -= discount;
    }
    return total;
};

async function translateWithGoogle(text, targetLang) {
    if (!text || text.trim() === "") return "";
    try {
        let tl = targetLang;
        if (targetLang === 'jp') tl = 'ja';
        if (targetLang === 'kr') tl = 'ko';

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-TW&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data[0]) {
            return data[0].map(segment => segment[0]).join('');
        }
        return text;
    } catch (error) {
        return text; 
    }
}

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

document.addEventListener("DOMContentLoaded", () => {
    const nameZhInput = document.getElementById('new-name-zh');
    const descZhInput = document.getElementById('new-desc-zh');
    let translateTimeout = null;

    const autoTranslate = (inputId, type) => {
        const val = document.getElementById(inputId).value;
        clearTimeout(translateTimeout);
        
        if (!val.trim()) {
            document.getElementById(`new-${type}-en`).value = "";
            document.getElementById(`new-${type}-jp`).value = "";
            document.getElementById(`new-${type}-kr`).value = "";
            return;
        }

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
        menuData = (Array.isArray(data) ? data : Object.values(data)).filter(item => item !== null);
    } else {
        menuData = [];
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
    }
});

db.ref('restaurant_ledger').on('value', (snapshot) => {
    let data = snapshot.val();
    ledgerData = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
    if (document.getElementById('admin-screen').style.display === 'block') {
        renderLedger();
        renderSalesChart(); 
    }
});

window.chooseLang = function(lang) {
    currentLang = lang;
    updateUITexts();
    document.getElementById('lang-screen').style.display = 'none';
    document.getElementById('table-screen').style.display = 'block'; 
}

window.backToLangFromTable = function() {
    document.getElementById('table-screen').style.display = 'none';
    document.getElementById('lang-screen').style.display = 'block';
}

window.confirmTable = function() {
    const tableVal = document.getElementById('table-select').value;
    if (!tableVal) {
        alert(uiTexts[currentLang].requireTable);
        return;
    }
    currentTable = tableVal;
    
    document.getElementById('current-table-display').innerText = currentTable;
    
    document.getElementById('table-screen').style.display = 'none';
    document.getElementById('menu-screen').style.display = 'block';
    currentCategory = 'all';
    renderMenu();
}

window.backToTable = function() {
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('table-screen').style.display = 'block';
}

function updateUITexts() {
    const t = uiTexts[currentLang];
    document.getElementById('ui-select-lang').innerText = t.selectLang;
    document.getElementById('ui-admin-login').innerText = t.adminLogin;
    
    if(document.getElementById('ui-select-table-title')) document.getElementById('ui-select-table-title').innerText = t.selectTableTitle;
    if(document.getElementById('ui-confirm-table-btn')) document.getElementById('ui-confirm-table-btn').innerText = t.confirmTableBtn;
    if(document.getElementById('ui-back-lang-from-table')) document.getElementById('ui-back-lang-from-table').innerText = t.backLang;
    if(document.getElementById('ui-back-table')) document.getElementById('ui-back-table').innerText = t.backTable;
    
    const tableSelect = document.getElementById('table-select');
    if(tableSelect && tableSelect.options.length > 0) {
        if(currentLang === 'zh') tableSelect.options[0].text = "-- 選擇桌號 --";
        if(currentLang === 'en') tableSelect.options[0].text = "-- Select Table --";
        if(currentLang === 'jp') tableSelect.options[0].text = "-- テーブル選択 --";
        if(currentLang === 'kr') tableSelect.options[0].text = "-- 테이블 선택 --";
    }

    document.getElementById('ui-cart-btn').innerHTML = `🛒 ${t.cartBtn} (<span id="cart-count">${cart.reduce((sum, item) => sum + item.quantity, 0)}</span>)`;
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
}

function backToMenu() {
    document.getElementById('cart-screen').style.display = 'none';
    document.getElementById('menu-screen').style.display = 'block';
}

function renderCategoryScroll() {
    const scrollContainer = document.getElementById('category-scroll');
    let htmlContent = '';
    const categories = ["all", "涼拌", "生鮮", "燒烤", "熱炒", "火鍋", "蒜酥", "三杯煲仔", "鐵板"];
    
    categories.forEach(cat => {
        let displayName = "";
        if (cat === 'all') {
            displayName = uiTexts[currentLang].allCategory;
        } else {
            displayName = categoriesMap[cat] ? categoriesMap[cat][currentLang] : cat;
        }
        let activeClass = currentCategory === cat ? 'active' : '';
        htmlContent += `<button class="category-tab ${activeClass}" onclick="switchCategory('${cat}')">${displayName}</button>`;
    });
    scrollContainer.innerHTML = htmlContent;
}

window.switchCategory = function(cat) {
    currentCategory = cat;
    renderCategoryScroll();
    renderFilteredMenu();
}

function renderMenu() {
    renderCategoryScroll();
    renderFilteredMenu();
}

function renderFilteredMenu() {
    const container = document.getElementById('menu-container');
    let filteredItems = menuData;
    
    if (currentCategory !== 'all') {
        filteredItems = menuData.filter(item => item.category === currentCategory);
    }

    if (filteredItems.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-size:18px; color:#777; padding:30px;">目前此分類沒有餐點</p>`;
        return;
    }

    let finalHTML = ''; 
    
    filteredItems.forEach(item => {
        let dbName = item[`name_${currentLang}`];
        let primaryName = (currentLang === 'zh') ? item.name_zh : 
                          ((dbName && dbName.trim() !== "" && dbName !== item.name_zh) ? dbName : fallbackTranslate(item.name_zh, currentLang));
        let secondaryName = (currentLang !== 'zh') ? `(${item.name_zh})` : '';

        let dbDesc = item[`desc_${currentLang}`];
        let primaryDesc = (currentLang === 'zh') ? item.desc_zh : 
                          ((dbDesc && dbDesc.trim() !== "" && dbDesc !== item.desc_zh) ? dbDesc : fallbackTranslate(item.desc_zh, currentLang));
        let secondaryDesc = (currentLang !== 'zh') ? `(${item.desc_zh})` : '';

        finalHTML += `
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
    });
    
    container.innerHTML = finalHTML;
}

window.addToCart = function(itemId) {
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

window.showCart = function() {
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('cart-screen').style.display = 'block';
    
    const cartList = document.getElementById('cart-list');
    let cartHTML = '';

    let total = calculateOrderTotal(cart);
    let specialWineCount = cart.reduce((sum, item) => (item.name.includes("特別酒類") && item.price === 100) ? sum + item.quantity : sum, 0);

    cart.forEach(cartItem => {
        let subtotal = cartItem.price * cartItem.quantity;
        cartHTML += `<li>${cartItem.name} x ${cartItem.quantity}份 - NT$ ${subtotal}</li>`;
    });
    
    if (specialWineCount >= 3) {
        let discount = Math.floor(specialWineCount / 3) * 100;
        cartHTML += `<li style="color:#e63946; list-style-type: none; font-weight: bold; margin-top: 10px;">🎉 促銷折抵 (特別酒類3瓶200): -NT$ ${discount}</li>`;
    }

    cartHTML += `<h3>${uiTexts[currentLang].totalText}: NT$ ${total}</h3>`;
    cartList.innerHTML = cartHTML;
}

window.checkout = function() {
    if (cart.length === 0) {
        alert(uiTexts[currentLang].emptyCart);
        return;
    }

    if (!currentTable) {
        alert(uiTexts[currentLang].requireTable);
        return;
    }
    
    const existingOrderIndex = savedOrders.findIndex(order => order.table === currentTable);
    let currentTime = new Date().toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' });

    if (existingOrderIndex !== -1) {
        let existingOrder = savedOrders[existingOrderIndex];
        
        // ⚠️ 關鍵更改：不再合併餐點數量，而是直接追加並標記為 "加點"
        cart.forEach(cartItem => {
            existingOrder.items.push({ ...cartItem, isAddOn: true, addTime: currentTime });  
        });
        
        existingOrder.time = new Date().toLocaleString(); 
        existingOrder.total = calculateOrderTotal(existingOrder.items); 
        
    } else {
        const newOrder = {
            time: new Date().toLocaleString(),
            table: currentTable, 
            items: cart.map(i => ({...i, isAddOn: false})), // 標記為原始餐點
            total: calculateOrderTotal(cart)
        };
        savedOrders.push(newOrder);
    }
    
    db.ref('restaurant_orders').set(savedOrders).then(() => {
        alert(uiTexts[currentLang].orderSuccess);
        cart = []; 
        updateCartCount();
        currentTable = ""; 
        document.getElementById('table-select').value = ""; 
        document.getElementById('cart-screen').style.display = 'none';
        document.getElementById('lang-screen').style.display = 'block'; 
    }).catch(error => {
        alert("連線失敗：" + error);
    });
}

// 登入密碼維持 0000
window.adminLogin = function() {
    const password = prompt("請輸入管理員密碼：");
    if (password === "0000") {
        document.getElementById('lang-screen').style.display = 'none';
        document.getElementById('admin-screen').style.display = 'block';
        renderAdminOrders();
        renderLedger();
        renderSalesChart();
        renderAdminMenu(); 
    } else if (password !== null) {
        alert("密碼錯誤！");
    }
}

window.logoutAdmin = function() {
    document.getElementById('admin-screen').style.display = 'none';
    document.getElementById('lang-screen').style.display = 'block';
}

// === 🚀 核心升級：左側原始餐點、右側後續加點 (雙欄專業排版) ===
function renderAdminOrders() {
    const container = document.getElementById('admin-orders');
    if (savedOrders.length === 0) {
        container.innerHTML = "<p style='color: #666; font-size: 18px;'>目前沒有任何未結帳的訂單。</p>";
        return;
    }
    
    let htmlContent = '';
    savedOrders.forEach((order, index) => {
        order.total = calculateOrderTotal(order.items);
        
        let tableText = order.table ? `<span style="color: #e53e3e; font-weight: bold; margin-left: 8px;">[桌號: ${order.table}]</span>` : '';
        
        let orderHTML = `<div class="order-card" style="background: white; border-top: 5px solid #3182ce; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <div style="border-bottom: 2px solid #edf2f7; padding-bottom: 12px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <h3 style="margin: 0; color: #2b6cb0; font-size: 22px;">📌 訂單 #${index + 1} ${tableText}</h3>
                <span style="font-size: 14px; color: #718096;">🕒 最新狀態: ${order.time}</span>
            </div>`;
            
        let originalItemsHTML = '';
        let addonItemsHTML = '';
        let specialWineCount = 0;

        order.items.forEach((item, itemIdx) => {
            if (item.name.includes("特別酒類") && item.price === 100) {
                specialWineCount += item.quantity;
            }

            let subtotal = item.price * item.quantity; // 顯示單品原價
            let timeText = item.addTime ? `<span style="font-size:13px; color:#a0aec0; margin-left:6px;">(${item.addTime})</span>` : '';

            let itemRow = `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #edf2f7;">
                    <div style="font-size: 17px; color: #2d3748; font-weight: 500; display: flex; align-items: center;">
                        <span style="display: inline-block; width: 35px; font-weight: bold; color: ${item.isAddOn ? '#dd6b20' : '#2b6cb0'};">${item.quantity}x</span>
                        ${item.name} ${timeText}
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <span style="font-size: 17px; font-weight: bold; color: #4a5568; min-width: 60px; text-align: right;">$${subtotal}</span>
                        <button onclick="removeOrderItem(${index}, ${itemIdx})" style="background: #fc8181; color: white; border: none; border-radius: 6px; padding: 6px 12px; font-size: 13px; cursor: pointer;">刪除</button>
                    </div>
                </div>`;

            if (item.isAddOn) {
                addonItemsHTML += itemRow;
            } else {
                originalItemsHTML += itemRow;
            }
        });

        // == 雙欄容器佈局 ==
        orderHTML += `<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 15px;">
            <div style="flex: 1; min-width: 300px; background: #faf8f5; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; align-self: flex-start;">
                <h4 style="margin: 0 0 10px 0; color: #4a5568; border-bottom: 2px solid #edf2f7; padding-bottom: 8px; font-size: 18px;">🧾 原始餐點</h4>
                ${originalItemsHTML || '<p style="color:#a0aec0; font-size:15px; margin:0;">無</p>'}
            </div>`;

        if (addonItemsHTML !== '') {
            orderHTML += `
            <div style="flex: 1; min-width: 300px; background: #fffaf0; padding: 15px; border-radius: 8px; border: 1px dashed #ecc94b; align-self: flex-start;">
                <h4 style="margin: 0 0 10px 0; color: #dd6b20; border-bottom: 2px solid #feebc8; padding-bottom: 8px; font-size: 18px;">⚡ 後續加點紀錄</h4>
                ${addonItemsHTML}
            </div>`;
        }
        orderHTML += `</div>`; // 雙欄容器結束

        // 如果有酒類折扣，獨立顯示在底下
        if (specialWineCount >= 3) {
            let discount = Math.floor(specialWineCount / 3) * 100;
            orderHTML += `<div style="text-align: right; color: #e53e3e; font-weight: bold; font-size: 17px; margin: 15px 0;">🎉 特別酒類促銷折抵: -NT$ ${discount}</div>`;
        }
            
        // 臨時加點面板與收銀區塊
        orderHTML += `
            <!-- 臨時加點面板 -->
            <div id="quick-add-${index}" style="display:none; background: #fffaf0; border: 1px dashed #ecc94b; padding: 15px; margin-top: 15px; border-radius: 8px;">
                <h4 style="margin-top:0; color:#b7791f; font-size: 16px;">⚡ 快速加點區 (海鮮/酒水)</h4>
                
                <div style="margin-bottom:12px; display:flex; align-items:center; flex-wrap:wrap; gap:8px;">
                    <select id="fish-type-${index}" style="padding: 8px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 15px;">
                        <option value="烤海魚">🐟 烤海魚</option>
                        <option value="清蒸海魚">🐟 清蒸海魚</option>
                    </select>
                    <span style="font-weight:bold;">$</span> 
                    <input type="number" id="fish-price-${index}" placeholder="輸入時價" style="width:100px; padding: 8px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 15px;">
                    <span style="font-weight:bold;">數量:</span> 
                    <input type="number" id="fish-qty-${index}" value="1" min="1" style="width:70px; padding: 8px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 15px;">
                    <button onclick="addFishToOrder(${index})" style="background: #d69e2e; color: white; border: none; padding: 9px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">加入帳單</button>
                </div>
                
                <div style="display:flex; align-items:center; flex-wrap:wrap; gap:8px;">
                    <select id="bev-type-${index}" style="padding: 8px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 15px; max-width: 280px;">
                        <option value="50" data-name="飲料/啤酒 ($50)">🥤 飲料/啤酒 ($50)</option>
                        <option value="80" data-name="啤酒 ($80)">🍺 啤酒 ($80)</option>
                        <option value="90" data-name="一般啤酒 ($90)">🍺 一般啤酒 ($90)</option>
                        <option value="100" data-name="飲料 ($100)">🍹 飲料 ($100)</option>
                        <option value="100" data-name="啤酒 ($100)">🍺 啤酒 ($100)</option>
                        <option value="100" data-name="特別酒類 (促銷3瓶200)">🍾 特別酒類 ($100 / 3瓶200)</option>
                        <option value="110" data-name="啤酒 ($110)">🍺 啤酒 ($110)</option>
                        <option value="120" data-name="啤酒 ($120)">🍺 啤酒 ($120)</option>
                        <option value="250" data-name="高級酒類 ($250)">🍷 高級酒類 ($250)</option>
                    </select>
                    <span style="font-weight:bold;">數量:</span> 
                    <input type="number" id="bev-qty-${index}" value="1" min="1" style="width:70px; padding: 8px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 15px;">
                    <button onclick="addBevToOrder(${index})" style="background: #d69e2e; color: white; border: none; padding: 9px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">加入帳單</button>
                </div>
            </div>

            <!-- 收銀機區塊 -->
            <div style="background: #f0fdf4; padding: 20px; margin-top: 15px; border-radius: 8px; border: 1px solid #9ae6b4;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap; gap:15px; margin-bottom: 15px;">
                    <span style="font-size:22px; font-weight:bold; color: #2d3748;">應收總額: <span style="color:#e53e3e;">NT$ ${order.total}</span></span>
                    
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 20px; font-weight: bold; color: #4a5568;">實收: $</span>
                        <input type="number" id="cash-received-${index}" oninput="calcChange(${index}, ${order.total})" style="width:120px; font-size:20px; text-align:center; padding: 6px; border: 1px solid #cbd5e0; border-radius: 6px;">
                    </div>
                    
                    <span style="font-size:22px; font-weight:bold; color:#276749;">找零: <span id="change-display-${index}">NT$ 0</span></span>
                </div>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button onclick="toggleQuickAdd(${index})" style="background:#d69e2e; color:white; border:none; padding:12px 15px; border-radius:6px; font-weight:bold; cursor:pointer; font-size: 16px;">➕ 臨時加點</button>
                    <button onclick="completeOrder(${index})" style="background: #38a169; color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 18px; font-weight: bold; flex: 1;">💰 確認結帳並印入帳本</button>
                    <button onclick="deleteOrder(${index})" style="background:#a0aec0; color:white; border:none; padding:12px 15px; border-radius:6px; font-weight:bold; cursor:pointer; font-size: 16px;">🗑️ 取消訂單</button>
                </div>
            </div>
            
        </div>`;
        htmlContent += orderHTML;
    });
    container.innerHTML = htmlContent;
}

window.calcChange = function(index, total) {
    const received = parseInt(document.getElementById(`cash-received-${index}`).value);
    const changeDisplay = document.getElementById(`change-display-${index}`);
    
    if (isNaN(received)) {
        changeDisplay.innerText = "NT$ 0";
        changeDisplay.style.color = "#276749";
    } else {
        const change = received - total;
        if (change < 0) {
            changeDisplay.innerText = `少 NT$ ${Math.abs(change)}`;
            changeDisplay.style.color = "#e53e3e";
        } else {
            changeDisplay.innerText = `NT$ ${change}`;
            changeDisplay.style.color = "#276749";
        }
    }
}

window.toggleQuickAdd = function(index) {
    const panel = document.getElementById(`quick-add-${index}`);
    if (panel.style.display === "none") {
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
}

window.addFishToOrder = function(orderIndex) {
    const type = document.getElementById(`fish-type-${orderIndex}`).value;
    const price = parseInt(document.getElementById(`fish-price-${orderIndex}`).value);
    const qty = parseInt(document.getElementById(`fish-qty-${orderIndex}`).value);

    if (isNaN(price) || price <= 0) return alert("請輸入正確的時價金額！");
    if (isNaN(qty) || qty <= 0) return alert("數量錯誤！");

    let order = savedOrders[orderIndex];
    let currentTime = new Date().toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    // ⚠️ 加入為加點屬性，不合併數量
    order.items.push({ id: "FISH_"+Date.now(), name: type, price: price, quantity: qty, isAddOn: true, addTime: currentTime });
    
    db.ref('restaurant_orders').set(savedOrders);
}

window.addBevToOrder = function(orderIndex) {
    const select = document.getElementById(`bev-type-${orderIndex}`);
    const price = parseInt(select.value);
    const name = select.options[select.selectedIndex].getAttribute('data-name');
    const qty = parseInt(document.getElementById(`bev-qty-${orderIndex}`).value);

    if (isNaN(qty) || qty <= 0) return alert("數量錯誤！");

    let order = savedOrders[orderIndex];
    let currentTime = new Date().toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' });

    order.items.push({ id: "BEV_"+Date.now(), name: name, price: price, quantity: qty, isAddOn: true, addTime: currentTime });
    db.ref('restaurant_orders').set(savedOrders);
}

window.removeOrderItem = function(orderIndex, itemIndex) {
    if (confirm("確定要刪除這個餐點嗎？")) {
        savedOrders[orderIndex].items.splice(itemIndex, 1);
        if (savedOrders[orderIndex].items.length === 0) {
            savedOrders.splice(orderIndex, 1);
        } else {
            savedOrders[orderIndex].total = calculateOrderTotal(savedOrders[orderIndex].items);
        }
        db.ref('restaurant_orders').set(savedOrders);
    }
}

window.completeOrder = function(index) {
    const orderToMove = savedOrders[index];
    orderToMove.total = calculateOrderTotal(orderToMove.items);
    
    const receivedInput = document.getElementById(`cash-received-${index}`);
    if (receivedInput && receivedInput.value) {
        const received = parseInt(receivedInput.value);
        if (received < orderToMove.total) {
            alert("⚠️ 實收金額不足，請確認後再結帳！");
            return;
        }
    }

    if (confirm(`確認結帳總金額 NT$ ${orderToMove.total}，並記入歷史帳本嗎？`)) {
        orderToMove.paidTime = new Date().toLocaleString(); 
        savedOrders.splice(index, 1);
        db.ref('restaurant_orders').set(savedOrders).then(() => {
            db.ref('restaurant_ledger').push(orderToMove);
            alert("✅ 結帳成功！已寫入帳本。");
        });
    }
}

window.deleteOrder = function(index) {
    if (confirm(`確定要取消「訂單編號 #${index + 1}」嗎？這將不會記錄到帳本中。`)) {
        savedOrders.splice(index, 1);
        db.ref('restaurant_orders').set(savedOrders).then(() => {
            alert("已取消該筆訂單！");
        });
    }
}

// === 渲染歷史帳本 ===
function renderLedger() {
    const container = document.getElementById('admin-ledger');
    let totalRevenue = 0;

    if (ledgerData.length === 0) {
        container.innerHTML = "<p style='color: #666;'>目前沒有已結帳的帳本紀錄。</p>";
        document.getElementById('total-revenue').innerText = "0";
        return;
    }

    let htmlContent = '';
    [...ledgerData].reverse().forEach((order) => {
        totalRevenue += order.total;
        let tableText = order.table ? `<span style="color: #e63946; font-weight: bold; margin-left: 10px;">[桌號: ${order.table}]</span>` : '';
        htmlContent += `<div class="order-card" style="border-top: 5px solid #38a169; background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
            <h3 style="color: #2f855a; margin-top:0; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">✅ 已結帳 ${tableText} <span style="font-size: 13px; color: #888; margin-left: 10px;">(結帳: ${order.paidTime || order.time})</span></h3>
            
            <div style="margin: 12px 0;">`;
            
        let specialWineCount = 0;
        order.items.forEach(item => {
            if (item.name.includes("特別酒類") && item.price === 100) specialWineCount += item.quantity;
            let subtotal = item.price * item.quantity;
            let typeTag = item.isAddOn ? `<span style="font-size:12px; color:#dd6b20; margin-left:6px;">(加點)</span>` : '';
            
            htmlContent += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px dashed #e2e8f0;">
                    <div style="color: #2d3748; font-size: 17px; font-weight: 500;">
                        <span style="display: inline-block; width: 35px; font-weight: bold; color: ${item.isAddOn ? '#dd6b20' : '#276749'};">${item.quantity}x</span>
                        ${item.name} ${typeTag}
                    </div>
                    <div>
                        <span style="color: #2d3748; font-weight: bold; font-size: 17px;">NT$ ${subtotal}</span>
                    </div>
                </div>`;
        });
        
        if (specialWineCount >= 3) {
            let discount = Math.floor(specialWineCount / 3) * 100;
            htmlContent += `<div style="text-align: right; color: #e53e3e; font-weight: bold; font-size: 15px; margin-top: 10px;">促銷折抵: -NT$ ${discount}</div>`;
        }
        
        htmlContent += `</div>
            <h4 style="margin-bottom:0; color: #22543d; text-align: right; font-size: 22px;">總額: NT$ ${order.total}</h4>
        </div>`;
    });

    container.innerHTML = htmlContent;
    document.getElementById('total-revenue').innerText = totalRevenue.toLocaleString();
}

window.clearOrders = function() {
    if (confirm("⚠️ 確定要清空所有的「未結帳」訂單嗎？")) {
        db.ref('restaurant_orders').remove().then(() => alert("未結帳訂單已清空！"));
    }
}

// === 將清空帳本密碼更新為 0905 ===
window.clearLedger = function() {
    const pwd = prompt("⚠️ 警告：清空帳本將刪除所有營業額紀錄！請輸入老闆專屬密碼確認：");
    if (pwd === "0905") {
        db.ref('restaurant_ledger').remove().then(() => alert("歷史帳本與營業額已全數清空！"));
    } else if (pwd !== null) {
        alert("密碼錯誤，拒絕清空！");
    }
}

function renderSalesChart() {
    let salesData = {}; 
    ledgerData.forEach(order => {
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
                label: '總銷售數量 (依已結帳計算)',
                data: data,
                backgroundColor: 'rgba(56, 161, 105, 0.6)',
                borderColor: 'rgba(56, 161, 105, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });
}

function renderAdminMenu() {
    const container = document.getElementById('admin-menu-list');
    if (menuData.length === 0) {
        container.innerHTML = "<p>目前沒有任何餐點。</p>";
        return;
    }
    
    let htmlContent = '';
    menuData.forEach((item, index) => {
        htmlContent += `
            <div class="admin-menu-item">
                <span>[${item.category || '未分類'}] ${item.name_zh} (NT$ ${item.price})</span>
                <div class="admin-menu-actions">
                    <button class="edit-btn" onclick="editMenuItem('${item.id}')">✏️ 編輯餐點</button>
                    <button class="delete-btn" onclick="deleteMenuItem(${index})">🗑️ 刪除</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = htmlContent;
}

window.editMenuItem = function(itemId) {
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

window.cancelEdit = function() {
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

window.deleteMenuItem = function(index) {
    if (confirm("確定要刪除這道餐點嗎？")) {
        menuData.splice(index, 1);
        db.ref('restaurant_menu').set(menuData).then(() => {
            alert("已成功刪除！");
        }).catch(err => {
            alert("刪除失敗：" + err);
        });
    }
}

window.compressAllOldImages = async function() {
    if (!confirm("⚠️ 這會自動將所有舊的大圖片壓縮，大幅提升網頁載入速度。這需要幾秒鐘的時間，確定要執行嗎？")) return;

    const btn = document.getElementById('compress-btn');
    btn.innerText = "🔄 壓縮中，請稍候...";
    btn.disabled = true;

    try {
        const compressPromise = (item) => {
            return new Promise((resolve) => {
                if (!item.image_url || !item.image_url.startsWith('data:image') || item.image_url.length < 100000) {
                    resolve(item);
                    return;
                }

                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 500; 
                    let scaleSize = 1;
                    if (img.width > MAX_WIDTH) {
                        scaleSize = MAX_WIDTH / img.width;
                    }
                    canvas.width = img.width * scaleSize;
                    canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
                    item.image_url = canvas.toDataURL('image/jpeg', 0.6); 
                    resolve(item);
                };
                img.onerror = () => resolve(item); 
                img.src = item.image_url;
            });
        };

        const updatedMenu = await Promise.all(menuData.map(item => compressPromise(item)));
        
        await db.ref('restaurant_menu').set(updatedMenu);
        alert("✅ 所有舊照片已成功壓縮！現在網頁載入速度應該會飛快了！");
        
    } catch (err) {
        alert("壓縮失敗：" + err);
    } finally {
        btn.innerText = "🚀 一鍵壓縮所有舊照片 (解決卡頓)";
        btn.disabled = false;
    }
}

function compressAndSaveImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            let scaleSize = 1;
            if (img.width > MAX_WIDTH) {
                scaleSize = MAX_WIDTH / img.width;
            }
            canvas.width = img.width * scaleSize;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8); 
            callback(compressedDataUrl);
        }
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

window.addNewItem = function() {
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
        const index = menuData.findIndex(i => i.id === editingItemId);
        if (index === -1) return;

        let updatePayload = {
            name_zh: nameZh, desc_zh: descZh,
            name_en: nameEn, desc_en: descEn,
            name_jp: nameJp, desc_jp: descJp,
            name_kr: nameKr, desc_kr: descKr,
            category: category, price: price
        };

        if (fileInput.files[0]) {
            compressAndSaveImage(fileInput.files[0], function(compressedImg) {
                updatePayload.image_url = compressedImg;
                db.ref(`restaurant_menu/${index}`).update(updatePayload).then(() => {
                    alert(`✅ 成功更新餐點：${nameZh}！`);
                    cancelEdit();
                }).catch(err => alert("儲存失敗：" + err));
            });
        } else {
            db.ref(`restaurant_menu/${index}`).update(updatePayload).then(() => {
                alert(`✅ 成功更新餐點：${nameZh}！`);
                cancelEdit();
            }).catch(err => alert("儲存失敗：" + err));
        }
    } else {
        if (!fileInput.files[0]) {
            alert("⚠️ 請選擇要上傳的餐點圖片！");
            return;
        }
        compressAndSaveImage(fileInput.files[0], function(compressedImg) {
            const newId = "A_" + new Date().getTime();
            const newItem = {
                id: newId,
                price: price,
                category: category,
                image_url: compressedImg,
                name_zh: nameZh, 
                desc_zh: descZh,
                name_en: nameEn,
                desc_en: descEn,
                name_jp: nameJp,
                desc_jp: descJp,
                name_kr: nameKr,
                desc_kr: descKr
            };
            
            const newIndex = menuData.length;
            db.ref(`restaurant_menu/${newIndex}`).set(newItem).then(() => {
                alert(`✅ 成功新增餐點：${nameZh}！`);
                cancelEdit();
            }).catch(err => alert("儲存失敗：" + err));
        });
    }
}