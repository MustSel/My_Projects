import { btnDivs } from "../main";

export const getCategories = (item) => {
   const categories = item.reduce((acc, element) => {
    
    if(!acc.includes(element["category"])){
        acc.push(element["category"])
        
    }
    return acc
   },["ALL"])
   

categories.forEach(element => {
    
    btnDivs.innerHTML += `
    <div>
    <button class='btn btn-secondary'>${element}</button>
    </div>
    `
    
});



};

