const billInput = document.querySelector('#bill');
const percentInput = document.querySelectorAll('input[name="percent"]');
const customRadio = document.querySelector('#custom');
const tipPercentInput = document.querySelector('#tip-percent');
const numPeopleInput = document.querySelector('#num-people');
const resetBtn = document.querySelector('#reset-btn');
const tipAmount = document.querySelector('.card__tip_amount-number');
const totalAmount = document.querySelector('.card__total-number');


const validateInput = function (e) {
    const label = document.querySelector(`label[for="${e.target.id}"]`);
    const input = document.querySelector(`#${e.target.id}`);

    label.nextElementSibling.classList.remove('active');
    input.classList.remove('error-active');

    if (e.target.value !== '' && !/^\d+$/.test(e.target.value)) {
        label.nextElementSibling.classList.add('active');
        input.classList.add('error-active');
    } 
    
    if (billInput.value === '' && tipPercentInput.value === '' && numPeopleInput.value === '') {
        resetBtn.classList.remove('active');
    } else {
        resetBtn.classList.add('active');
    }
}

const resetCalc = function () {
    const label = document.querySelectorAll('label');
    const input = document.querySelectorAll('input');

    label.forEach((el) => el.nextElementSibling.classList.remove('active'));
    input.forEach((el) => el.classList.remove('error-active'));

    document.querySelectorAll('#bill, #tip-percent, #num-people').forEach((el) => el.value = '');

    resetBtn.classList.remove('active');

    tipAmount.innerHTML = '$0.00';
    totalAmount.innerHTML = '$0.00';
}

const calc = function () {
    const dataPercent = document.querySelector('input[type="radio"]:checked').getAttribute('data-percent');
    const bill = Number(billInput.value);
    const numPeople = Number(numPeopleInput.value);
    const tipPercent = Number(tipPercentInput.value);

    if (!Number.isFinite(bill) || !Number.isFinite(numPeople) || numPeople <= 0) {
        return;
    }

    if (customRadio.checked) {
        tipAmount.innerHTML = `$${((bill * (0.01 * tipPercent)) / numPeople).toFixed(2)}`;
        totalAmount.innerHTML = `$${((bill * (1.00 + (0.01 * tipPercent))) / numPeople).toFixed(2)}`;
    } else {
        tipAmount.innerHTML = `$${((bill * (0.01 * dataPercent)) / numPeople).toFixed(2)}`;
        totalAmount.innerHTML = `$${((bill * (1.00 + (0.01 * dataPercent))) / numPeople).toFixed(2)}`;
    }

}



document.addEventListener('input', validateInput);
document.addEventListener('input', calc);
resetBtn.addEventListener('click', resetCalc);


