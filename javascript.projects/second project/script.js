const form = document.querySelector("form")
const magnifier = document.querySelector(".magnifier")











const searchmeal = async(e) =>{
 e.preventDefault();

 
 const input = document.querySelector(".text");
 const title = document.querySelector(".title");
 const info = document.querySelector(".info");
 const ingredientss = document.querySelector(".ingreident");
 const img = document.querySelector(".image-container");



 const showinfo = (meal)  =>{
  const{strMeal, strMealThumb,strInstructions} = meal;
  title.textContent= strMeal
   let imgs = `url(${strMealThumb})`
  img.style.background = imgs
  info.textContent = strInstructions;

  const ingredients =[];

  for(let i = 1; i<= 30; i++){
    if(meal[`strIngredient${i}`]){
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }else{
      break;
    }
  }

const html = `
<span>${ingredients.map((ing) => `<li class ="ing">${ing}</li>`).join("")}</span>`

 ingredientss.innerHTML = html


 };
  const showalert = () =>{
  alert("meals are not found")
}
 // second function

 const fetchmeal = async(val) =>{
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);

   const {meals} = await res.json();
   return meals;
 };


 const vals = input.value.trim()
 if(vals){
  const meals = await fetchmeal(vals);

  if(!meals){
    showalert();
    return;
  }
  meals.forEach(showinfo);

 }else{
  alert("please try be hungry")
 }
 };






form.addEventListener("submit", searchmeal);
magnifier.addEventListener("click",searchmeal)