class Calculator {
  static actions = Object.freeze({
    CLEAR: "CLEAR",
    ALL_CLEAR: "ALL_CLEAR",
    TOGGLE_SIGN: "TOGGLE_SIGN",
    DECIMAL: "DECIMAL",
    BACKSPACE: "BACKSPACE",
  });

  constructor(display, history) {
    this.display = display;
    this.history = history;

    this.total = 0;
    this.current = 0;
    this.equation = "";
    this.operation = null;

    this.updateDisplays();
  }

  updateDisplays(total) {
    this.history.textContent = this.equation;

    if (total) {
      this.display.textContent = this.total;
    } else {
      this.display.textContent = this.current;
    }
  }

  calcResult() {
    switch (this.operation) {
      case "+":
        this.total = Number(this.total) + Number(this.current);
        break;
      case "-":
        this.total = this.total - this.current;
        break;
      case "*":
        this.total = this.total * this.current;
        break;
      case "/":
        this.total = this.total / this.current;
        break;
    }
  }

  setNumber(num) {
    if (String(this.current).indexOf(".") !== -1 && num === "0") {
      this.current = this.current + num;
    } else {
      this.current = Number(this.current + num);
    }

    this.updateDisplays();
  }

  setOperation(operation) {
    if (this.current == 0 && this.equation == "") {
      return;
    }

    if (this.operation == null) {
      if (operation == "=") {
        return;
      }

      this.operation = operation;
      this.equation += this.current + this.operation;
      this.total = Number(this.current);
      this.current = 0;
      this.updateDisplays();
      return;
    }

    if (operation !== "=") {
      if (this.current === 0 && /[+-=*/]$/.test(this.equation)) {
        this.operation = operation;
        this.equation = this.equation.substring(0, this.equation.length - 1) + this.operation;
        this.updateDisplays(true);
        return;
      }

      this.calcResult();
      this.operation = operation;
      this.equation += this.current + this.operation;
      this.current = 0;
      this.updateDisplays(true);
      return;
    }

    // Equals
    this.calcResult();
    this.equation = "";
    this.operation = null;
    this.current = 0;
    this.updateDisplays(true);
    this.total = 0;
  }

  performAction(action) {
    switch (action) {
      case Calculator.actions.CLEAR:
        this.current = 0;
        break;
      case Calculator.actions.ALL_CLEAR:
        this.current = 0;
        this.total = 0;
        this.equation = "";
        this.operation = null;
        break;
      case Calculator.actions.TOGGLE_SIGN:
        this.current = -this.current;
        break;
      case Calculator.actions.DECIMAL:
        if (String(this.current).indexOf(".") !== -1) {
          return;
        }
        this.current = this.current + ".";
        break;
      case Calculator.actions.BACKSPACE: {
        let current = String(this.current);
        current = current.substring(0, current.length - 1);
        this.current = current || 0;
        break;
      }
    }

    this.updateDisplays();
  }
}

export default Calculator;
