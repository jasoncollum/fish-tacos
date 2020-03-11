console.log("SCRIPT.JS WORKING");

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];

const buttonsDiv = document.querySelector('.all');
const clearAllBtn = document.querySelector('#clear-all');
const checkAllBtn = document.querySelector('#check-all');
const uncheckAllBtn = document.querySelector('#uncheck-all');

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item')).value;
    const item = {
        text,
        checked: false
    }
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
    buttonsDiv.classList.remove('hidden');
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.checked && "checked"} />
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join('');
}

function toggleCheckbox(e) {
    if (!e.target.matches('input')) return; // skip function if not a match
    const index = e.target.dataset.index;
    items[index].checked = !items[index].checked;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function clearAll() {
    localStorage.removeItem('items');
    items = [];
    buttonsDiv.classList.add('hidden');
    populateList(items, itemsList);
}

function checkAll() {
    const allItemsChecked = items.map(item => {
        return { ...item, checked: true }
    });
    localStorage.setItem('items', JSON.stringify(allItemsChecked));
    populateList(allItemsChecked, itemsList);
}

function uncheckAll() {
    const allItemsUnchecked = items.map(item => {
        return { ...item, checked: false }
    });
    localStorage.setItem('items', JSON.stringify(allItemsUnchecked));
    populateList(allItemsUnchecked, itemsList);
}

if (items.length === 0) {
    buttonsDiv.classList.add('hidden');
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleCheckbox);
clearAllBtn.addEventListener('click', clearAll);
checkAllBtn.addEventListener('click', checkAll);
uncheckAllBtn.addEventListener('click', uncheckAll);
populateList(items, itemsList);