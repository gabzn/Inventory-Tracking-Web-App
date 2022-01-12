const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());

// @route   POST /items
// @desc    Route to create a new item to the database. 
app.post('/items', async (req, res) => {
    try {
        await axios.post('http://localhost:27001/items', req.body);

        res.status(200).json({ok: true});
    } catch (error) {
        res.status(500).json({error, ok: false});
    }
})

// @route   GET /items
// @desc    Route to read all the items.
app.get('/items', async (req, res) => {
    try {
        const databaseRes = await axios.get('http://localhost:27001/items?_order=desc');

        res.status(200).json({items: databaseRes.data, ok: true});
    } catch (error) {
        res.status(500).json({error, ok: false});
    }
})

// @route   GET /item/:id
// @desc    Route to read a single item with the specific id.
app.get('/item/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const databaseRes = await axios.get(`http://localhost:27001/items/${id}`);

        res.status(200).json({item: databaseRes.data, ok: true});
    } catch (error) {
        res.status(500).json({error, ok: false});
    }
})

// @route   PUT /item/:id
// @desc    Route to update a single item with the specific id.
app.put('/item/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await axios.put(`http://localhost:27001/items/${id}`, req.body);

        res.status(200).json({ok: true});
    } catch (error) {
        res.status(500).json({error, ok: false});
    }
})

// @route   DELETE /item/:id
// @desc    Route to delete a single item with the specific id.
app.delete('/item/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await axios.delete(`http://localhost:27001/items/${id}`);

        res.status(200).json({ok: true});
    } catch (error) {
        res.status(500).json({error, ok: false});
    }
})

// @route   GET /exportdata
// @desc    Export product data to a CSV.
app.get('/exportdata', (req, res) => {
    fs.readFile('../database/db.json', 'utf-8', afterRead);
    function afterRead(error, data) {
        if(error) res.status(500).json({error, ok: false});
        
        const obj = JSON.parse(data);
        
        // If there's nothing to export, send back a 400 error.
        if(!obj.items[0]) res.status(400).json({message: "Nothing to export.", ok: false});

        // Get the headers for the csv file and join them all together by a ','.
        const csvRows = [];
        const headers = Object.keys(obj.items[0]);
        csvRows.push(headers.join(','));
        
        // Fill each row with the corresponding data.
        obj.items.forEach(item => {
            const values = headers.map(header => item[header]);
            csvRows.push(values.join(','));
        });
        
        // Convert everything into a csv-like string and write a csv file.
        let csv = csvRows.join('\n');
        fs.writeFile(`../data.csv`, csv, afterWrite);
    }

    function afterWrite(error) {
        if(error)   res.status(500).json({error, ok: false});
        res.status(200).json({ok: true});
    }
})

app.listen(8000, () => console.log('Backend is now running'));