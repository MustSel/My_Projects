import { getCategories } from "./src/getCategories";
import { addBasket, urunBas } from "./src/urunleriBas";
import Swal from "sweetalert2";

// DOM Elements
const btnDivs = document.getElementById("btns");
const productDivs = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const categoryTitle = document.getElementById("category");
const modalBody = document.querySelector(".modal-body");
const modalTitle = document.querySelector(".modal-title");
const body = document.querySelector("body");
const basketCount = document.querySelector("#sepet");
const clearBasket = document.getElementById("clear-basket");

// Data
let data = [];
let filtered = [];
let basket = [];

// Fetch Products
const fetchProducts = async () => {
  try {
    const res = await fetch("https://anthonyfs.pythonanywhere.com/api/products/");
    if (!res.ok) throw new Error(`${res.status}`);
    data = await res.json();
    urunBas(data);
    getCategories(data);
    basket = JSON.parse(localStorage.getItem("basket")) || [];
    addBasket(basket);
    updateBasketCount();
  } catch (error) {
    console.error(error);
  }
};

// Initial load
document.addEventListener("DOMContentLoaded", fetchProducts);

// Event Listeners
btnDivs.addEventListener("click", handleCategoryFilter);
searchInput.addEventListener("input", handleSearch);
body.addEventListener("click", handleProductActions);
canvas.addEventListener("click", handleBasketActions);
clearBasket.addEventListener("click", handleClearBasket);

// Functions
function handleCategoryFilter(e) {
  searchInput.value = "";
  searchInput.focus();
  const category = e.target.textContent;
  categoryTitle.textContent = category;
  filtered = (category === "ALL") ? data : data.filter(item => item.category === category);
  urunBas(filtered);
}

function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = filtered.length ? filtered : data;
  const results = filteredData.filter(item => item.title.toLowerCase().includes(searchTerm));
  urunBas(results);
}

function handleProductActions(e) {
  const productId = e.target.id;
  const product = data.find(item => item.id == productId);
  if (e.target.classList.contains("add-basket")) {
    addToBasket(product);
  }
  if (e.target.classList.contains("see-details")) {
    displayProductDetails(product);
  }
}

function handleBasketActions(e) {
  const productId = e.target.id;
  const product = basket.find(item => item.id == productId);
  if (e.target.classList.contains("remove")) {
    removeFromBasket(product);
  }
  if (e.target.classList.contains("fa-minus")) {
    decreaseQuantity(product);
  }
  if (e.target.classList.contains("fa-plus")) {
    increaseQuantity(product);
  }
}

function handleClearBasket() {
  basket = [];
  localStorage.removeItem("basket");
  addBasket(basket);
  updateBasketCount();
}

function addToBasket(product) {
  if (!basket.includes(product)) {
    basket.push(product);
  } else {
    basket.forEach(item => {
      if (item.id == product.id) {
        ++item.quantity;
      }
    });
  }
  addBasket(basket);
  updateBasketCount();
  localStorage.setItem("basket", JSON.stringify(basket));
  addedBasketPopup();
}

function removeFromBasket(product) {
  Swal.fire({
    icon: "success",
    title: "Removed from Basket",
  });
  basket = basket.filter(item => item !== product);
  product.quantity = 1;
  addBasket(basket);
  updateBasketCount();
  localStorage.setItem("basket", JSON.stringify(basket));
}

function decreaseQuantity(product) {
  if (product.quantity > 1) {
    --product.quantity;
    addBasket(basket);
    updateBasketCount();
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

function increaseQuantity(product) {
  ++product.quantity;
  addBasket(basket);
  updateBasketCount();
  localStorage.setItem("basket", JSON.stringify(basket));
}

function displayProductDetails(product) {
  const { title, description, price, image, id } = product;
  modalTitle.innerHTML = `${title}`;
  modalBody.innerHTML = `<div class="text-center">
    <img src="${image}" class="p-2" height="250px" alt="...">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
    <p class="card-text">Price: ${price} $</p>
    <button id="${id}" class="btn add-basket btn-danger">Add to Basket</button>
  </div>`;
}

function updateBasketCount() {
  const count = basket.reduce((acc, item) => acc + item.quantity, 0);
  basketCount.textContent = count;
}

function addedBasketPopup() {
  Swal.fire({
    icon: "success",
    title: "Added to Basket",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
}
