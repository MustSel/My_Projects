import { getCategories } from "./src/getCategories";
import { addBasket, urunBas } from "./src/urunleriBas";
import Swal from "sweetalert2";

export const btnDivs = document.getElementById("btns");
export const productDivs = document.getElementById("products");
export const canvas = document.querySelector(".offcanvas-body");
const searchInput = document.getElementById("searchInput");
const categoryTitle = document.getElementById("category");
const modalBody = document.querySelector(".modal-body");
const modalTitle = document.querySelector(".modal-title");
const body = document.querySelector("body");
const basketCount = document.querySelector("#sepet");
const clearBasket = document.getElementById("clear-basket");

let data = [];
let filtered = [];
let basket = [];
const urunGetir = async () => {
  try {
    const res = await fetch(
      "https://anthonyfs.pythonanywhere.com/api/products/"
    );
   
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    data = await res.json();
    urunBas(data);
    getCategories(data);
    basket = JSON.parse(localStorage.getItem("basket")) || [];
    addBasket(basket);
    counter();
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", urunGetir);

btnDivs.addEventListener("click", (e) => {
  
  if (e.target.classList.contains("btn")) {
    searchInput.value = "";
  searchInput.focus();
    const category = e.target.textContent;
  categoryTitle.textContent = category;
  filtered = (category === "ALL") ? data : data.filter(item => item.category === category);
  urunBas(filtered);
  }
});

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = filtered.length ? filtered : data;
  const results = filteredData.filter(item => item.title.toLowerCase().includes(searchTerm));
  urunBas(results);
});

body.addEventListener("click", (e) => {
  let prodId = e.target.id;
  const product = data.filter((item) => item.id == prodId)[0];
  if (e.target.classList.contains("add-basket")) {
    addedBasketPopup();
    if (!basket.includes(product)) {
      basket.push(product);
    } else {
      basket.forEach((item) => {
        if (item.id == prodId) {
          ++item.quantity;
        }
      });
    }
    addBasket(basket);
    counter();
    localStorage.setItem("basket", JSON.stringify(basket));
  }
if(prodId=="clear-basket"){
  basket=[]
  localStorage.removeItem("basket")
  addBasket(basket);
  counter();
  
}
  
  //! clarus logosunu değiştir.

  if (e.target.classList.contains("see-details")) {
    const { title, description, price, image, id } = product;
    modalTitle.innerHTML = `${title}`;
    modalBody.innerHTML = `<div class="text-center">
<img src="${image}" class="p-2" height="250px" alt="...">
<h5 class="card-title">${title}</h5>
<p class="card-text">${description}</p>
<p class="card-text">Fiyat: ${price} $</p>
<button id="${id}" class="btn add-basket btn-danger">Sepete Ekle</button>
</div>
`;
  }
});

canvas.addEventListener("click", (e) => {
  let prodId = e.target.id;
  const product = basket.filter((item) => item.id == prodId)[0];
  if (e.target.classList.contains("remove")) {
    Swal.fire({
      icon: "success",
      title: "Sepetten Kaldırıldı",
    });
    basket = basket.filter((item) => item !== product);
    product.quantity = 1;
  }

  if (e.target.classList.contains("fa-minus")) {
    if (product.quantity > 1) {
      --product.quantity;
    }
  }

  if (e.target.classList.contains("fa-plus")) {
    ++product.quantity;
  }

  addBasket(basket);
  counter();
  localStorage.setItem("basket", JSON.stringify(basket));
});

const counter = () => {
  let n = basket.reduce((acc, qty) => acc + qty.quantity, 0);
  basketCount.textContent = n;
};

const addedBasketPopup = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: "Sepete Eklendi",
  });
};
