/*import {search, searchAll, searchEspoo, searchVantaa, searchHelsinki, searchKerava, searchKauniainen} from './search';
import {removeComment, removeNotification} from './delete';
import {} from './add';*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

/*
app.get('/', (req, res) => {
    res.send(
        'Behold The MEVN Stack!'
    );
});
*/
app.get('/api/location/all', function(req, res) {
    let result = searchAll(req);
    res.send(result);
});

app.get('/api/location/vantaa', function(req, res) {
    let result = searchVantaa(req);
    res.send(result);
});

app.get('/api/location/espoo', function(req, res) {
    let result = searchEspoo(req);
    res.send(result);
});

app.get('/api/location/helsinki', function(req, res) {
    let result = searchHelsinki(req);
    res.send(result);
});

app.get('/api/location/kauniainen', function(req, res) {
    let result = searchKauniainen(req);
    res.send(result);
});

app.get('/api/location/kerava', function(req, res) {
    let result = searchKerava(req);
    res.send(result);
});


app.get('/api/location', function(req, res) {
    let string = req.url.split('=');
    let searchWord = string[1];
    let result = search(searchWord);
    res.send(result);
});

app.delete('/api/comment', function(req, res) {
    let string = req.url.split('=');
    let removeId = string[1];
    let result = removeComment(removeId);
    res.send(result);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});