import { btnDivs } from "../main";

export const getCategories = (item) => {
   const categories = item.reduce((acc, element) => {
    
    if(!acc.includes(element["category"])){
        acc.push(element["category"])
        
    }
    return acc
   },["ALL"])
   

let i=0
const btnColors = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark",
  ];
categories.forEach(element => {
    
    btnDivs.innerHTML += `
    <button class='btn btn-${btnColors[i]}'>${element}</button>
    `
    ++i
});



};