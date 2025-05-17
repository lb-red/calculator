let isNewNumber = true;

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
    
    default:
      isNewNumber = true;
  }
}

function updateDisplay(newValue) {
  display.textContent = newValue;
}

function appendDisplay(newDigit) {
  if (display.textContent.length < 9) display.textContent += newDigit;
}

const display = document.getElementById("display");

const buttons = document.querySelectorAll(".calc-button");
buttons.forEach(button => {
  button.addEventListener("click", (event) => buttonPressed(event))
});