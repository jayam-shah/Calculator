let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return; // No operation to perform
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            break;
        default:
            handleMath(symbol);

            case '←':
                if(buffer.length === 1) {
                    buffer = "0";
                }
                else {
                    buffer = buffer.substring(0, buffer.length - 1);
                }
                break;
            case '+':
                if (buffer === "0") {
                    return; // No operation to perform
                }
                handleMath(symbol);
                break;
            case '−':
                if (buffer === "0") {
                    return; // No operation to perform
                }
                handleMath(symbol);
                break;
            case '×':   
                if (buffer === "0") {
                    return; // No operation to perform
                }
                handleMath(symbol);
                break;
            case '÷':
                if (buffer === "0") {
                    return; // No operation to perform
                }
                handleMath(symbol);
                break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        return; // No operation to perform
    }
    const intBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString; // Replace "0" with the new number
    } else {
        buffer += numberString; // Append the new number to the existing buffer
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        })
    }

    init();


    const toggleButton = document.getElementById("theme-toggle");

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    
        // Change button text/icon based on current mode
        if (document.body.classList.contains("dark-mode")) {
            toggleButton.innerText = "☀️ Light Mode";
        } else {
            toggleButton.innerText = "🌙 Dark Mode";
        }
    });
    