const addElement = document.querySelector('.btn-add-row');
const tradeList = document.querySelector('.trade-list');
const btnReset = document.querySelector('.btn-reset');
const btnClear = document.querySelector('.btn-clear');
const tradeRow = document.querySelectorAll('.trade-input');

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

let data = [];
