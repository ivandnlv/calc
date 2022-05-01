// Calc

let a = '';
let b = '';
let action = '';
let total = false;

const actions = ['÷', 'X', '<=', '-', '+', '=', '%'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

const panel = document.querySelector('.calc__panel');
const out = document.querySelector('.calc__out');

panel.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn')) return;

    const key = e.target.textContent;

    if (key === 'C') {
        a = '';
        b = '';
        action = '';
        out.textContent = '';
        total = false;
    }

    if (numbers.includes(key)) {
        if (b === '' && action === '') {
            a+= key;
            out.textContent = a;
        } else if (a !== '' && action !== '' && total) {
            b = '';
            b += key;
            out.textContent = b;
            total = false;            
        } else {
            b+=key;
            out.textContent = b;
        }
    }

    if (actions.includes(key) && key !== 'C' && key !== '=' && a !== '' && key !== '%' && key !== '<=') {
        action = key;
        out.textContent = action;
        return;
    } 
    
    if (key === '%' && a !== '') {
        action = key;
        b = '';
        a = (+a) / 100;
        out.textContent = a;
    }

    if (key === '<=' && a !== '' && b === '') {
        a = a.slice(0, -1);
        out.textContent = a;
    } else if (key === '<=' && b !== '' && a !== '' && total === false) {
        b = b.slice(0, -1);
        out.textContent = b;
    } else if (key === '<=' && b !== '' && a !== '' && total) {
        a = `${a}`;
        a = a.slice(0, -1);
        b = '';
        out.textContent = a;
        total = false;
    }

    if (key === '=') {
        switch (action) {
            case '+':
                a= (+a) + (+b);
                break;
            case '-':
                a = (+a) - (+b);
                break;
            case 'X':
                a = (+a) * (+b);
                break;
            case '÷':
                if (b === '0') {
                    a = '';
                    b = '';
                    action = '';
                    out.textContent = 'Ошибка';
                    return;
                }
                a = (+a) / (+b);
                break;
        }
        total = true;
        out.textContent = a;
    }

});



