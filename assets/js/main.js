var memory = '0';
var current = '0';
var operation = 0;
const maxLength = 25;
var clearState = false;


$('.number').click(function() {
    addValue($(this).text())
});

$('.decimal').click(function() {
    decimal();
});

$('.posneg').click(function() {
    posNeg();
});

$('.operator').click(function() {
   operate($(this).text());
});

$('.equals').click(function() {
    calculate();
});

$('.all-clear').click(function() {
    if (clearState) {
        clear();
    } else if(!clearState) {
        allClear();
    }
});

$('.percent').click(function() {
    percent();
});

function addValue(digit) {
    if (current.length > maxLength) {
        current = "Input too long!";
    } else {
        if ((eval(current) == 0) && current.indexOf('.') == -1) {
            current = digit;
        } else {
            current = current + digit;
        }
    }
    $('.display').val(current);
}

function decimal() {
    if (current.length == 0) {
        current = '0.';
    } else {
        current = current + '.';
    }
    $('.display').val(current);
}

function posNeg() {
    current = current.toString();
    if (current.indexOf('-') == 0) {
        current = current.substring(1);
    } else {
        current = '-' + current;
    }
    if (eval(current) == 0 && (current.indexOf(".") == -1)) {
        current = "0";
    }
    $('.display').val(current);
}

function clear() {
    current = '0';
    $('.display').val(current);
}

function percent() {
    current = parseInt(current).toFixed(2) / 100;
    $('.display').val(current);
}

function allClear() {
    current = '0';
    operation = 0;
    memory = '0';
    $('.display').val(current);
}

function operate(op) {
    if (operation != 0) {
        calculate();
    }

    if (op.indexOf('*') > -1) {
        operation = 1;
    }
    if (op.indexOf('/') > -1) {
        operation = 2;
    }
    if (op.indexOf('+') > -1) {
        operation = 3;
    }
    if (op.indexOf('-') > -1) {
        operation = 4;
    }

    clearState = true;
    memory = current;
    current = '';
    $('.all-clear').text('C');
    $('.display').val(current);
}

function calculate() {
    switch (operation) {
        case 1:
            current = eval(memory) * eval(current);
            break;
        case 2:
            if (eval(current) != 0) {
                current = eval(memory) / eval(current);
            } else {
                current = "Cannot divide by zero!";
            }

            break;
        case 3:
            current = eval(memory) + eval(current);
            break;
        case 4:
            current = eval(memory) - eval(current);
            break;
    }
    clearState = false;
    operation = 0;
    memory = "0";
    current = current + '';
    if (current.indexOf("Infinity") != -1) {
        current = "Value too big!";
    } else if (current.indexOf("NaN") != -1) {
        current = "Does not compute!";
    }
    $('.all-clear').text("AC");
    $('.display').val(current);
}