import { productDivs } from "../main";
import { canvas } from "../main";

const tot = document.getElementById("tot");
export const urunBas = (item)=> {
    productDivs.innerHTML =""
    item.forEach(element => {
        const{title, description, price, image, id} = element
        
        productDivs.innerHTML += `
        <div class="col">
          <div class="card">
            <img
              src="${image}"
              class="p-2"
              height="250px"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title line-clamp-1">${title}</h5>
              <p class="card-text line-clamp-2">${description}</p>
            </div>
            <div
              class="card-footer w-100 fw-bold d-flex justify-content-between gap-3"
            >
              <span>Price:</span><span>${price} $</span>
            </div>
            <div class="card-footer w-100 d-flex justify-content-center gap-3">
              <button id="${id}" class="btn btn-danger">Sepete Ekle</button>
              <button id="${id}"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                See Details
              </button>
            </div>
          </div>
        </div>
        `

        
    });




}

export const addBasket = (item) =>{

canvas.innerHTML=""


item.forEach(element => {
  
  const{title, price, image, id, quantity} = element
  let total = (price*quantity).toFixed(2);
canvas.innerHTML += `
  <div class="card mb-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4 my-auto">
              <img
                src="${image}"
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <div class="d-flex align-items-center gap-2" role="button">
                  <i id="${id}"
                    class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2"
                  ></i 
                  ><span class="fw-bold">${quantity}</span
                  ><i id="${id}"
                    class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2"
                  ></i>
                </div>
                <p class="card-text">${price}$ x ${quantity} : <span id="total">${total}</span>$</p>
                <button id="${id}" class="btn btn-danger">Remove</button>
              </div>
            </div>
          </div>
        </div>
`
});
sum()
}

const sum = ()=>{

  let sumTot = document.querySelectorAll("#total")
  let summ = 0
  if(sumTot.length>0){
  sumTot.forEach((item)=>{
    summ+=Number(item.textContent)
    tot.textContent=`${summ.toFixed(2)} $`
  })
  } else{
    tot.textContent="00.0 $"
  }
}
