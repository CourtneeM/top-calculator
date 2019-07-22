const display = document.querySelector('#display');
const calcBtns = document.querySelector('#calc-btns');
const buttons = calcBtns.querySelectorAll('div>button');

let calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  },
  multiply: function(a, b) {
    return a * b;
  },
  divide: function(a, b) {
    return a / b;
  }
}

function operate(operator, a, b) {
  switch(operator) {
    case "+":
      return calculator.add(a, b);
    case "-":
      return calculator.subtract(a, b);
    case "X":
       return calculator.multiply(a, b);
    case "/":
       return calculator.divide(a, b);
  }
}

var num1 = "";
var num2 = "";
var operator = "";
var decimalBtn = document.querySelector("#decimal-btn");

function displayNumbers() {
  calcBtns.addEventListener('click', function(e) {
    //debugger;
    if(e.target.className.includes("btn-num")) {
      if(operator === "") {
        num1 += e.target.textContent;
        display.textContent = `${num1}`;
      } else {
        num2 += e.target.textContent;
        display.textContent = `${num1} ${operator} ${num2}`;
      }
      if(num1.includes(decimalBtn.textContent) && operator === "") {
        decimalBtn.disabled = true;
      } else if (num2.includes(decimalBtn.textContent)) {
        decimalBtn.disabled = true;
      }
    } 

    if(e.target.className.includes("btn-op")) {
      if(num1 != "" && num2 != "") {
        num1 = String(operate(operator, Number(num1), Number(num2)));
        if(num1 == "Infinity") {
          display.textContent = "Hey! You can't do that!"
          num1 = "";
          num2 = "";
          operator = "";
        } else {
          num2 = "";
          operator = e.target.textContent;
          num1 = Number(num1);
          display.textContent = `${num1.toFixed(2)} ${operator}`;
        }
      } else if(num1 != "") {
        operator = e.target.textContent;
        display.textContent = `${num1} ${operator}`;
      }
      decimalBtn.disabled = false;
    } 
    
    if (e.target.textContent === "=") {
      if(num1 === "" || operator === "" || num2 === "" ) {
        display.textContent = "error";
      } else {
        console.log(operate(operator, Number(num1), Number(num2)));
        num1 = operate(operator, Number(num1), Number(num2));
        if(num1 == "Infinity") {
          display.textContent = "Hey! You can't do that!"
        } else {
          display.textContent = num1.toFixed(2);
          num1 = "";
          num2 = "";
          operator = "";
        }
      }
      decimalBtn.disabled = false;
    } else if(e.target.textContent === "C") {
      display.textContent = "0"
      num1 = "";
      num2 = "";
      operator = "";
      decimalBtn.disabled = false;
    }
    console.log(num1, operator, num2);
  })
}

displayNumbers();

// console.log(operate(operator, num1, num2));

// fix decimal