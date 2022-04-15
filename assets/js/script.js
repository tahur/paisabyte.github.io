const addElement = document.querySelector('.btn-add-row');
const tradeList = document.querySelector('.trade-list');
const btnReset = document.querySelector('.btn-reset');
const btnClear = document.querySelector('.btn-clear');
const tradeInputs = document.getElementsByClassName('trade-input');
const tradeCalc = document.querySelector('.trade-calc-btn');
const tradeAvg = document.querySelector('.trade-avg');
const totalQtyEle = document.querySelector('.total-qty');
const totalValueEle = document.querySelector('.total-value');
const tradeRow = document.getElementsByClassName('trade-item-row');

let tradeCounter = 3;
let qty = 3;
let price = 3;
//Adding new row to the list
addElement.addEventListener('click', function () {
  const html = `<li class="trade-item-row">
    <p class="trade-tag">Trade ${tradeCounter}</p>
    <input type="number" placeholder="Quantity" class="trade-input qty-${qty}" />
    <input type="number" placeholder="Price" class="trade-input price-${price}" />
  </li>`;

  tradeList.insertAdjacentHTML('beforeend', html);
  tradeCounter++;
  qty++;
  price++;
  console.log(tradeRow);
});

//Restting the whole page

btnReset.addEventListener('click', () => location.reload(true));

//Clearing the input filed

// btnClear.addEventListener('click', () => {
//   tradeRow.forEach((e, i) => {
//     console.log(e, i);
//     // const elements = e.getElementsByClassName('trade-input');
//     // console.log(elements);
//     // console.log(elements[0].value);
//     // console.log(elements[1].value);
//   });
// });

// tradeRow.forEach(e => console.log(e));
// let totalQty = 0;
// let totalValue = 0;
// let totalAvg = 0;
function inputValues() {
  for (let i = 0; i < tradeInputs.length; i++) {
    tradeInputs[i].value = '';
  }
}

let data = {};

function updatingCalcValues() {
  const dataValue = Object.values(data);
  const totalQty = dataValue.reduce((acc, item) => {
    return acc + Number(item[0]);
  }, 0);

  const amountLists = dataValue.map(arr => Number(arr[0] * arr[1]));

  const totalValue = amountLists.reduce((acc, val) => acc + val, 0);

  const totalAvg = amountLists.reduce((acc, val) => acc + val / totalQty, 0);
  console.log(dataValue, totalQty, totalValue, amountLists, totalAvg);
  //
  tradeAvg.textContent = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(totalAvg);
  // const totalAmount = totalvalue.reduce((acc, val) => acc + val, 0);
  totalQtyEle.textContent = totalQty;
  totalValueEle.textContent = totalValue;
  // ;

  // labelBalance.textContent = totalAvg.toFixed(2);
  // labelSumIn.textContent = totalAmount;
  // labelSumOut.textContent = totalQty;
}

function dataHandler() {
  data = {};
  for (let i = 0; i < tradeRow.length; i++) {
    const tradeName = tradeRow[i].children[0].textContent;
    const qty = tradeRow[i].children[1].value;
    const price = tradeRow[i].children[2]?.value;
    data[tradeName] = [qty, price];
  }
  updatingCalcValues();
}

//Clearing the fileds without removing the added row
btnClear.addEventListener('click', inputValues);

let datary = [];
tradeCalc.addEventListener('click', dataHandler);
