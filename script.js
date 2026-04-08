
let generatedOTP;

// =========================
// STORAGE DATA
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let cartSeen = parseInt(localStorage.getItem("cartSeen")) || 0;
let wishlistSeen = parseInt(localStorage.getItem("wishlistSeen")) || 0;
let ordersSeen = parseInt(localStorage.getItem("ordersSeen")) || 0;

let lastCartClick = 0;
let lastWishlistClick = 0;
let lastBuyClick = 0;


// =========================
// OTP
// =========================
function sendOTP() {
    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();

    if (name === "" || mobile === "" || email === "") {
        alert("Please fill all details first");
        return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Enter valid 10-digit mobile number");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Enter valid email");
        return;
    }

    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    alert("Your OTP is : " + generatedOTP);
}

document.getElementById("name").addEventListener("keydown", function (e) {
    if (e.key === "Enter") document.getElementById("mobile").focus();
});

document.getElementById("mobile").addEventListener("keydown", function (e) {
    if (e.key === "Enter") document.getElementById("email").focus();
});

document.getElementById("email").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendOTP();
        document.getElementById("otp").focus();
    }
});

document.getElementById("otp").addEventListener("keydown", function (e) {
    if (e.key === "Enter") verifyOTP();
});

// =========================
// LOGIN
// =========================
function verifyOTP() {
    let userOTP = document.getElementById("otp").value;

    if (!generatedOTP) {
        alert("Please generate OTP first");
        return;
    }

    if (userOTP == generatedOTP) {
        let name = document.getElementById("name").value.trim();
        let mobile = document.getElementById("mobile").value.trim();
        let email = document.getElementById("email").value.trim();

        alert("Login Successful");

        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userName", name);
        sessionStorage.setItem("userMobile", mobile);
        sessionStorage.setItem("userEmail", email);

        document.getElementById("welcome").style.display = "none";
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("mainSite").style.display = "block";

        document.getElementById("pname").innerText = "Name : " + name;
        document.getElementById("pmobile").innerText = "Mobile : " + mobile;
        document.getElementById("pemail").innerText = "Email : " + email;

        goHome();
        updateNavCounts();
    } else {
        alert("Wrong OTP");
    }
}



window.onload = function () {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");

    // Always hide first
    document.getElementById("welcome").style.display = "none";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainSite").style.display = "none";

    // Load slider after page load
    slides = document.querySelectorAll(".slide");
    dots = document.querySelectorAll(".dot");

    // Load cart/wishlist/orders
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    orders = JSON.parse(localStorage.getItem("orders")) || [];

    cartSeen = parseInt(localStorage.getItem("cartSeen")) || 0;
    wishlistSeen = parseInt(localStorage.getItem("wishlistSeen")) || 0;
    ordersSeen = parseInt(localStorage.getItem("ordersSeen")) || 0;

    if (isLoggedIn === "true") {
        // Direct open website
        document.getElementById("mainSite").style.display = "block";

        document.getElementById("pname").innerText = "Name : " + (sessionStorage.getItem("userName") || "");
        document.getElementById("pmobile").innerText = "Mobile : " + (sessionStorage.getItem("userMobile") || "");
        document.getElementById("pemail").innerText = "Email : " + (sessionStorage.getItem("userEmail") || "");

        goHome();
    } else {
        // Show animation first
        document.getElementById("welcome").style.display = "flex";

        setTimeout(function () {
            document.getElementById("welcome").style.display = "none";
            document.getElementById("loginBox").style.display = "block";
        }, 3000);
    }

    updateNavCounts();

    if (slides.length > 0) {
        showSlide(0);
        setInterval(autoSlide, 3000);
    }
};

// =========================
// PROFILE
// =========================
function showProfile() {
    let box = document.getElementById("profileBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (e) {
    let profile = document.getElementById("profileBox");
    let icon = document.getElementById("profileIcon");

    if (profile && icon && !profile.contains(e.target) && !icon.contains(e.target)) {
        profile.style.display = "none";
    }
});

// =========================
// LOGOUT
// =========================
function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userMobile");
    sessionStorage.removeItem("userEmail");

    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("orders");

    localStorage.removeItem("cartSeen");
    localStorage.removeItem("wishlistSeen");
    localStorage.removeItem("ordersSeen");

    location.reload();
}

// =========================
// SLIDER
// =========================
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let index = 0;

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    if (slides[i]) slides[i].classList.add("active");
    if (dots[i]) dots[i].classList.add("active");

    index = i;
}

function currentSlide(i) {
    showSlide(i);
}

function autoSlide() {
    index++;
    if (index >= slides.length) index = 0;
    showSlide(index);
}

setInterval(autoSlide, 3000);

// =========================
// SEARCH HELPERS
// =========================
function flattenCategory(category) {
    let items = [];

    if (Array.isArray(category)) {
        category.forEach(item => items.push(item));
    } else {
        for (let key in category) {
            if (Array.isArray(category[key])) {
                category[key].forEach(item => items.push(item));
            } else if (typeof category[key] === "object") {
                for (let subKey in category[key]) {
                    category[key][subKey].forEach(item => items.push(item));
                }
            }
        }
    }

    return items;
}

function getAllProducts() {
    let all = [];

    let allData = [
        bats,
        balls,
        gloves,
        helmets,
        stumps,
        kits,
        footballBrands,
        footballShoes,
        jerseys,
        footballGloves,
        rackets,
        shuttles,
        basketballs,
        basketballShoes,
        basketballJersey,
        tennisRackets,
        tennisBalls
    ];

    allData.forEach(category => {
        all = all.concat(flattenCategory(category));
    });

    return all;
}

// =========================
// SEARCH
// =========================
function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase().trim();

    if (input === "") {
        alert("Please enter product name");
        return;
    }

    let all = getAllProducts();

    let results = all.filter(item =>
        item.name.toLowerCase().includes(input)
    );

    if (results.length === 0) {
        alert("No product found");
        return;
    }

    showProducts("Search Results", results);

    document.getElementById("productSection").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("searchInput").addEventListener("input", function () {
    let input = this.value.toLowerCase().trim();
    let box = document.getElementById("suggestionsBox");
    box.innerHTML = "";

    if (input === "") {
        box.style.display = "none";
        return;
    }

    let all = getAllProducts();

    let filtered = all.filter(p =>
        p.name.toLowerCase().includes(input)
    ).slice(0, 5);

    if (filtered.length === 0) {
        box.style.display = "none";
        return;
    }

    filtered.forEach(item => {
        let div = document.createElement("div");

        let name = item.name.replace(
            new RegExp(input, "gi"),
            match => `<span class="highlight">${match}</span>`
        );

        div.innerHTML = name;

        div.onclick = function () {
            document.getElementById("searchInput").value = item.name;
            box.style.display = "none";
            showProducts("Search Result", [item]);

            document.getElementById("productSection").scrollIntoView({
                behavior: "smooth"
            });
        };

        box.appendChild(div);
    });

    box.style.display = "block";
});

document.getElementById("searchInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchProducts();
        document.getElementById("suggestionsBox").style.display = "none";
    }
});

// =========================
// HIDE SECTIONS
// =========================
function hideAllSections() {
    let sections = document.querySelectorAll(
        '#cricketSection, #footballSection, #badmintonSection, #basketballSection, #tennisSection, #batSection, #ballSection, #glovesTypeSection, #battingCompanies, #keeperCompanies, #helmetCompanies, #stumpsCompanies, #kitCompanies, #footballCompanySection, #footballShoesSection, #jerseySection, #footballGlovesSection, #racketSection, #shuttleSection, #basketballBallSection, #basketballShoesSection, #basketballJerseySection, #tennisRacketSection, #tennisBallSection, #productSection'
    );

    sections.forEach(section => {
        section.style.display = "none";
    });
}

// =========================
// CART
// =========================
function addCart(name, price, img = "") {
    let now = new Date().getTime();
    if (now - lastCartClick < 400) return;
    lastCartClick = now;

    cart.push({ name, price, img });
    saveCart();

    alert(name + " added to cart");
}

function showCart() {
    hideAllPages();
    document.getElementById("cartPage").style.display = "block";
    setActiveNav("navCart");
    window.scrollTo({ top: 0, behavior: "smooth" });

    let box = document.getElementById("cartContainer");
    box.innerHTML = "";

    if (cart.length === 0) {
        box.innerHTML = "<p style='text-align:center;'>🛒 Cart is Empty</p>";
    } else {
        cart.forEach((item, index) => {
            box.innerHTML += `
            <div class="card product">
                <img src="${item.img}">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <div class="product-btns">
                    <button class="buy-btn" onclick="buyItem('${item.name}', ${item.price}, '${item.img}')">Buy Now</button>
                    <button class="remove-btn" onclick="removeCart(${index})">Remove</button>
                </div>
            </div>
            `;
        });
    }

    cartSeen = cart.length;
    localStorage.setItem("cartSeen", cartSeen);
    updateNavCounts();
}

function removeCart(index) {
    cart.splice(index, 1);
    saveCart();

    if (cartSeen > cart.length) {
        cartSeen = cart.length;
        localStorage.setItem("cartSeen", cartSeen);
    }

    showCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateNavCounts();
}

// =========================
// WISHLIST
// =========================
function addWishlist(name, price = 0, img = "") {
    let now = new Date().getTime();
    if (now - lastWishlistClick < 400) return;
    lastWishlistClick = now;

    wishlist.push({ name, price, img });
    saveWishlist();

    alert(name + " added to wishlist");
}

function showWishlist() {
    hideAllPages();
    document.getElementById("wishlistPage").style.display = "block";
    setActiveNav("navWishlist");
    window.scrollTo({ top: 0, behavior: "smooth" });

    let box = document.getElementById("wishlistContainer");
    box.innerHTML = "";

    if (wishlist.length === 0) {
        box.innerHTML = "<p style='text-align:center;'>❤️ Wishlist is Empty</p>";
    } else {
        wishlist.forEach((item, index) => {
            box.innerHTML += `
            <div class="card product">
                <img src="${item.img}">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <div class="product-btns">
                    <button class="move-btn" onclick="moveWishlistToCart(${index})">Move to Cart</button>
                    <button class="remove-btn" onclick="removeWishlist(${index})">Remove</button>
                </div>
            </div>
            `;
        });
    }

    wishlistSeen = wishlist.length;
    localStorage.setItem("wishlistSeen", wishlistSeen);
    updateNavCounts();
}

function removeWishlist(index) {
    wishlist.splice(index, 1);
    saveWishlist();

    if (wishlistSeen > wishlist.length) {
        wishlistSeen = wishlist.length;
        localStorage.setItem("wishlistSeen", wishlistSeen);
    }

    showWishlist();
}

function moveWishlistToCart(index) {
    if (!wishlist[index]) return;

    let item = wishlist[index];

    cart.push(item);
    wishlist.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    if (wishlistSeen > wishlist.length) {
        wishlistSeen = wishlist.length;
        localStorage.setItem("wishlistSeen", wishlistSeen);
    }

    alert(item.name + " moved to cart");

    updateNavCounts();
    showWishlist();
}

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateNavCounts();
}

// =========================
// ORDERS
// =========================
function showOrders() {
    hideAllPages();
    document.getElementById("ordersPage").style.display = "block";
    setActiveNav("navOrders");
    window.scrollTo({ top: 0, behavior: "smooth" });

    let box = document.getElementById("ordersContainer");
    box.innerHTML = "";

    if (orders.length === 0) {
        box.innerHTML = "<p style='text-align:center;'>📦 No Orders Yet</p>";
    } else {
        orders.forEach((o, i) => {
            box.innerHTML += `
            <div class="card product">
                <img src="${o.img}">
                <h3>${o.item}</h3>
                <p>Price: ₹${o.price}</p>
                <p>Qty: ${o.qty}</p>
                <p>Total: ₹${o.total}</p>
                <p>Status: <b style="color:${o.status === 'Ordered' ? '#16a34a' : '#dc2626'};">${o.status}</b></p>
                <p>Delivery: ${o.delivery}</p>
                <div class="product-btns">
                   ${o.status === "Ordered"
                    ? `<button class="cancel-btn" onclick="cancelOrder(${i})">Cancel Order</button>`
                    : `<button class="cancelled-btn" disabled>Cancelled</button>`
                    }
                </div>
            </div>
            `;
        });
    }

    let activeOrders = orders.filter(o => o.status === "Ordered").length;
    ordersSeen = activeOrders;
    localStorage.setItem("ordersSeen", ordersSeen);
    updateNavCounts();
}

function cancelOrder(index) {
    orders[index].status = "Cancelled";
    saveOrders();

    let activeOrders = orders.filter(o => o.status === "Ordered").length;
    if (ordersSeen > activeOrders) {
        ordersSeen = activeOrders;
        localStorage.setItem("ordersSeen", ordersSeen);
    }

    showOrders();
}

let currentItem = "";
let currentPrice = 0;
let currentImg = "";
let quantity = 1;

function buyItem(name, price, img = "") {
    currentItem = name;
    currentPrice = price;
    currentImg = img;
    quantity = 1;

    document.getElementById("buyItemName").innerText = name;
    document.getElementById("buyPrice").innerText = "Price: ₹" + price;
    document.getElementById("qty").innerText = quantity;
    document.getElementById("totalPrice").innerText = price;

    document.getElementById("buyModal").style.display = "flex";
}

function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
    updateNavCounts();
}

function increaseQty() {
    quantity++;
    updateTotal();
}

function decreaseQty() {
    if (quantity > 1) {
        quantity--;
        updateTotal();
    }
}

function updateTotal() {
    document.getElementById("qty").innerText = quantity;
    document.getElementById("totalPrice").innerText = quantity * currentPrice;
}

function closeModal() {
    document.getElementById("buyModal").style.display = "none";
}

function confirmBuy() {
    let now = new Date().getTime();
    if (now - lastBuyClick < 400) return;
    lastBuyClick = now;

    let today = new Date();
    let delivery = new Date();
    delivery.setDate(today.getDate() + 7);

    orders.push({
        item: currentItem,
        price: currentPrice,
        img: currentImg,
        qty: quantity,
        total: quantity * currentPrice,
        status: "Ordered",
        delivery: delivery.toLocaleDateString()
    });

    saveOrders();

    alert("Order Placed");
    closeModal();
}

// =========================
// HOME / NAV
// =========================
function goHome() {
    hideAllPages();
    document.getElementById("homePage").style.display = "block";
    setActiveNav("navHome");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideAllPages() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("wishlistPage").style.display = "none";
    document.getElementById("ordersPage").style.display = "none";
    document.getElementById("cartPage").style.display = "none";
}

function updateNavCounts() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    orders = JSON.parse(localStorage.getItem("orders")) || [];

    cartSeen = parseInt(localStorage.getItem("cartSeen")) || 0;
    wishlistSeen = parseInt(localStorage.getItem("wishlistSeen")) || 0;
    ordersSeen = parseInt(localStorage.getItem("ordersSeen")) || 0;

    let wishlistCount = document.getElementById("wishlistCount");
    let ordersCount = document.getElementById("ordersCount");
    let cartCount = document.getElementById("cartCount");

    if (!wishlistCount || !ordersCount || !cartCount) return;

    let activeOrders = orders.filter(order => order.status === "Ordered").length;

    let newWishlist = wishlist.length > wishlistSeen ? wishlist.length - wishlistSeen : 0;
    let newCart = cart.length > cartSeen ? cart.length - cartSeen : 0;
    let newOrders = activeOrders > ordersSeen ? activeOrders - ordersSeen : 0;

    wishlistCount.innerText = newWishlist > 0 ? newWishlist : "";
    cartCount.innerText = newCart > 0 ? newCart : "";
    ordersCount.innerText = newOrders > 0 ? newOrders : "";
}

function setActiveNav(activeId) {
    let navs = document.querySelectorAll(".nav-item");
    navs.forEach(nav => nav.classList.remove("active-nav"));
    let active = document.getElementById(activeId);
    if (active) active.classList.add("active-nav");
}

// =========================
// PRODUCT SHOW
// =========================
function showProducts(title, data) {
    let input = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

    document.getElementById("productSection").style.display = "block";
    document.getElementById("productTitle").innerText = title;

    let box = document.getElementById("productContainer");
    box.innerHTML = "";

    data.forEach(function (p) {
        let name = p.name;

        if (input) {
            name = name.replace(
                new RegExp(input, "gi"),
                match => `<span class="highlight">${match}</span>`
            );
        }

        box.innerHTML += `
        <div class="card product">
            <img src="${p.img}">
            <h3>${name}</h3>
            <p>₹${p.price}</p>
            <div class="product-btns">
                <button class="cart-btn" onclick="addCart('${p.name}', ${p.price}, '${p.img}')">Cart</button>
                <button class="wish-btn" onclick="addWishlist('${p.name}', ${p.price}, '${p.img}')">Wishlist</button>
                <button class="buy-btn" onclick="buyItem('${p.name}', ${p.price}, '${p.img}')">Buy</button>
            </div>
        </div>`;
    });

    box.scrollIntoView({ behavior: "smooth" });
}

// =========================
// COMMON SECTION FUNCTIONS
// =========================
function openSection(mainSectionId, itemsId, subSectionId) {
    hideAllSections();

    if (mainSectionId) {
        let main = document.getElementById(mainSectionId);
        if (main) main.style.display = "block";
    }

    if (itemsId) {
        let items = document.getElementById(itemsId);
        if (items) items.style.display = "grid";
    }

    if (subSectionId) {
        let sub = document.getElementById(subSectionId);
        if (sub) {
            sub.style.display = "block";
            sub.scrollIntoView({ behavior: "smooth" });
        }
    }
}

function showCategoryProducts(mainSectionId, itemsId, subSectionId, title, data) {
    hideAllSections();

    if (mainSectionId) {
        let main = document.getElementById(mainSectionId);
        if (main) main.style.display = "block";
    }

    if (itemsId) {
        let items = document.getElementById(itemsId);
        if (items) items.style.display = "grid";
    }

    if (subSectionId) {
        let sub = document.getElementById(subSectionId);
        if (sub) sub.style.display = "block";
    }

    showProducts(title, data);
}

/*Cricke*/
function showCricket() {
    openSection("cricketSection", "cricketItems", "cricketSection");
}

function openBat(){
    openSection("cricketSection", "cricketItems", "batSection");
}

function showBats(company){
showProducts(company + " Bats", 
bats[company]);
}


let bats={

MRF:[
{name:"MRF Genius",price:3500,img:"MRFbat.webp"},
{name:"MRF Drive",price:4000,img:"MRFbat.webp"},
{name:"MRF VK18",price:4200,img:"MRFbat.webp"},
{name:"MRF Power",price:3800,img:"MRFbat.webp"}
],
CEAT:[
{name:"CEAT Hitman",price:3200,img:"CEATbat.webp"},
{name:"CEAT Rohit Edition",price:3500,img:"CEATbat.webp"},
{name:"CEAT Power",price:3000,img:"CEATbat.webp"}
],

SG:[
{name:"SG Sunny",price:2800,img:"SGbat.webp"},
{name:"SG Cobra",price:3100,img:"SGbat.webp"}
],

REEBOK:[
{name:"REEBOK Blast",price:4500,img:"REEBOKbat.webp"},
{name:"REEBOK Super Drive",price:5700,img:"REEBOKbat.webp"}
],

KOOKABURRA:[
{name:"KOOKABURRA Kahuna",price:3400,img:"Kookaburrabat.webp"},
{name:"KOOKABURRA Beast",price:3700,img:"Kookaburrabat.webp"}
]

};


function openball(){
    openSection("cricketSection", "cricketItems", "ballSection");
}

let balls={

SG:[
{name:"SG T20 Ball WHITE",price:800,img:"SGBallt20.webp"},
{name:"SG T20 Ball RED",price:860,img:"SGballt20red.jpg"},
{name:"SG ODI Ball WHITE",price:1060,img:"sgballodiw.jpg"},
{name:"SG ODI Ball RED",price:1120,img:"sgballodir.webp"},
{name:"SG TEST Ball WHITE",price:670,img:"sgballtestw.webp"},
{name:"SG TEST Ball RED",price:600,img:"sgballtestr.jpg"}
],

KOOKABURRA:[
{name:"KOOKABURRA T20 Ball WHITE",price:870,img:"kookaburraballt20w.avif"},
{name:"KOOKABURRA T20 Ball RED",price:960,img:"kookaburrat20r.jpg"},
{name:"KOOKABURRA ODI Ball WHITE",price:1020,img:"kookaburraballodiw.webp"},
{name:"KOOKABURRA ODI Ball RED",price:1200,img:"kookaburraballodir.png"},
{name:"KOOKABURRA TEST Ball WHITE",price:650,img:"kookaburraballtestw.webp"},
{name:"KOOKABURRA TEST Ball RED",price:660,img:"kookaburraballtestr.jpg"}
],

SS:[
{name:"SS T20 Ball WHITE",price:740,img:"SSballt20w.jpg"},
{name:"SS T20 Ball RED",price:810,img:"Ssballt20r.jpg"},
{name:"SS ODI Ball WHITE",price:960,img:"SSballodiw.webp"},
{name:"SS ODI Ball RED",price:1020,img:"ssballodir.jpg"},
{name:"SS TEST Ball WHITE",price:570,img:"SSballtestw.webp"},
{name:"SS TEST Ball RED",price:590,img:"SSballtestr.jpg"}
]


};

function showBalls(company){
showProducts(company + " Balls",
balls[company]);
}

function opengloves(){
    openSection("cricketSection", "cricketItems", "glovesTypeSection");
}

function showBattingCompanies(){
    hideAllSections();

    document.getElementById("cricketSection").style.display = "block";
    document.getElementById("cricketItems").style.display = "grid";

    document.getElementById("glovesTypeSection").style.display = "block";
    document.getElementById("battingCompanies").style.display = "block";

    document.getElementById("battingCompanies").scrollIntoView({behavior:"smooth"});
}


function showKeeperCompanies(){
    hideAllSections();

    document.getElementById("cricketSection").style.display = "block";
    document.getElementById("cricketItems").style.display = "grid";

    document.getElementById("glovesTypeSection").style.display = "block";
    document.getElementById("keeperCompanies").style.display = "block";

    document.getElementById("keeperCompanies").scrollIntoView({behavior:"smooth"});
}


let gloves = {

batting:{

MRF:[
{name:"MRF Batting Gloves King",price:1500,img:"MRFglovesc.webp"},
{name:"MRF Batting Gloves ABD",price:1800,img:"MRFglovesc1.jpg"}
],

SG:[
{name:"SG Batting Gloves KL",price:1300,img:"SGglovesc.jpg"},
{name:"SG Batting Gloves HARDIK",price:1600,img:"SGglovesc1.jpg"},
{name:"SG Batting Gloves SALT",price:1600,img:"SGglovesc2.webp"},
],

SS:[
{name:"SS Batting Gloves JADDU",price:1400,img:"SSglovesc.jpg"},
{name:"SS Batting Gloves DUBEY",price:1600,img:"SSglovesc1.jpg"},
{name:"SS Batting Gloves SANJU",price:1600,img:"TONglovesc.jpg"}
],

DSC:[
{name:"DSC Batting Gloves SAM-CURREN",price:1200,img:"DSCglovesc.jpg"},
{name:"DSC Batting Gloves HEAD",price:1600,img:"DSCglovesc1.jpg"}
]

},

keeper:{

SG:[
{name:"SG Keeper Gloves DE-COCK",price:2000,img:"SGglovesk.jpg"},
{name:"SG Keeper Gloves BUTTLER",price:1600,img:"SGglovesk1.jpg"}
],

SS:[
{name:"SS Keeper Gloves KLASSEN",price:2200,img:"SSglovesk.jpg"},
{name:"SS Keeper Gloves STTUBS",price:1600,img:"TONglovesk.jpg"}
],

DSC:[
{name:"DSC Keeper Gloves THALA",price:1900,img:"DSCglovesk.jpg"},
{name:"DSC Keeper Gloves DHONI",price:1600,img:"DSCglovesk1.jpg"}
]

}

};


/* SHOW PRODUCTS */

function showGloves(type, company){
    hideAllSections();

    document.getElementById("cricketSection").style.display = "block";
    document.getElementById("cricketItems").style.display = "grid";

    document.getElementById("glovesTypeSection").style.display = "block";

    if(type === "batting"){
        document.getElementById("battingCompanies").style.display = "block";
    } else {
        document.getElementById("keeperCompanies").style.display = "block";
    }

    showProducts(company + " Gloves",
    gloves[type][company]);
}

function openHelmet(){
    openSection("cricketSection", "cricketItems", "helmetCompanies");
}


let helmets = {

MRF:[
{name:"MRF Helmet KING",price:2500,img:"MRFhelmet.webp"},
{name:"MRF Helmet ABD",price:2800,img:"MRFhelmet1.jpg"}
],

SG:[
{name:"SG Helmet KL-RAHUL",price:2200,img:"SGhelmet.jpg"},
{name:"SG Helmet GILL",price:2400,img:"SGhelmet1.jpg"},
{name:"SG Helmet ABHISHEK",price:2400,img:"SGhelmet2.jpg"}
],

SS:[
{name:"SS Helmet JADEJA",price:2300,img:"SShelmet.jpg"},
{name:"SG Helmet BREVIS",price:2400,img:"SShelmet1.jpg"}
],

DSC:[
{name:"DSC Helmet MAHI",price:2100,img:"DSChelmet1.jpg"},
{name:"DSC Helmet MCculum",price:2400,img:"DSChelmet.jpg"},
]

};


function showHelmet(company){
showProducts(company + " Helmets",
helmets[company]);
}

function openStumps(){
    openSection("cricketSection", "cricketItems", "stumpsCompanies");
}


let stumps = {

SG:[
{name:"SG Wooden Stumps",price:1500,img:"SGstumps.jpg"},
{name:"SG Black Sticky",price:2100,img:"SGstumps1.jpg"},
{name:"SG Plastic Stumps",price:1000,img:"SGstumps2.webp"}
],

SS:[
{name:"SS Match Stumps",price:1800,img:"SSstump.jpg"},
{name:"SS Plastic Stumps",price:1100,img:"SSstump1.jpg"}
],

DSC:[
{name:"DSC Training Stumps",price:2300,img:"DSCstumps.jpg"},
{name:"DSC Premium Stumps",price:1700,img:"DSCstump2.jpg"},
{name:"DSC Wooden Stumps",price:1200,img:"DSCstump1.jpg"}
]

};

function showStumps(company){
showProducts(company + " Stumps",
stumps[company]);
}

function openCricketkit(){
    openSection("cricketSection", "cricketItems", "kitCompanies");
}

let kits = {

SG:[
{name:"SG Full Cricket Kit",price:8400,img:"SGkit.jpg"},
{name:"SG Starter Kit",price:5500,img:"SGkit1.jpg"},
{name:"SG Classy Kit",price:9200,img:"SGkit2.jpg"}
],

SS:[
{name:"SS Premium Kit",price:5500,img:"SSkit.jpg"},
{name:"SS Sky Kit",price:6400,img:"SSkit1.webp"},
{name:"SS JADDU Kit",price:5500,img:"SSkit2.jpg"}
],

MRF:[
{name:"MRF Pro Kit",price:6000,img:"MRFkit.webp"},
{name:"MRF Runner-Machine",price:5500,img:"MRFkit1.webp"}
],

DSC:[
{name:"DSC Training Kit",price:6700,img:"DSCkit.jpg"},
{name:"DSC MS Dhoni Kit",price:10200,img:"DSCkit1.jpg"},
{name:"DSC Panther",price:4200,img:"DSCkit2.webp"}
]

};

function showKit(company){
showProducts(company + " Cricket Kits",
kits[company]);
}

/*Football*/
function showFootball(){
    openSection("footballSection", "footballItems", "footballSection");
}

function openFootballBall(){
    openSection("footballSection", "footballItems", "footballCompanySection");
}

let footballBrands = {

NIKE:[
{name:"Nike Football Pro",price:1200,img:"nikeball.webp"},
{name:"Nike Strike",price:1500,img:"nikeball1.webp"},
{name:"Nike Tranining Ball",price:900,img:"nikeball2.jpg"},
{name:"Nike Socer",price:1700,img:"nikeball3.jpg"}
],

ADIDAS:[
{name:"Adidas UCL Ball",price:1800,img:"adidasball.jpg"},
{name:"Adidas Training Ball",price:1400,img:"adidasball1.avif"}
],

PUMA:[
{name:"Puma Final Ball",price:1300,img:"pumaball.jpg"},
{name:"Puma Primiume Ball",price:1700,img:"pumaball1.jpg"}
],

NIVIA:[
{name:"Nivia Storm",price:900,img:"niviaball.webp"},
{name:"Nivia Vega",price:1050,img:"niviaball1.jpg"},
{name:"Nivia Stricky",price:1100,img:"niviaball2.jpg"}
],


};

function showFootballProducts(company){
    showCategoryProducts("footballSection","footballItems","footballCompanySection",company + " Footballs",
        footballBrands[company]
    );
}

function openFootballShoes(){
    openSection("footballSection", "footballItems", "footballShoesSection");
}


let footballShoes = {

NIVIA:[
{name:"Nivia Mercurial",price:4500,img:"niviashoes.jpg"},
{name:"Nivia Phantom",price:5200,img:"niviashoes1.webp"},
{name:"Nivia Carbonite",price:5500,img:"niviashoes2.jpg"},
{name:"Nivia Classic 2.0",price:4000,img:"niviashoes3.jpg"},
{name:"Nivia Strom",price:5200,img:"niviashoes4.jpg"}
],

ADIDAS:[
{name:"Adidas Predator",price:5000,img:"adidasshoes.webp"},
{name:"Adidas X Speed",price:4800,img:"adidasshoes1.jpg"}
],

PUMA:[
{name:"Puma Future",price:4200,img:"pumashoes.avif"},
{name:"Puma Future",price:3800,img:"pumashoes1.jpg"}
],

NIKE:[
{name:"Nike Carbonite",price:5500,img:"nikeshoes1.jpg"},
{name:"Nike Runner X",price:4500,img:"nikeshoes.png"}
]

};

function showFootballShoes(company){
    showCategoryProducts("footballSection","footballItems", "footballShoesSection", company + " Shoes",
    footballShoes[company]
    );
}

function openJersey(){
    openSection("footballSection", "footballItems", "jerseySection");
}

let jerseys = {

BARCELONA:[
{name:"Barcelona Home Jursey",price:2500,img:"barcelonajursey.jpg"},
{name:"Barcelona Away Jursey",price:2300,img:"barcelonajursea.jpg"}
],

REALMADRID:[
{name:"Real Madrid Home Jursey",price:2600,img:"realmadridjursey.webp"},
{name:"Real Madrid Away Jursey",price:2400,img:"realmadridjurseya.avif"}
],

MANCITY:[ 
{name:"Man City Home Jursey",price:2200,img:"mancityjursey.jpg"},
{name:"Man City Away Jursey",price:2000,img:"mancityjursey1.avif"}
],

PSG:[
{name:"PSG Home Jursey",price:2700,img:"psgjursey.jpg"},
{name:"PSG Away Jursey",price:2500,img:"psgjurseya.jpeg"}
]

};

function showFJerseys(team){
    showCategoryProducts( "footballSection","footballItems","jerseySection",team + " Jerseys",
        jerseys[team]
    );
}

function openFootballGloves(){
    openSection("footballSection", "footballItems", "footballGlovesSection");
}

let footballGloves = {

NIKE:[
{name:"Nike GK Match",price:2200,img:"nikekeepergloves.webp"},
{name:"Nike Vapor Grip",price:3000,img:"nikekeepergloves1.webp"},
{name:"Nike Classy Grip",price:2500,img:"nikekeepergloves2.webp"}
],

ADIDAS:[
{name:"Adidas Predator GK",price:2800,img:"adidasgloves.jpg"},
{name:"Adidas Classic Pro",price:2600,img:"adidasgloves1.jpg"}
],

PUMA:[
{name:"Puma Future Grip",price:2500,img:"pumagloves.jpg"},
{name:"Puma Hybrid Grip",price:3000,img:"pumagloves1.jpg"}
],

NIVIA:[
{name:"Nivia Storm GK",price:1200,img:"niviagloves.jpeg"},
{name:"Nivia Primiume Grip",price:1300,img:"niviagloves1.jpg"},
{name:"Nivia Blaze Grip",price:1500,img:"niviagloves2.webp"}
]

};

function showFootballGloves(company){
    showCategoryProducts("footballSection","footballItems","footballGlovesSection",company + " Goalkeeper Gloves",
        footballGloves[company]
    );
}

/*Badminton*/
function showBadminton(){
    openSection("badmintonSection", "badmintonItems", "badmintonSection");
}

function openRacket(){
    openSection("badmintonSection", "badmintonItems", "racketSection");
}

let rackets = {

"YONEX":[
{name:"Yonex Astrox",price:3500,img:"yonexracket.jpg"},
{name:"Yonex Nanoray",price:4000,img:"yonexracket1.png"},
{name:"Yonex Muscale Power",price:5200,img:"yonexracket2.jpg"}
],

"LI-NING":[
{name:"Li-Ning Turbo",price:3000,img:"liningracket.jpg"},
{name:"Li-Ning Classy",price:3700,img:"liningracket1.jpg"}
],

"VICTOR":[
{name:"Victor Drive",price:2800,img:"victorracket.jpg"},
{name:"Victor Hitter",price:2100,img:"victorracket1.webp"}
],

"COSCO":[
{name:"Cosco Power",price:1500,img:"coscoracket.jpg"},
{name:"Cosco C-85",price:1700,img:"coscoracket1.jpg"},
{name:"Cosco Swipp",price:2200,img:"coscoracket2.jpg"}
]

};

function showRackets(company){
    showCategoryProducts("badmintonSection","badmintonItems","racketSection",company + " Rackets",
        rackets[company]
    );
}

function openShuttle(){
    openSection("badmintonSection", "badmintonItems", "shuttleSection");
}

let shuttles = {

"YONEX":[
{name:"Yonex Mavis 350",price:500,img:"yonexs.jpg"},
{name:"Yonex Primiume 2.0",price:1800,img:"yonexs1.jpg"},
{name:"Yonex Aerosensa 10",price:999,img:"yonexs2.jpg"}
],

"LI-NING":[
{name:"Li-Ning A+ Shuttle",price:450,img:"linings.jpg"},
{name:"Li-Ning Platiniume 10",price:1050,img:"linings1.webp"}
],

"COSCO":[
{name:"Cosco Nylon Shuttle",price:300,img:"coscos.webp"},
{name:"Cosco Nylon 2.0",price:1500,img:"coscos1.jpg"},
{name:"Cosco Platiniume Pro",price:1300,img:"coscos2.jpg"}
]

};

function showShuttles(company){
    showCategoryProducts("badmintonSection","badmintonItems","shuttleSection",company + " Shuttle",
        shuttles[company]
    );
}

/*Basketball*/
function showBasketball(){
    openSection("basketballSection", "basketballItems", "basketballSection");
}

function openBasketballBall(){
    openSection("basketballSection", "basketballItems", "basketballBallSection");
}

let basketballs = {

"SPALDING":[
{name:"Spalding NBA Ball",price:2500,img:"spladingball.jpg"},
{name:"Spalding Black Ball",price:2000,img:"spladingbal1.webp"},
{name:"Spalding NBA 2.0",price:2700,img:"spladingball2.jpg"}
],

"NIKE":[
{name:"Nike Elite Ball",price:2200,img:"nikebasket.jpg"},
{name:"Nike Elite Pro",price:1900,img:"nikebasket1.avif"}
],

"WILSON":[
{name:"Wilson Evolution",price:2700,img:"wilsonbasket.jpg"},
{name:"Wilson Gold",price:2100,img:"wilsonbasket1.jpg"},
{name:"Wilson NBA",price:2500,img:"wilsonbasket2.jpg"}
]

};

function showBasketballs(company){
    showCategoryProducts("basketballSection","basketballItems","basketballBallSection",company + " Basketballs",
        basketballs[company]
    );
}

function openBasketllShoes(){
    openSection("basketballSection", "basketballItems", "basketballShoesSection");
}

let basketballShoes = {

"NIKE":[
{name:"Nike Air Zoom",price:4500,img:"nikebasketshoes.avif"},
{name:"Nike Lebron",price:7000,img:"nikebasketshoes1.webp"},
{name:"Nike Classy",price:7700,img:"nikebasketshoes2.jpg"}
],

"ADIDAS":[
{name:"Adidas Harden",price:5000,img:"adidasbasketshoes.jpg"},
{name:"Adidas Dame",price:5500,img:"adidasbasketshoes1.avif"}
],

"PUMA":[
{name:"Puma Court Rider",price:4000,img:"pumabasketshoes.jpg"},
{name:"Puma Fusion",price:4200,img:"pumabasketshoes1.avif"}
]

};

function showBasketballShoes(company){
    showCategoryProducts("basketballSection","basketballItems","basketballShoesSection",company + " Basketball Shoes",
        basketballShoes[company]
    );
}

function openBasketballJursey(){
    openSection("basketballSection", "basketballItems", "basketballJerseySection");
}

let basketballJersey = {

"LAKERS":[
{name:"Lakers Home Jersey",price:2500,img:"lakersjurseyh.webp"},
{name:"Lakers Away Jersey",price:2400,img:"lakersjurseya.webp"}
],

"BULLS":[
{name:"Bulls Home Jersey",price:2300,img:"bullsjurseyh.webp"},
{name:"Bulls Away Jersey",price:2200,img:"bullsjurseya.jpg"}
],

"WARRIORS":[
{name:"Warriors Home Jersey",price:2600,img:"warriorjurseyh.webp"},
{name:"Warriors Away Jersey",price:2500,img:"warriorjurseya.webp"}
]

};

function showBasketballJersey(team){
    showCategoryProducts("basketballSection","basketballItems","basketballJerseySection",team + " Jerseys",
        basketballJersey[team]
    );
}

/*Tennis*/

function showTennis(){
    openSection("tennisSection", "tennisItems", "tennisSection");
}

function openTennisRacket(){
    openSection("tennisSection", "tennisItems", "tennisRacketSection");
}

let tennisRackets = {

"WILSON":[
{name:"Wilson Pro Staff",price:8000,img:"wilsontennisracket.jpg"},
{name:"Wilson Blade",price:7500,img:"wilsontennisracket1.jpg"},
{name:"Wilson Stromy",price:7500,img:"wilsontennisracket2.webp"}
],

"HEAD":[
{name:"Head Speed",price:7000,img:"headtennisracket.jpg"},
{name:"Head Radical",price:7200,img:"headtennisracket1.avif"}
],

"YONEX":[
{name:"Yonex Ezone",price:7800,img:"yonextennisracket.jpg"},
{name:"Yonex Freestyle",price:8200,img:"yonextennisracket1.webp"}
]

};

function showTennisRackets(company){
    showCategoryProducts("tennisSection","tennisItems","tennisRacketSection",company + " Tennis Rackets",
        tennisRackets[company]
    );
}

function openTennisBall(){
    openSection("tennisSection", "tennisItems", "tennisBallSection");
}

let tennisBalls = {

"WILSON":[
{name:"Wilson US Open Balls",price:800,img:"wilsontennisball1.jpg"},
{name:"Wilson Practice Ball",price:750,img:"wilsontennisball.jpg"},
{name:"Wilson Championship",price:850,img:"wilsontennisball2.jpg"}
],

"YONEX":[
{name:"Yonex Tour Balls",price:650,img:"yonextennisball.jpg"},
{name:"Yonex Practice",price:550,img:"yonextennisball1.jpg"}
]

};

function showTennisBalls(company){
    showCategoryProducts("tennisSection","tennisItems","tennisBallSection",company + " Tennis Balls",
        tennisBalls[company]
    );
}