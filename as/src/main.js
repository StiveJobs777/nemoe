
import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";

let products = [];
let cart = {
 items: [],
 totalCount: 0,
 totalPrice: 0,
};
function getProducts() {
 const data = [
  {
   id: 1,
   name: "Футболка",
   price: 1000,
   discount: 20,
   discountPrice: 800,
   rating: 4.5,
   img: "./product1.jpg",
   info: {
    madeIn: "China",
    madeFrom: "Хлопок",
   },
   tags: ["футболка"],
  },
  {
   id: 2,
   name: "Футболка 2",
   price: 2000,
   discount: 20,
   discountPrice: 1600,
   rating: 4.5,
   img: "./product1.jpg",
   info: {
    madeIn: "China",
    madeFrom: "Хлопок",
   },
   tags: ["футболка"],
  },
  {
   id: 3,
   name: "Футболка 3",
   price: 1000,
   discount: 0,
   discountPrice: 1000,
   rating: 3.5,
   img: "./product1.jpg",
   info: {
    madeIn: "China",
    madeFrom: "Хлопок",
   },
   tags: ["футболка"],
  },
 ];
 return data;
}

const productsField = document.querySelector(".products");
const cartBtn = document.querySelector(".cartBtn");
const cartBox = document.querySelector(".cartBox");
const cartList = document.querySelector(".cartList");
const totalCount = document.querySelector(".totalCount");
const totalPrice = document.querySelector(".totalPrice");

let showCart = false;

function toggleCart(e) {
 e.preventDefault();
 showCart = !showCart;
 if (showCart) {
  cartBox.classList.remove("hide");
 } else {
  cartBox.classList.add("hide");
 }

 // cartBox.classList.toggle("hide");
 // showCart = !showCart
}

function renderProducts() {
 productsField.innerHTML = "";
 products.forEach((p) => {
  productsField.innerHTML += `
  <li class="product-item">
    <h3>${p.name}</h3>
    <img src="${p.img}" alt="Product 1" />
    <p>${p.rating}* ${p.info.madeIn}</p>
    <button data-id = "${p.id}" class = "card-btn ${p.discount != 0 ? "discount" : ""}">${p.discountPrice}</button>
   </li>
  `;
 });
}

function addEventsOnBtns() {
 const btns = document.querySelectorAll(".card-btn");
 btns.forEach((b) => {
  b.addEventListener("click", () => {
   const productId = b.getAttribute("data-id");
   // const productId = b.dataset.id
   for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id == productId) {
     cart.items[i].count++;
     renderCart();

     return;
    }
   }
   cart.items.push({
    id: productId,
    count: 1,
   });
   renderCart();
  });
 });
}

function renderCart() {
  cartList.innerHTML = "";
  cart.totalCount = 0;
  cart.totalPrice = 0;
 
  cart.items.forEach((i, index) => {
   const product = products.find((p) => p.id == i.id);
   cart.totalCount += i.count;
   cart.totalPrice += i.count * product.discountPrice;
 
   cartList.innerHTML += `
    <div class="cartItem" data-id="${i.id}">
     <p>${product.name}</p>
     <p>$${product.discountPrice}</p>
     <p>${i.count}</p>
     <button class="removeBtn">Remove</button>
    </div>
   `;
  });
 
  totalCount.innerHTML = `Total count: ${cart.totalCount}`;
  totalPrice.innerHTML = `Total price: ${cart.totalPrice}$`;
 
  // Добавляем обработчики на "Remove"
  const removeBtns = document.querySelectorAll(".removeBtn");
  removeBtns.forEach((btn) => {
   btn.addEventListener("click", (e) => {
    const parent = e.target.closest(".cartItem");
    const productId = parent.getAttribute("data-id");
 
    const itemIndex = cart.items.findIndex((i) => i.id == productId);
    if (itemIndex !== -1) {
     cart.items[itemIndex].count--;
     if (cart.items[itemIndex].count === 0) {
      cart.items.splice(itemIndex, 1);
     }
     renderCart();
    }
   });
  });
}

const clearBtn = document.querySelector(".clearBtn");

clearBtn.addEventListener("click", () => {
 cart.items = [];
 cart.totalCount = 0;
 cart.totalPrice = 0;
 renderCart();
});

products = getProducts();
cartBtn.addEventListener("click", toggleCart);
renderProducts();
addEventsOnBtns();