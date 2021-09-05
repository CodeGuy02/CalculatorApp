var numbers = [];

var operatorCount = 0;

var currentColor = 0;

var colorPalette = {
    0:'purple',
    1:'blue',
    2:'#00FF00',
    3:'maroon',
    4:'khaki',
    5:'ForestGreen',
    6:'PaleVioletRed',
    7:'LightSeaGreen',
    8:'DeepPink',
    9:'Orchid',
    numColors:10 // manual update required :(
};

function buttonPress(ourNum) {
    var otherOperatorPresent = false;
    var otherOperator = '';

    if (typeof(ourNum) == 'number') {
        newOutput = document.getElementById('outputText').innerHTML + ourNum;
        document.getElementById('outputText').innerHTML = newOutput;
    } else
    if (typeof(ourNum) == 'string') {
        var operatorPresent = false;
        var lastOperator = '';
        
        if ((ourNum === '+') || (ourNum === '-') || (ourNum === 'x') || (ourNum === '/')) {
            operatorCount += 1;
            operatorPresent = true;
            //alert('operatorCount = ' + operatorCount + ' symbol:' + ourNum);
        }

        if (operatorPresent && operatorCount > 1) {
            //alert('operatorCount = ' + operatorCount + ' symbol:' + ourNum + ' > 1');
            
            // check for other operators in string:

            var workingString = document.getElementById('outputText').innerHTML;
            workingString = document.getElementById('outputText').innerHTML = workingString + ourNum;
            //workingString.concat(ourNum);
            // remove last operator from string
            lastOperator = workingString.slice(workingString.length - 1, workingString.length);
            currentString = workingString.slice(0, workingString.length-1);
            // check if other operators are present:

            if (currentString.indexOf('+') != -1) {
                otherOperatorPresent = true;
                otherOperator = '+';
            } else
            if (currentString.indexOf('-') != -1) {
                otherOperatorPresent = true;
                otherOperator = '-';
            } else
            if (currentString.indexOf('x') != -1) {
                otherOperatorPresent = true;
                otherOperator = 'x';
            } else
            if (currentString.indexOf('/') != -1) {
                otherOperatorPresent = true;
                otherOperator = '/';
            }

            // if more than one operator exists, immediately calculate using first operator
            if (otherOperatorPresent) {
                var total = 0;
                //alert('another operator present: ' + otherOperator);
                if (otherOperator == '+') {
                    const ourNumbers = currentString.split('+');

                    
                    ourNumbers.forEach(function (item, index) {
                        total += parseInt(item);
                    });

                    operatorCount--;
                } else
                if (otherOperator == '-') {
                    const ourNumbers = currentString.split('-');

                    
                    ourNumbers.forEach(function (item, index) {
                        total -= parseInt(item);
                    });

                    operatorCount--;
                }
                //alert('last operator: ' + lastOperator);
                document.getElementById('outputText').innerHTML = total + lastOperator;
            }

            // return new string with last operator:
        } else

        if (operatorPresent && operatorCount == 1) {
            newOutput = document.getElementById('outputText').innerHTML + ourNum;
            document.getElementById('outputText').innerHTML = newOutput;
        } else

        if (ourNum === '=') {
            //alert('lastOperator:  ' + lastOperator);
            //alert('otherOperator: ' + otherOperator);
            entireString = document.getElementById('outputText').innerHTML;
            //alert(entireString);

            if (entireString.indexOf('+') != -1) {
                const ourNumbers = entireString.split('+');

                var total = 0;
                ourNumbers.forEach(function (item, index) {
                    total += parseInt(item);
                });
            } else
            if (entireString.indexOf('-') != -1) {
                const ourNumbers = entireString.split('-');

                var total = 0;
                firstNum = 0;
                secondNum = 0;
                // foreach() uses zero index for first element
                ourNumbers.forEach(function (item, index) {
                    if (index == 0) {
                        firstNum = item;
                    } else
                    if (index == 1) {
                        secondNum = item; 
                    }
                })
                total = firstNum - secondNum;
            } else
            if (entireString.indexOf('x') != -1) {
                const ourNumbers = entireString.split('x');

                var total = 0;
                firstNum = 0;
                secondNum = 0;
                // foreach() uses zero index for first element
                ourNumbers.forEach(function (item, index) {
                    if (index == 0) {
                        firstNum = item;
                    } else
                    if (index == 1) {
                        secondNum = item; 
                    }
                })
                total = firstNum * secondNum;
            } else
            if (entireString.indexOf('/') != -1) {
                const ourNumbers = entireString.split('/');

                var total = 0;
                firstNum = 0;
                secondNum = 0;
                // foreach() uses zero index for first element
                ourNumbers.forEach(function (item, index) {
                    if (index == 0) {
                        firstNum = item;
                    } else
                    if (index == 1) {
                        secondNum = item; 
                    }
                })
                total = firstNum / secondNum;
                if ( (total % 1) !== 0 ) {
                    total = total.toFixed(4);
                }
            }


            document.getElementById('outputText').innerHTML = total;

            operatorCount = 0;
        }
    }
}

function clearOutput() {
    document.getElementById('outputText').innerHTML = '';
    operatorCount = 0;
    //alert('operator count = ' + operatorCount);
}

function clearLastEntry() {
    workingString = document.getElementById('outputText').innerHTML;

    // Remove last character using slice()
    lastCharacter = workingString.slice(workingString.length - 1, workingString.length);
    newString = workingString.slice(0, workingString.length - 1);
    document.getElementById('outputText').innerHTML = newString;

    if (lastCharacter === '+') {
        operatorCount--;
        //alert('operator count = ' + operatorCount);
    }
}

function changeColor() {
    console.log('changing color');
    currentColor++;
    

    if (currentColor >= colorPalette.numColors) {
        currentColor = 0;    
    }
    console.log('currentColor: ' + currentColor + '  name: ' + colorPalette[currentColor]);

    //document.body.style.setProperty('#button', colorPalette[currentColor] );
    buttons = document.getElementsByClassName('button');
    for(i = 0; i < buttons.length; i++) {
        buttons[i].style.color = colorPalette[currentColor];
      }
    
    /*
    buttonsBackground = document.getElementById('buttons');
    buttonsBackground.style.background = colorPalette[currentColor];
    */
}   

