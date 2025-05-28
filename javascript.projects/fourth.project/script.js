const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transcation = JSON.parse(localStorage.getItem("transcations")) || [];

transactionFormEl.addEventListener("submit", addtranscation)


function addtranscation(e){
 e.preventDefault();

 // get the form value
 const description = descriptionEl.value.trim()
 const amount = parseFloat(amountEl.value)

 transcation.push({
  id:Date.now(),
  description,
  amount
})

localStorage.setItem("transcations",JSON.stringify(transcation)); 

updatetranscationList();
updatesummary()

transactionFormEl.reset()
}

function updatetranscationList(){
  transactionListEl .innerHTML = ""
  const sortedtransaction = [...transcation].reverse()
  sortedtransaction.forEach((transcation) =>{
    const transactionEl = createtransaction((transcation))
    transactionListEl.appendChild(transactionEl)
  })
}



function createtransaction(transaction){
  const li = document.createElement("li")
  li.classList.add("transaction")
  li.classList.add(transaction.amount > 0 ? "income" : "expense")

  li.innerHTML = `
  <span>${transaction.description}</span>
  <span>${ formatcurrency(transaction.amount)}
  
  <button class ="delete-btn" onclick ="removetransaction(${transaction.id})">x</button>
  </span>
  `;
  return li
}

function updatesummary(){
  const balance = transcation.reduce((acc,transcation) =>  acc + transcation.amount,0)

  const income = transcation.filter(transcation=> transcation.amount >0 ).reduce((acc,transcation) =>  acc + transcation.amount,0)

    const expense = transcation.filter(transcation=> transcation.amount <0 ).reduce((acc,transcation) =>  acc + transcation.amount,0)

    balanceEl.textContent = formatcurrency(balance)
    incomeAmountEl.textContent = formatcurrency(income)
    expenseAmountEl.textContent = formatcurrency(expense )
}

function formatcurrency(number){
  return new Intl.NumberFormat("en-US",{
    style:"currency",
    currency: "INR",

  }).format(number)
}



function removetransaction(id){
  //filter out the one
  transcation = transcation.filter(transcation=> transcation.id !== id)
  localStorage.setItem("transcations",JSON.stringify(transcation));
  updatetranscationList();
  updatesummary()
}
// initial render
updatetranscationList();
updatesummary();




























