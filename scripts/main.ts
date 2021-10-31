const inputList = document.querySelector('.input-list');

inputList.addEventListener('click', (e) => calculate(e.target));

const formulaSpan = document.querySelector('.general-formula__span');
const resultSpan = document.querySelector('.current-result__span');

let formula: string = '';
let result: string = '0';

formulaSpan.innerHTML = formula;
resultSpan.innerHTML = result;

function calculate(target): void {
  if (target.tagName !== 'BUTTON') {
    return;
  }
  if (target.id === 'clean') {
    clean();
    return;
  }

  if (target.id === 'del') {
    if (formula) {
      formula = formula.slice(0, -1);
      getResult();
    }
    return;
  }

  if (target.id === 'perc') {
    if (formula && (Number(formula.slice(-1)) || Number(formula.slice(-1)) === 0)) {
      if (Number(formula) && formula[0] !== '-') {
        formula = String(Number(formula) / 100);
        result = formula;
        render();
        return;
      }
      const lastNum: string = getLastNum(formula);
      const sumBefor: number = eval(formula.slice(0, Number(`-${lastNum.length + 1}`)));
      const perc: number = Math.round((sumBefor / 100 * Number(lastNum)) * 100) / 100;
      formula = formula.slice(0, Number(`-${lastNum.length}`)) + perc;
      getResult();
      return;
    }
    return;
  }

  if (target.id === 'calc') {
    formula = result.toString();
    render();
    return;
  }

  addSimbol(target.value);
}

function render() {
  resultSpan.innerHTML = result;
  formulaSpan.innerHTML = formula;
}

function getResult() {
  const lastNum = Number(formula.slice(-1)) || Number(formula.slice(-1)) === 0 ? Number(formula.slice(-1)) : false;
  if (!formula) {
    result = '0';
    render();
    return;
  }
  if (!lastNum) {
    result = String(Math.round(eval(formula.slice(0, -1)) * 100) / 100);
    render();
    return;
  }
  if (formula.slice(-1) === '.') {
    render();
    return;
  }
  if (Number(formula.slice(-1)) || Number(formula.slice(-1)) === 0) {
    result = String(Math.round(eval(formula) * 100) / 100);
    render();
    return;
  }
  result = String(Math.round(Number(formula.slice(0, -1)) * 100) / 100);
  render();
}

function clean(): void {
  result = '0';
  formula = '';
  render();
}

function addSimbol(value: string): void {
  if (value === '.' && formula.slice(-1) === '.') {
    return;
  }
  if (value === '0') {
    formula = formula + value;
    getResult();
    return;
  }
  if (formula) {
    if (!Number(formula.slice(-1)) && Number(formula.slice(-1)) !== 0 && !Number(value)) {
      formula = formula.slice(0, -1);
      getResult();
      return;
    }
    formula = formula + value;
    getResult();
    return;
  }

  if (Number(value)) {
    formula = value;
    getResult();
    return;
  }

  if (value === '-') {
    formula = value;
    render();
  }
}

function getLastNum(str: string): string {
  let newStr = str.split('-');
  newStr = newStr.join(' ').split('+');
  newStr = newStr.join(' ').split('*');
  newStr = newStr.join(' ').split('/');
  return newStr.slice(-1).toString().split(' ').slice(-1).toString();
}