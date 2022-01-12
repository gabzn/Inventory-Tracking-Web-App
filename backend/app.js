const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// @route   POST /items
// @desc    Route to create a new item to the database. 
app.post('/items', async (req, res) => {
    try {
        await axios.post('http://localhost:27001/items', req.body);
        res.json({isSuccessful: true});
    } catch (error) {
        console.log(error);
    }
})

// @route   GET /items
// @desc    Route to read all the items.
app.get('/items', async (req, res) => {
    try {
        const databaseRes = await axios.get('http://localhost:27001/items?_order=desc');
        res.json({items: databaseRes.data});
    } catch (error) {
        console.log(error);
    }
})

// @route   GET /item/:id
// @desc    Route to read a single item with the specific id.
app.get('/item/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const databaseRes = await axios.get(`http://localhost:27001/items/${id}`);
        res.json({item: databaseRes.data});
    } catch (error) {
        console.log(error);
    }
})

// @route   PUT /item/:id
// @desc    Route to update a single item with the specific id.
app.put('/item/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await axios.put(`http://localhost:27001/items/${id}`, req.body);
        res.json({isSuccessful: true});
    } catch (error) {
        console.log(error);
    }
})

// @route   DELETE /item/:id
// @desc    Route to delete a single item with the specific id.
app.delete('/item/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await axios.delete(`http://localhost:27001/items/${id}`);
        res.json({isSuccessful: true});
    } catch (error) {
        console.log(error);
    }
})

app.listen(8000, () => console.log('Backend is now running'));