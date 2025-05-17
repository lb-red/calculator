function buttonPressed(event) {
  btnValue = event.target.value;
  console.log(typeof(btnValue));
  try {
    
  } catch (errorType) {
    
  }
}

function updateDisplay(newValue) {
  display.textContent = newValue;
}

function appendDisplay(newDigit) {
  display.textContent += newDigit;
}

const display = document.getElementById("display");

const buttons = document.querySelectorAll(".calc-button");
buttons.forEach(button => {
  button.addEventListener("click", (event) => buttonPressed(event))
});