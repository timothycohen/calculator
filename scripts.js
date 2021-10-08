screen = document.querySelector('input');
keys = document.querySelector('.keys');

// clicking the buttons or using the keyboard do the same thing
window.addEventListener('keydown', e => newEntry(e));
keys.onclick = e => {window.dispatchEvent(new KeyboardEvent('keydown', {'key':`${e.target.dataset.key}`} )); }

// clearing logic when backspace button is held
let timeout;
document.querySelector('.del').onmousedown = () => pressingDown();
document.querySelector('.del').onmouseup = () => clearTimeout(timeout);

function pressingDown() {
	timeout = setTimeout(function(){ screen.value = '' }, 750);
}


function newEntry(e) {
	textSize();

	let key;
	if (e.key != undefined){
		key = e.key;
		e.preventDefault();
	}
	else key = e;

	if (key === 'Escape') return screen.value = '';

	// only calculate if there's one and only one valid operator
	if (key === 'Enter'){
		if (screen.value.slice(-2) === '/0') return alert('Cannot divide by zero!')
		if ( screen.value.includes('/') && screen.value.slice(-1) !== '/') return calculate('/')
		else if ( screen.value.includes('*') && screen.value.slice(-1) !== '*') return calculate('*')
		else if ( screen.value.includes('+') && screen.value.slice(-1) !== '+') return calculate('+')
		else if ( screen.value.includes('-') && screen.value.slice(-1) !== '-') return calculate('-')
		else return;
	}
	// prevent more than 16 digits from being entered
	else if ( screen.value.length > 16 && key !== 'Backspace') return;

	// if it's not a valid key, return
	else if (['0','1','2','3','4','5', '6', '7', '8', '9', '+', '-', '/', '*', 'Backspace', 'ArrowLeft', 'ArrowRight', '.'].indexOf(key) === -1) return;
	
	// don't allow the first digit to be an operator
	else if (screen.value === '' && ['+', '/', '*'].indexOf(key) !== -1){ return}

	// if the first digit is a negative sign, don't allow an operator after it
	else if (screen.value === '-' && ['+', '/', '*', '-'].indexOf(key) !== -1) return

	// only allow one operator
	else if ( (screen.value.includes('+') || screen.value.slice(1).includes('-') || screen.value.includes('/') || screen.value.includes('*') )
						&& ( key === '/' || key === '*' || key === '+' || key === '-' ) ) {
		// if last entry was an operator, allow it to be replaced with another operator only if another doesn't exist
		if (['+', '-', '/', '*'].indexOf(screen.value.slice(-1)) !== -1) {
			if (( screen.value.slice(-1) === '*' || screen.value.slice(-1) === '/') && key === '-'){
				value = screen.value;
			}
			else if ( (screen.value.slice(-2) === '*-' || screen.value.slice(-2) === '/-') ) { value = screen.value.slice(0, -2); }
			else {value = screen.value.slice(0, -1);}
			return screen.value = value + key;
		}
		return;
	}

	// allow only one '.' per equation
	else if ( screen.value.includes('.') && key === '.' ) return console.log('yes');


	// // todo allow only one '.' if there's no operator
	// else if ( (screen.value.split('/').length === 1 && screen.value.split('+').length === 1 && screen.value.split('*').length === 1)
	// 				&& screen.value.includes('.') && key === '.' ) return console.log('yes');
	
	// // if there is an operator, make only allow one . to the right of the operator



	else if (key === 'Backspace') return screen.value = screen.value.slice(0, -1);
	else if (key === 'ArrowLeft' || key === 'ArrowRight') return;

	else return screen.value += key;
};

function add (x, y){ return +x + +y; }

function subtract (x, y){ return +x - +y; }

function multiply (x, y){ return +x * +y; }

function divide (x, y){ return +y !== 0 ? +x / +y : '--' }

function calculate(operator) {
	switch(operator){
		case '/':
			a = screen.value.split('/')
			answer = divide(a[0], a[1])
			break;
		case '+':
			a = screen.value.split('+')
			answer = add(a[0], a[1])
			break;
		case '-':
			a = screen.value.split('-')
			answer = a.length === 3 ? subtract(-a[1], a[2]) : subtract(a[0], a[1]) 
			console.log(a)
			break;
		case '*':
			a = screen.value.split('*')
			answer = multiply(a[0], a[1])
			break;
	}
	screen.value = answer;
	textSize();
}

function textSize() {
	screen.value.length > 9 ? screen.style.fontSize = '2rem' : screen.style.fontSize = '3.5rem';
}


// todo
// function getTwo(){
// 	if (screen.value.split('/').length === 2) {
// 		x = screen.value.split('/')[0];
// 		y = screen.value.split('/')[1];
// 		return [x,y]
// 	}
// 	else return 'no';
// };