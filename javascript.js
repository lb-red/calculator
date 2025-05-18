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
  let btnValue = event.target.value;
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
      if (isNewNumber && display.textContent != "0") updateDisplay("0.");
      else if (!display.textContent.includes(".")) appendDisplay(btnValue);

      isNewNumber = false;
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
        
        if (answer == "Invalid") operation = "";

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
      break;

    case "all-clear":
      firstInputNum = 0;
      lastInputNum = 0;
      operation = "";
      isNewNumber = true;
      isNewOperation = false;
    case "clear":
      isNewNumber = true;
      updateDisplay("0");
    
  }
}

function operate(a, b, oper) {
  if (oper == "+") return a + b;
  else if (oper == "-") return a - b;
  else if (oper == "*") return a * b;
  else if (oper == "/") {
    if (b != 0) return a / b;
    else return "Invalid";
  }
  else if (oper == "^") return Math.pow(a, b);
}

const display = document.getElementById("display");

const buttons = document.querySelectorAll(".calc-button");
buttons.forEach(button => {
  button.addEventListener("click", (event) => buttonPressed(event))
});