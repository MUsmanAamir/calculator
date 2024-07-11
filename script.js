const calculator = {
    displayValue: '0', // The current display value of the calculator
    firstOperand: null, // The first operand for the calculation
    waitingForSecondOperand: false, // Indicates if the calculator is waiting for the second operand
    operator: null, // The operator for the calculation
};

// Function to handle digit inputs
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand) {
        // If waiting for second operand, replace display value with the digit
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Append the digit to the current display value
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// Function to handle decimal point inputs
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand) {
        
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }

    
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

// Function to handle operator inputs
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        // If an operator is already present and waiting for the second operand, update the operator
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        // If there is no first operand, set it to the input value
        calculator.firstOperand = inputValue;
    } else if (operator) {
        // If an operator is present, perform the calculation
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

// Function to perform calculations based on the operator
function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

// Function to reset the calculator to its initial state
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

// Function to update the calculator display
function updateDisplay() {
    const display = document.getElementById('calculator-screen');
    display.value = calculator.displayValue;
}

// Initialize the display
updateDisplay();

// Event listener for button clicks
const keys = document.querySelector('.container');
keys.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return; // Only process if a button is clicked
    }

    if (target.hasAttribute('data-action')) {
        // Handle different actions based on the button's data-action attribute
        const action = target.getAttribute('data-action');

        switch (action) {
            case 'clear':
                resetCalculator();
                break;
            case 'percent':
                calculator.displayValue = `${parseFloat(calculator.displayValue) / 100}`;
                break;
            case 'memory-add':
                // Handle memory-add (not implemented in this example)
                break;
            case 'memory-subtract':
                // Handle memory-subtract (not implemented in this example)
                break;
            case 'calculate':
                // Perform the calculation if the operator and first operand are present
                if (calculator.operator && calculator.firstOperand != null) {
                    handleOperator(calculator.operator);
                    calculator.operator = null;
                    calculator.waitingForSecondOperand = false;
                }
                break;
            default:
                handleOperator(action);
                break;
        }
    } else if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
    } else {
        inputDigit(target.innerText);
    }

    // Update the display after any action
    updateDisplay();
});
