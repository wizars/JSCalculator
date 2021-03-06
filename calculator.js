// Define the operation buttons
const CLEAR = "clear";
const DELETE = "delete";
const PLUS = "plus";
const MINUS = "minus";
const TIMES = "times";
const DIVIDE = "divide";
const EQUAL = "equal";
const DOT = "dot";


// Define=the variables and the operator selected
var var_current = "", var_new = "", operator = "";

// Define const to access the buttons easily
const btn_clear = document.getElementById("clear");
const btn_delete = document.getElementById("delete");
const btn_plus = document.getElementById("plus");
const btn_minus = document.getElementById("minus");
const btn_times = document.getElementById("times");
const btn_divide = document.getElementById("divide");
const btn_equal = document.getElementById("equal");

const btn1 = document.getElementById("n1");
const btn2 = document.getElementById("n2");
const btn3 = document.getElementById("n3");
const btn4 = document.getElementById("n4");
const btn5 = document.getElementById("n5");
const btn6 = document.getElementById("n6");
const btn7 = document.getElementById("n7");
const btn8 = document.getElementById("n8");
const btn9 = document.getElementById("n9");
const btn0 = document.getElementById("n0");
const btn_dot = document.getElementById("dot");

// Define const to acces the two displays
const disp_result = document.getElementById("result");
const disp_newValue = document.getElementById("new_value");

// Add eventlistener to each button
btn_clear.addEventListener("click", operate);
btn_delete.addEventListener("click", operate);
btn_plus.addEventListener("click", operate);
btn_minus.addEventListener("click", operate);
btn_times.addEventListener("click", operate);
btn_divide.addEventListener("click", operate);
btn_equal.addEventListener("click", operate);

btn1.addEventListener("click", number);
btn2.addEventListener("click", number);
btn3.addEventListener("click", number);
btn4.addEventListener("click", number);
btn5.addEventListener("click", number);
btn6.addEventListener("click", number);
btn7.addEventListener("click", number);
btn8.addEventListener("click", number);
btn9.addEventListener("click", number);
btn0.addEventListener("click", number);
btn_dot.addEventListener("click", number);

// Add eventlistener for keyboard
window.addEventListener("keydown", captureKey);


// Executed when a key is press to capture the value and pass it as if the corresponding button was press
function captureKey(evento) {

    let tecla = evento.key;
    let code = evento.keyCode;

    console.log("Tecla " + tecla + " pulsada, con codigo " + code)


    if (tecla in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] || code === 110) {
        console.log("\tTecla numero " + tecla)

        number(evento);
    }
    else if (code === 106 || 107 || 109 || 111 || 13 || 27 || 8) {
        // Codes corresponding to *, +, -, /, Enter, Esc(CLEAR), Return (Delete)
        console.log("\tTecla operacion " + code)
        operate(evento)
    }

}

// Executed when the user clicks a operation button
function operate(event) {


    // Inicialize variable than identifies the operation requested
    let valor;

    // Check if it comes from a key
    if (event.keyCode != undefined) {
        valor =
            event.keyCode ===
                107 ? PLUS
                : event.keyCode === 109 ? MINUS
                    : event.keyCode === 106 ? TIMES
                        : event.keyCode === 111 ? DIVIDE
                            : event.keyCode === 13 ? EQUAL
                                : event.keyCode === 27 ? CLEAR
                                    : DELETE;

        console.log("\t\tTecla OPERACION " + valor)
    }
    else {
        valor = this.value;
        console.log("\t\tBoton OPERACION " + valor)

    }

    // Compute the new variable
    var_new = Number(disp_newValue.innerHTML)

    switch (valor) {

        case CLEAR:

            console.log(">> CLEARING")

            // Reset both displays
            disp_result.innerHTML = "";
            disp_newValue.innerHTML = "0"

            var_current = "";
            var_new = ""

            break

        case DELETE:

            console.log(">> DELETING")

            // Take away the last character    
            let oneCharLess = disp_newValue.innerHTML
            oneCharLess = oneCharLess.slice(0, oneCharLess.length - 1)

            // Check if it's an empty string, in such case return "0" to the display
            disp_newValue.innerHTML = oneCharLess.length > 0 ? oneCharLess : "0"

            // Update the variable
            var_new = disp_newValue.innerHTML;

            break

        case PLUS:

            // Set the current operator, needed for the "=" button to know what to do
            operator = PLUS;
            // If var_current is empty...
            if (var_current === "") {

                // Clear disp new_value
                disp_newValue.innerHTML = "0";

                // Update disp_result
                disp_result.innerHTML = var_new + " + "

                // Pass the value of var_new to var_current and clear var_new
                var_current = var_new;
                var_new = "";

            }
            // If there's already a value var_current
            else {

                // Update the result disp
                disp_result.innerHTML =( Math.round((Number(var_new) + Number(var_current)) * 10000) / 10000)+" + ";


                // Update the new value disp
                disp_newValue.innerHTML = "0"

                // Compute the sum and assing to both variable
                var_current = Math.round((Number(var_new) + Number(var_current)) * 10000) / 10000;
                var_new = "";

            }


            break

        case MINUS:
            // Set the current operator, needed for the "=" button to know what to do
            operator = MINUS;

            // If var_current is empty...
            if (var_current === "") {

                // Clear disp new_value
                disp_newValue.innerHTML = "0";

                // Update disp_result
                disp_result.innerHTML = var_new + " - "

                // Pass the value of var_new to var_current and clear var_new
                var_current = var_new;
                var_new = "";

            }
            // If there's already a value var_current
            else {


                // Update the result disp
                disp_result.innerHTML =( Math.round((Number(var_current) - Number(var_new)) * 10000) / 10000)+" - ";


                // Update the new value disp
                disp_newValue.innerHTML = "0"

                // Compute the sum and assing to both variable
                var_current = Math.round((Number(var_current) - Number(var_new)) * 10000) / 10000;
                var_new = "";

            }

            break

        case TIMES:
            // Set the current operator, needed for the "=" button to know what to do
            operator = TIMES;

            // If var_current is empty...
            if (var_current === "") {

                // Clear disp new_value
                disp_newValue.innerHTML = "0";

                // Update disp_result
                disp_result.innerHTML = var_new + " x "

                // Pass the value of var_new to var_current and clear var_new
                var_current = var_new;
                var_new = "";

            }
            // If there's already a value var_current
            else {

                // Update the result disp
                disp_result.innerHTML = (Math.round((Number(var_new) * Number(var_current)) * 10000) / 10000)+" x ";

                // Update the new value disp
                disp_newValue.innerHTML = "0"

                // Compute the sum and assing to both variable
                var_current = Math.round((Number(var_new) * Number(var_current)) * 10000) / 10000;
                var_new = "";

            }

            break

        case DIVIDE:

            // Check zero division
            if (var_new === 0) {
                console.error("Division by zero");
                alert("Division by zero")
                operate({ keyCode: 27 })
                break;
            }

            // Set the current operator, needed for the "=" button to know what to do
            operator = DIVIDE;

            // If var_current is empty...
            if (var_current === "") {

                // Clear disp new_value
                disp_newValue.innerHTML = "0";

                // Update disp_result
                disp_result.innerHTML = var_new + " / "

                // Pass the value of var_new to var_current and clear var_new
                var_current = var_new;
                var_new = "";

            }
            // If there's already a value var_current
            else {

                // Update the result disp
                disp_result.innerHTML =( Math.round((Number(var_current) / Number(var_new)) * 10000) / 10000)+" / ";


                // Update the new value disp
                disp_newValue.innerHTML = "0"

                // Compute the sum and assing to both variable
                var_current = Math.round((Number(var_current) / Number(var_new)) * 10000) / 10000;
                var_new = "";

            }
            break

        case EQUAL:

            switch (operator) {

                case PLUS:

                    // If var current is empty, then it's value is 0
                    var_current = var_current === "" ? "0" : var_current

                    // Update the result disp
                    disp_result.innerHTML = var_current + " + " + var_new + " = ";

                    // Update the new value disp
                    disp_newValue.innerHTML = Math.round((Number(var_new) + Number(var_current)) * 10000) / 10000;

                    // Compute the sum
                    var_new = Math.round((Number(var_new) + Number(var_current)) * 10000) / 10000;

                    // Update var_current and reset operator
                    var_current = "";
                    operator = EQUAL;

                    break;

                case MINUS:

                    // If var current is empty, then it's value is 0
                    var_current = var_current === "" ? "0" : var_current

                    // Update the result disp
                    disp_result.innerHTML = var_current + " - " + var_new + " = ";

                    // Update the new value disp
                    disp_newValue.innerHTML = Math.round((Number(var_current) - Number(var_new)) * 10000) / 10000;

                    // Compute the sum
                    var_new = Math.round((Number(var_current) - Number(var_new)) * 10000) / 10000;

                    // Update var_current and reset operator
                    var_current = "";
                    operator = EQUAL;

                    break;

                case TIMES:

                    // If var current is empty, then it's value is 0
                    var_current = var_current === "" ? "0" : var_current

                    // Update the result disp
                    disp_result.innerHTML = var_current + " x " + var_new + " = ";

                    // Update the new value disp
                    disp_newValue.innerHTML = Math.round((Number(var_new) * Number(var_current)) * 10000) / 10000;

                    // Compute the sum
                    var_new = Math.round((Number(var_new) * Number(var_current)) * 10000) / 10000;

                    // Update var_current and reset operator
                    var_current = "";
                    operator = EQUAL;

                    break;

                case DIVIDE:

                    // Check zero division
                    if (var_new === 0) {
                        console.error("Division by zero");
                        alert("Division by zero")
                        operate({ keyCode: 27 })
                        break;
                    }
                    // If var current is empty, then it's value is 0
                    var_current = var_current === "" ? "0" : var_current

                    // Update the result disp
                    disp_result.innerHTML = var_current + " / " + var_new + " = ";

                    // Update the new value disp
                    disp_newValue.innerHTML = Math.round((Number(var_current) / Number(var_new)) * 10000) / 10000;

                    // Compute the sum
                    var_new = Math.round((Number(var_current) / Number(var_new)) * 10000) / 10000;

                    // Update var_current and reset operator
                    var_current = "";
                    operator = EQUAL;
                    /* }
                    else{
                        alert("Kakitas")
                    } */

                    break;

                default:
            }

            break


        default:


    }
}

// Executed when the user clicks a number button
function number(event) {

    console.log("\t\tTecla NUMERO " + event.key)
    if (disp_newValue.innerHTML.length < 10) {


        // Check if it comes from a key
        if (event.key != undefined) {
            this.value = event.key;
        }

        if (operator !== EQUAL) {
            // Check if it's the decimal point
            if (this.value === DOT) {

                // Check if we already have a decimal point in the string
                let esta = disp_newValue.innerHTML.match(/\./) != null;
                disp_newValue.innerHTML = esta ? disp_newValue.innerHTML : disp_newValue.innerHTML.concat("\.");
            }
            else {

                // Check if disp new show a 0, if true return just the new value, else apende the new digit
                disp_newValue.innerHTML = (disp_newValue.innerHTML === "0")
                    ? this.value
                    : disp_newValue.innerHTML.concat(this.value);
            }
        }
        else {
            // Check if it's the decimal point
            if (this.value === DOT) {

                // If the user starts with a decimal dot
                disp_newValue.innerHTML = "0".concat("\.");
            }
            else {
                disp_newValue.innerHTML = this.value;
            }

            // Clear the previous operation
            disp_result.innerHTML = "";
            operator = "";

        }
    }
}