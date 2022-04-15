const addElement = document.querySelector('.btn-add-row');
const tradeList = document.querySelector('.trade-list');
const btnReset = document.querySelector('.btn-reset');
const btnClear = document.querySelector('.btn-clear');
const tradeInputs = document.getElementsByClassName('trade-input');
const tradeCalcBtn = document.querySelector('.trade-calc-btn');
const tradeAvg = document.querySelector('.trade-avg');
const totalQtyEle = document.querySelector('.total-qty');
const totalValueEle = document.querySelector('.total-value');
const tradeRow = document.getElementsByClassName('trade-item-row');
const errorMsg = document.querySelector('.error');

//Intial States
let tradeTagCounter = 3;
let qtyTagCounter = 3;
let priceTagCounter = 3;
let data = {};

//Adding new row to the list
addElement.addEventListener('click', function () {
  const html = `<li class="trade-item-row">
    <p class="trade-tag">Trade ${tradeTagCounter}</p>
    <input type="number" placeholder="Quantity" class="trade-input qty-${qtyTagCounter}" />
    <input type="number" placeholder="Price" class="trade-input price-${priceTagCounter}" />
  </li>`;

  tradeList.insertAdjacentHTML('beforeend', html);
  tradeCounter++;
  qty++;
  price++;
});

function updateUI(totalAvg = 00, totalQty = '--', totalValue = '--') {
  tradeAvg.textContent = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(totalAvg);
  // const totalAmount = totalvalue.reduce((acc, val) => acc + val, 0);
  totalQtyEle.textContent = totalQty;
  totalValueEle.textContent = totalValue;
  errorMsg.textContent = '';
}

function updatingCalcValues() {
  const inputEntriesList = Object.values(data);

  if (inputEntriesList.flat().includes('')) {
    errorMsg.textContent = '! Input cannot left blank';
  } else {
    const totalQty = inputEntriesList.reduce((acc, item) => {
      return acc + Number(item[0]);
    }, 0);
    const amountLists = inputEntriesList.map(arr => Number(arr[0] * arr[1]));

    const totalValue = amountLists.reduce((acc, val) => acc + val, 0);

    const totalAvg = amountLists.reduce((acc, val) => acc + val / totalQty, 0);
    updateUI(totalAvg, totalQty, totalValue);
  }
}

//The dataHandler extracts value from input filed and add to data object
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

//Restting the whole page
btnReset.addEventListener('click', () => location.reload(true));

//Clear button handler
btnClear.addEventListener('click', () => {
  for (let i = 0; i < tradeInputs.length; i++) {
    tradeInputs[i].value = '';
  }
  updateUI();
});

//Calculate button
tradeCalcBtn.addEventListener('click', dataHandler);
