class Calculator {
    constructor(prevOpTextElement, currOpTextElement) {
        this.prevOpTextElement = prevOpTextElement;
        this.currOpTextElement = currOpTextElement;
        this.clear();
    }

    clear(){
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }
    
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    random(){
        this.currOperand = Math.floor((Math.random()*100));
    }

    chooseOperation(operation) {
        if (this.currOperand === '') return;
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+': 
                computation = prev + current;
                break
            case '-': 
                computation = prev - current;
                break
            case '/': 
                computation = prev / current;
                break
            case '*': 
                computation = prev * current;
                break
            case '^':
                computation = prev ** current;
                break
            default:
                return;
        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumFormat(number) {
        const stringNum = number.toString();
        const integerDigit = parseFloat(stringNum.split('.')[0]);
        const decimalDigit = stringNum.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigit)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigit.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currOpTextElement.innerText = this.getDisplayNumFormat(this.currOperand);
        if (this.operation != null) {
            this.prevOpTextElement.innerText = 
            `${this.getDisplayNumFormat(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOpTextElement.innerText = '';
        }
    }
}

const numberKey = document.querySelectorAll('.numBtn');
const operationKey = document.querySelectorAll('.opBtn');
const equalsKey = document.querySelector('.runBtn');
const deleteKey = document.querySelector('.delBtn');
const clearKey = document.querySelector('.clearBtn');
const randKey = document.querySelector('.randBtn');
const prevOpTextElement = document.querySelector('[data-previousOp]')
const currOpTextElement = document.querySelector('[data-currentOp]')

const calculator = new Calculator(prevOpTextElement, currOpTextElement);

numberKey.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationKey.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsKey.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearKey.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteKey.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

randKey.addEventListener('click', button => {
    calculator.random();
    calculator.updateDisplay();
})


/////animations
gsap.from('.numBtn', {duration: 1.3, x: '-1000%', stagger: .1, ease: 'slow(0.3, 0.4, false)'})
gsap.from('.opBtn', {duration: 1.3, x: '1000%', stagger: .1, ease: 'slow(0.3, 0.4, false)'})
gsap.from('.runBtn', {duration: 1.3, x: '1000%', ease: 'slow(0.3, 0.4, false)'})
gsap.from('#editBtn', {duration: 1.3, y: '1000%', stagger: .2, ease: 'slow(0.3, 0.4, false)'})
gsap.from('.calc-display', {duration: 1.3, y: '-1000%', ease: 'slow(0.3, 0.4, false)'})
gsap.from('.footer-line', {duration: 1.3, delay: 2, opacity: 0})
gsap.from('.calculator', {duration: 1.3, delay: 1, opacity: 0, height: 0, ease: 'slow(0.3, 0.4, false)'})