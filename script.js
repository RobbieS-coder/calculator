const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const calculation = document.querySelector(".calculation");
const buttonContainer = document.querySelector(".button-container");

const button1 = document.querySelector(".btn-1");
const button2 = document.querySelector(".btn-2");
const button3 = document.querySelector(".btn-3");
const button4 = document.querySelector(".btn-4");
const button5 = document.querySelector(".btn-5");
const button6 = document.querySelector(".btn-6");
const button7 = document.querySelector(".btn-7");
const button8 = document.querySelector(".btn-8");
const button9 = document.querySelector(".btn-9");
const buttonDecimal = document.querySelector(".btn-decimal");
const button0 = document.querySelector(".btn-0");
const buttonEquals = document.querySelector(".btn-equals");

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

clear.addEventListener("click", () => {
	displayValue = "";
	calculation.textContent = displayValue;
});

del.addEventListener("click", () => {
	// Check if last character is a number or operator
	if (displayValue.at(-1) === " ") {
		displayValue = displayValue.slice(0, -3);
	} else {
		displayValue = displayValue.slice(0, -1);
	}

	calculation.textContent = displayValue;
});

buttonContainer.addEventListener("click", (event) => {
	if (event.target.tagName === "BUTTON") {
			const buttonText = event.target.textContent;
			displayValue += buttonText;
			calculation.textContent = displayValue;
	}
});

let num1;
let operator;
let num2;
let displayValue = "";

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(a, operator, b) {
	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "*":
			return multiply(a, b);
		case "/":
			return divide(a, b);
	}
}