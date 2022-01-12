const container = document.querySelector('.items');
const searchForm = document.querySelector('.search');
const exportButt = document.querySelector('.exportButton');

async function exportToCSV() {
    const uri = 'http://localhost:8000/exportdata';

    const res = await fetch(uri);
    const data = await res.json();

    if(data.message)    alert(data.message);
    if(data.ok)         alert('Data has been exported. Please check the folder.');
}

async function renderItems() {
    // Query the backend to get the items from the database.
    const uri = 'http://localhost:8000/items';

    const res = await fetch(uri);
    const data = await res.json();
    const items = data.items;

    let template = '';
    items.forEach(item => {
        template += 
            `<div class="item">
                <h2>${item.itemName}</h2>
                <br/>
                <p>Quantity:${item.quantity}</p>
                <p>Ship from:${item.shipFrom}</p>
                <p>Ship to:${item.shipTo}</p>
                <p>Shipper:${item.shipper}</p>
                <p>Receiver:${item.receiver}</p>
                <p>Shipping method:${item.shippingMethod}</p>
                <a href="edit.html?id=${item.id}">Edit/Delete</a>
            </div>`
    });
    
    container.innerHTML = template;
}

exportButt.addEventListener('click', exportToCSV);
window.addEventListener('DOMContentLoaded', renderItems);