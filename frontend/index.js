const container = document.querySelector('.items');
const searchForm = document.querySelector('.search');

async function renderItems() {
    // Query the backend to get the items from the database.
    const uri = 'http://localhost:8000/items';

    try {
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
                    <a href="edit.html?id=${item.id}">Edit this item</a>
                </div>`
        });
    
        container.innerHTML = template;
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', renderItems);