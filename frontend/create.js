const form = document.querySelector('form');
const backBtn = document.querySelector('.back');

const createItem = async (e) => {
  e.preventDefault();

  // Extract all the info submitted by the user.
  const item = {
    itemName: form.itemName.value,
    quantity: form.quantity.value,
    shipFrom: form.shipFrom.value,
    shipTo: form.shipTo.value,
    shipper: form.shipper.value,
    receiver: form.receiver.value,
    shippingMethod: form.shippingMethod.value
  };

  await fetch('http://localhost:8000/items', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.replace('index.html');
}

backBtn.addEventListener('click', () => window.location.href='index.html');
form.addEventListener('submit', createItem);