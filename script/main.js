import Calculator from "./modules/Calculator.js";

// Elements
const display = document.querySelector("#display");
const history = document.querySelector("#history");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".opt");
const actions = document.querySelectorAll(".act");

const calculator = new Calculator(display, history);

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    calculator.setNumber(e.target.textContent);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    calculator.setOperation(e.target.dataset.opt);
  });
});

actions.forEach((action) => {
  action.addEventListener("click", (e) => {
    calculator.performAction(e.target.dataset.act);
  });
});

const keyboardInputHandler = (e) => {
  switch (e.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      calculator.setNumber(e.key);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      calculator.setOperation(e.key);
      break;
    case "=":
    case "Enter":
      calculator.setOperation("=");
      break;
    case ".":
      calculator.performAction(Calculator.actions.DECIMAL);
      break;
    case "Backspace":
      calculator.performAction(Calculator.actions.BACKSPACE);
      break;
  }
};

document.addEventListener("keydown", keyboardInputHandler);
