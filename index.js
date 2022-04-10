const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8888;

const components = [];
const category = ['Podzespoły', 'Urządzenia peryferyjne', 'Oprogramowanie', 'Inne'];

app.listen(port, () => {
    console.log(`Server is working on ${port} port`);
});

//components methods handle
app.post('/components', (req, res) => {

    switch (req.body.type) {
        case 'add':
            return components.push(req.body.item);
        case 'modify':
            const compId = req.body.item.id;
            const index = components.findIndex(item => item.id === compId);
            components.splice(index, 1);
            return components.push(req.body.item);
        default:
            break;
    }
    // components.push(req.body);
    res.status(200).end();
});

app.get('/components', (req, res) => {
    res.json(components);
});

app.delete('/components/:compId', (req, res) => {
    const compId = parseInt(req.params.compId);
    const index = components.findIndex(element => element.id === compId);
    components.splice(index, 1);
    res.status(200).end();
});

//category methods handle
app.get('/category', (req, res) => {
    res.json(category);
    res.status(200).end();
});

app.post('/category', (req, res) => {

    category.push(req.body.categoryName);
    res.status(200).end();
});

