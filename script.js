const nextBtn = document.querySelector("#nextBtn");
const checkBtn = document.querySelector("#checkBtn");

const billAmount = document.querySelector("#payableAmount");
const cashAmount = document.querySelector("#paidAmount");

const paidAmountDiv = document.querySelector(".paid-amount");
const resultDiv = document.querySelector(".table");

const notes = [2000, 500, 100, 20, 10, 5, 1];

const resultTableElements = document.querySelectorAll(".table-data");

const errorDiv = document.querySelector(".error");

function showItem(item) {
  item.style.display = "block";
}

function hideItem(item) {
  item.style.display = "none";
}

billAmount.addEventListener("focus", () => {
  hideItem(errorDiv);
  hideItem(resultDiv);
  hideItem(paidAmountDiv);
});

nextBtn.addEventListener("click", () => {
  hideItem(errorDiv);
  hideItem(resultDiv);
  hideItem(paidAmountDiv);
  if (billAmount.value <= 0) {
    errorDiv.innerText = "Bill Amount can't be zero or less!! Please check";
    showItem(errorDiv);
  }
  showItem(paidAmountDiv);
});

checkBtn.addEventListener("click", () => {
  resetResultTable();
  hideItem(resultDiv);
  hideItem(errorDiv);
  let bill = billAmount.value;
  let cash = cashAmount.value;
  if (cash <= 0) {
    errorDiv.innerText = "Paid Amount can't be zero or less!! Please check";
    showItem(errorDiv);
  } else if (cash - bill < 0) {
    errorDiv.innerText = "Paid Amount can't be less than bill amount";
    showItem(errorDiv);
  } else if (cash === bill) {
    hideItem(errorDiv);
    resultDiv.innerText = "You have paid the exact Amount!! Thank you";
    resultDiv.style.color = "hsl(138, 100%, 30%)";
    resultDiv.style.backgroundColor = "hsl(138, 100%, 90%)";
    resultDiv.style.padding = "2rem";
    showItem(resultDiv);
  } else if (cash - bill > 1) {
    hideItem(errorDiv);
    calculateChange(bill, cash);
    showItem(resultDiv);
  }
});

function calculateChange(billAmount, cashGiven) {
  let returnAmount = cashGiven - billAmount;

  let remainingBillAmount = returnAmount;
  let a = [];
  for (let i = 0; i < notes.length; i++) {
    const remainder = Math.floor(remainingBillAmount / notes[i]);
    resultTableElements[i].innerText = `${remainder}`;
    a.push(remainder);
    remainingBillAmount = remainingBillAmount - remainder * notes[i];
  }
}

function resetResultTable() {
  for (let node of resultTableElements) {
    node.innerText = "";
  }
}
