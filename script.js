const buttonClear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const calculation = document.querySelector(".calculation");
const answer = document.querySelector(".answer");
const buttonContainer = document.querySelector(".button-container");
const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");

const button1 = document.querySelector(".btn-1");
const button2 = document.querySelector(".btn-2");
const button3 = document.querySelector(".btn-3");
const button4 = document.querySelector(".btn-4");
const button5 = document.querySelector(".btn-5");
const button6 = document.querySelector(".btn-6");
const button7 = document.querySelector(".btn-7");
const button8 = document.querySelector(".btn-8");
const button9 = document.querySelector(".btn-9");
const buttonAns = document.querySelector(".btn-ans");
const button0 = document.querySelector(".btn-0");
const buttonEquals = document.querySelector(".btn-equals");

let displayValue = "";
let ans = "";
let current = "operator";
let num1 = "";
let num2 = "";
let op = "";

buttons.forEach(button => {
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "rgb(185, 180, 182)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "rgb(213, 197, 200)";
  });

  button.addEventListener("mousedown", () => {
    button.style.backgroundColor = "rgb(157, 163, 164)";
  });

  button.addEventListener("mouseup", () => {
    button.style.backgroundColor = "rgb(185, 180, 182)";
  });
});

buttonClear.addEventListener("click", () => {
  clear();
  displayValue = "";
  calculation.textContent = displayValue;
  answer.textContent = "";
});

del.addEventListener("click", () => {
  // Check if last character is a number or operator
  if (isNaN(parseInt(displayValue.at(-1)))) {
    displayValue = displayValue.slice(0, -3);
  } else {
    displayValue = displayValue.slice(0, -1);
  }

  calculation.textContent = displayValue;
  answer.textContent = "";
});

numbers.addEventListener("click", (event) => {
  if (event.target.textContent !== " =" && event.target.textContent !== "ans") {
    if (current === "evaluated") {
      clear();
    } else if (current === "ans") {
			return;
		}

    if (event.target.tagName === "BUTTON") {
      const buttonText = event.target.textContent;
      displayValue += buttonText;
      calculation.textContent = displayValue;

      if (current === "operator") {
        num2 = buttonText.trim();
      } else if (current === "number" && !op) {
        num1 += buttonText.trim();
      } else {
        num2 += buttonText.trim();
      }

      current = "number";
      answer.textContent = "";
    }
  }
});

operators.addEventListener("click", (event) => {
  if (current === "operator") {
    return;
  } else if (current === "evaluated" || current === "ans") {
    clear();
    num1 = ans;
  }

  if (current === "evaluated" &&
    event.target.tagName === "BUTTON") {
    displayValue = ans;
  }

  if (event.target.tagName === "BUTTON") {
    const buttonText = event.target.textContent;

    if (op && num2) {
			if (!isNaN(parseInt(operate(num1 + op + num2))))
      ans = operate(num1 + op + num2);
      num1 = ans;
      num2 = "";
      answerValue = ans;
      answer.textContent = answerValue;
    } else if (current === "number") {
      num1 = displayValue;
      num2 = "";
    }

    displayValue = `${num1}${buttonText}`;
    op = buttonText;
    calculation.textContent = displayValue;

    current = "operator";
  }
});

buttonAns.addEventListener("click", () => {
  if (current === "evaluated") {
    clear();
  }

  if (current === "number" || current === "ans" || ans === "") {
    return;
  }

  if (!op) {
    displayValue += ans;
    calculation.textContent = displayValue;
    num1 = ans;
  } else {
    displayValue += ans;
    calculation.textContent = displayValue;
    num2 = ans;
  }

  current = "ans";
  answer.textContent = "";
});

buttonEquals.addEventListener("click", (event) => {
  if (displayValue.at(0) === " " ||
    displayValue.includes("  ")) {
    answer.textContent = "Syntax Error";
  } else {
    let answerValue = operate(displayValue);
    answer.textContent = answerValue;
    ans = answerValue;
  }

  const buttonText = event.target.textContent;
  displayValue += buttonText;
  calculation.textContent = displayValue;

  current = "evaluated";
});

function operate(calc) {
  const tokens = calc.split(" ");
  let result = parseFloat(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = parseFloat(tokens[i + 1]);

    if (isNaN(nextNumber)) {
      return "Syntax Error";
    }

    switch (operator) {
      case "+":
        result += nextNumber;
        break;
      case "-":
        result -= nextNumber;
        break;
      case "x":
        result *= nextNumber;
        break;
      case "÷":
        if (nextNumber === 0) {
          return "Don't try to be clever";
        }
        result /= nextNumber;
        break;
    }
  }

  return result.toString();
}

function clear() {
  displayValue = "";
  num1 = "";
  num2 = "";
  op = "";
}