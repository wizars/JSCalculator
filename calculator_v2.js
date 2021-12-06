
// Define the variables
var firstOperand = "";
var secondOperadn = "";
var operation = null;

// Define const to access special buttons
const btnClear = document.getElementById("clear");
const btnDelete = document.getElementById("delete");
const btnEqual = document.getElementById("equal");

// Define const to access operation buttons
const btnsOperator = document.querySelectorAll(".operator")

// Define const to acces the number buttons
const btnsNumber = document.querySelectorAll(".number");
const btnDot = document.getElementById("dot");

// Define const to acces the two displays
const dispLastOp = document.getElementById("result");
const dispCurrentOp = document.getElementById("new_value");


// Add eventlistener to each button
btnClear.addEventListener("click", clearScreen);
btnDelete.addEventListener("click", deleteNumber);
btnEqual.addEventListener("click", evaluate);
btnDot.addEventListener("click", insertDot);

btnsOperator.forEach((button) => button.addEventListener("click", () => setOperation(button.textContent)));
btnsNumber.forEach((button) => button.addEventListener("click", () => insertNumber(button.textContent)));

// Add eventlistener for keys
window.addEventListener("keydown", handleKeyDown);


// Append a new digit to the current number
function insertNumber(numero) {

    // Check if the displayed number is too long
    if (dispCurrentOp.textContent.length < 10) {

        // Check if the dispCurrentOp shows only a 0
        if (dispCurrentOp.textContent === "0")
            dispCurrentOp.textContent = numero;
        else
            dispCurrentOp.textContent += numero;

    }
    gatito();
}

// Resets everything
function clearScreen() {
    dispCurrentOp.textContent = "0"
    dispLastOp.textContent = "";
    firstOperand = "";
    secondOperadn = "";
    operation = null;
}

// Deletes the last digit of the current operator
function deleteNumber() {

    // Take away the last character        
    dispCurrentOp.textContent = dispCurrentOp.textContent.slice(0, dispCurrentOp.textContent.length - 1);

    // Check if it's an empty string or maybe just a dot, in such case return "0" to the display
    if (dispCurrentOp.textContent.length <= 0 || dispCurrentOp.textContent == ".")
        dispCurrentOp.textContent = "0"
}

// Evaluates the operation and show results
function evaluate() {

    let result

    // Check if we have a first operand and an operation
    if (firstOperand === "" || operation === null) return;

    // Set the second operand
    secondOperadn = Number(dispCurrentOp.textContent);

    // Compute the corresponding operation
    switch (operation) {
        case "+":
            result = Number(firstOperand) + Number(secondOperadn);
            break;
        case "-":
            result = Number(firstOperand) - Number(secondOperadn);
            break;
        case "*":
            result = Number(firstOperand) * Number(secondOperadn);
            break;
        case "/":
            // Check division by zero
            if (Number(secondOperadn) === 0) {
                // In such case alert the user and clear the screen
                alert("Division by zero");
                clearScreen();
                return;
            }
            else {
                result = Number(firstOperand) / Number(secondOperadn);
            }
            break;
        default:
            break;
    }
    // Update the current display
    dispCurrentOp.textContent = redondea(result);

    // Update last op display
    dispLastOp.textContent = firstOperand + " " + operation + " " + secondOperadn + " = ";

    // Finally Clear the operation
    operation = null;
}

// Prepares the operation to be perfom
function setOperation(op) {

    // If we have a selected operation we first evaluate
    if (operation !== null) evaluate()

    // Set the operation tu perform in the global variable
    operation =convertSigns( op);

    // Set the first operand
    firstOperand = Number(dispCurrentOp.textContent);

    // change the last operation display
    dispLastOp.textContent = firstOperand + " " + operation + " ";

    // Clear the current op display
    dispCurrentOp.textContent = "0";

}
// Convert the signs to the proper ones
function convertSigns(op) {
    if (op === "x") return "*";
    if (op === "÷") return "/";
    if (op === "+") return "+";
    if (op === "-") return "-";
    return op;
}

// Handles the key events
function handleKeyDown(evento) {

    let tecla = evento.key;

    // Detect the number keys
    if (tecla >= 0 && tecla <= 9)
        insertNumber(tecla);

    // Detect operation keys
    if (tecla === "/" || tecla === "*" || tecla === "-" || tecla === "+")
        setOperation(tecla);

    // Detect the rest of keys
    if (tecla === ".") insertDot();
    if (tecla === "Backspace") deleteNumber();
    if (tecla === "Escape") clearScreen();
    if (tecla === "Enter") evaluate();

}

// Inserts the decimal point
function insertDot() {

    // Check if we already have a decimal point in the string
    if (!dispCurrentOp.textContent.includes("."))
        dispCurrentOp.textContent = dispCurrentOp.textContent.concat("\.");


}

// Rounds the result to 4 decimal places
function redondea(x) {
    return Math.round(x * 1e4) / 1e4;
}

// Easter Egg
function gatito() {
    if (dispCurrentOp.textContent === "3.1415") {
        let gato = document.getElementById("egg");
        gato.hidden = false;
        gato.addEventListener("click", () => gato.hidden = true)

    }

}