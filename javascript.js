let isNewNumber = true;
let isNewOperation = true;
let operation = "";
let firstInputNum, lastInputNum;

function updateDisplay(newValue) {
  display.textContent = newValue;
}

function appendDisplay(newDigit) {
  if (display.textContent.length < 9) display.textContent += newDigit;
}

function buttonPressed(event) {
  btnValue = event.target.value;
  console.log(btnValue);
  
  switch (btnValue) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (isNewNumber) updateDisplay(btnValue);
      else appendDisplay(btnValue);
      
      isNewNumber = false;
      break;

    case ".":
      if (!display.textContent.includes(".")) {
        appendDisplay(btnValue);
        isNewNumber = false;
      }
      break;

    case "=":
      if (operation) {
        let answer;
        let currentNum = parseFloat(display.textContent);

        if (isNewOperation) {
          answer = operate(firstInputNum, currentNum, operation);
          lastInputNum = currentNum;
        }
        else answer = operate(currentNum, lastInputNum, operation);

        isNewNumber = true;
        isNewOperation = false;

        updateDisplay(answer);
      }
      break;

    case "+":
    case "-":
    case "*":
    case "/":
    case "^":
      operation = btnValue;
      firstInputNum = parseFloat(display.textContent);
      isNewNumber = true;
      isNewOperation = true;
  }
}

function operate(a, b, oper) {
  if (oper == "+") return a + b;
  else if (oper == "-") return a - b;
  else if (oper == "*") return a * b;
  else if (oper == "/") return a / b;
  else if (oper == "^") return Math.pow(a, b);
}

const display = document.getElementById("display");

const buttons = document.querySelectorAll(".calc-button");
buttons.forEach(button => {
  button.addEventListener("click", (event) => buttonPressed(event))
});