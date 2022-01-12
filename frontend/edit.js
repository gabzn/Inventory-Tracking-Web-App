const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.edit');
const deleteBtn = document.querySelector('.delete');
const backBtn = document.querySelector('.back');
const form = document.getElementById('editForm');
const uri = 'http://localhost:8000/item/';
let itemName;

async function renderItem() {
  const res = await fetch(`${uri}${id}`);
  const data = await res.json();
  const item = data.item;
  itemName = item.itemName;

  const template = `
      <label for='quantity'>Quantity:</label>
      <input id='quantity' name="quantity" required placeholder=${item.quantity} value=${item.quantity}>
      
      <label for='shipFrom'>Ship From:</label>
      <input id='shipFrom' name="shipFrom" required placeholder=${item.shipFrom} value=${item.shipFrom}>
      
      <label for='shipTo'>Ship To:</label>
      <input id='shipTo' name="shipTo" required placeholder=${item.shipTo} value=${item.shipTo}>
      
      <label for='shipper'>Shipper:</label>
      <input id='shipper' name="shipper" required placeholder=${item.shipper} value=${item.shipper}>
      
      <label for='receiver'>Receiver:</label>
      <input id='receiver' name="receiver" required placeholder=${item.receiver} value=${item.receiver}>
      
      <label for='shippingMethod'>Shipping Method:</label>
      <input id='shippingMethod' name="shippingMethod" required placeholder=${item.shippingMethod} value=${item.shippingMethod}>
  `
  // Insert the header to the html first.
  container.insertAdjacentHTML('afterbegin', `<h1>${item.itemName}</h1>`); 

  // Insert the form later.
  form.innerHTML = template;
}

// Delete the current item with this id
deleteBtn.addEventListener('click', async () => {
  const res = await fetch(`${uri}${id}`, {method: 'DELETE'});
  const data = await res.json();

  if(data.isSuccessful) window.location.replace("index.html");
})

// Save any changes made to the item.
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const updatedItem = {
    itemName: itemName,
    quantity: form.quantity.value,
    shipFrom: form.shipFrom.value,
    shipTo: form.shipTo.value,
    shipper: form.shipper.value,
    receiver: form.receiver.value,
    shippingMethod: form.shippingMethod.value
  };

  await fetch(`${uri}${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedItem),
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.replace('index.html');
})


backBtn.addEventListener('click', () => window.location.href='index.html');
window.addEventListener('DOMContentLoaded', renderItem);