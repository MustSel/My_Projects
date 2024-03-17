import { getCategories } from "./src/getCategories";
import { addBasket, urunBas } from "./src/urunleriBas";



export const btnDivs = document.getElementById("btns");
export const productDivs = document.getElementById("products");
export const canvas = document.querySelector(".offcanvas-body");
const searchInput = document.getElementById("searchInput");
const categoryTitle = document.getElementById("category");
const modalBody = document.querySelector(".modal-body");

let data = [];
let filtered = [];
let basket = [];
const urunGetir = async () => {
  try {
    const res = await fetch(
      "https://anthonyfs.pythonanywhere.com/api/products/"
    );
    data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    urunBas(data);
    getCategories(data);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", urunGetir);

btnDivs.addEventListener("click", (e) => {
  searchInput.value = "";
  searchInput.focus();
  if (e.target.classList.contains("btn")) {
    categoryTitle.textContent = e.target.textContent;

    filtered = data.filter((item) => {
      if (item.category == e.target.textContent) {
        return item;
      }
    });
    urunBas(filtered);

    if (e.target.textContent === "ALL") {
      urunBas(data);
    }
  }
});

searchInput.addEventListener("input", (e) => {
  if (categoryTitle.textContent === "ALL") {
    productDivs.innerHTML = "";
    e.target.value
      ? urunBas(
          data.filter((item) =>
            item.title.toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      : urunBas(data);
  } else {
    productDivs.innerHTML = "";
    e.target.value
      ? urunBas(
          filtered.filter((item) =>
            item.title.toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      : urunBas(filtered);
  }
});

productDivs.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-danger")) {
    let pid = e.target.id;

    const prod = data.filter((item) => item.id == pid);

    if (!basket.includes(prod[0])) {
      basket.push(prod[0]);
    } else {
      basket.forEach((item) => {
        if (item.id == pid) {
          
          ++item.quantity;
          
        }
      });
    }
    console.log(basket);
    addBasket(basket);
  }
  //! lOCAL sTORAGE YAPILACAK
  //! sepete ekleyince alert bas, remove yaparken de uyarsın 
  //! sepetin üstündeki sayıyı güncelle
  //! clarus logosunu değiştir.
//! MODAL'E DETAILS BASILACAK!!!!!!!!!!!!
  if (e.target.classList.contains("btn-primary")) {
    console.log(e.target);
  }
});


canvas.addEventListener("click", (e)=>{
  let pid = e.target.id;
  const prod = basket.filter((item) => item.id == pid)[0];
  if (e.target.classList.contains("btn-danger")){
    
    basket=basket.filter((item)=>item !== prod)
    prod.quantity=1
  }


if (e.target.classList.contains("fa-minus")){
  if(prod.quantity>1){
    --prod.quantity
  }
}

if(e.target.classList.contains("fa-plus")){
  ++prod.quantity
  
}

addBasket(basket)
})

let x = 5