let isNewNumber = true;
let isNewOperation = true;
let operation = "";
let firstInputNum, lastInputNum;

function updateDisplay(newValue) {
  let rounded;
  let maxDisplayDigit = 9;
  console.log(newValue);

  if (newValue.toString().length > maxDisplayDigit) {
    rounded = newValue.toPrecision(maxDisplayDigit);
    let roundedDigitLimit;

    // fits the answer with exponent to display
    if (rounded.includes("e")) {
      // 2 for "e" + "."
      roundedDigitLimit = maxDisplayDigit - (rounded.split("e")[1].length + 2); // 2 for "e" & "."
      rounded = newValue.toPrecision(roundedDigitLimit);
    
    // fits the answer without exponent
    } else if (rounded.includes(".")) {
      roundedDigitLimit = maxDisplayDigit - (rounded.split(".")[0].length + 1); // 1 for "." only
      rounded = newValue.toFixed(roundedDigitLimit);
    }
  }
  else {
    rounded = newValue;
  }
  display.textContent = rounded;
}

function appendDisplay(newDigit) {
  if (display.textContent.length < 9) display.textContent += newDigit;
}

function buttonPressed(value) {
  let btnValue = value;
  
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

function keyDowned(event) {
  if (event.key == "Enter") buttonPressed("=");
  else if (event.key == "Backspace") buttonPressed("clear");
  else if (event.key == "Backspace" && event.shiftKey) buttonPressed("all-clear");
  else buttonPressed(event.key);
}

document.addEventListener("keydown", (event) => keyDowned(event));

const display = document.getElementById("display");

const buttons = document.querySelectorAll(".calc-button");
buttons.forEach(button => {
  button.addEventListener("click", (event) => buttonPressed(event.target.value))
});