const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");


//  wrapped with json to get structured data insted of string
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
   // stops refreshing page
   e.preventDefault();

   // get form values
   const description = descriptionEl.value.trim()
   const amount = parseFloat(amountEl.value)

   transactions.push({
      id: Date.now(),
      description,
      amount
   })

   localStorage.setItem("transactions", JSON.stringify(transactions));

   updateTransactonsList()
   updateSummery()

   transactionFormEl.requestFullscreen()
}

function updateTransactonsList() {
   transactionFormEl.innerHTML = "";

   const sortedTransactions = [...transactions].reverse();



   sortedTransactions.forEach((transaction) => {
      const transactionEl = createTransactionElement(transaction)
      transactionListEl.apendChild(transactionEl)

   })
}

function createTransactionElement(transaction) {
   const li = document.createElement("li")
   li.classList.add("transaction")
   li.classList.add(transaction.amount > 0 ? "income" : "expense")

   li.innerHTML = `
   <span>${transaction.description}</span>
   <span>${transaction.amount}</span>
   <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
   `;

   return li
}

