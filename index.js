const Search = require('./search');
const search = new Search();

const Add = require('./add');
const add = new Add();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/location/all', async function(req, res) {
    let result = await search.searchAll();
    let json = JSON.stringify(result);
    res.send(json);

});

app.get('/api/location', async function(req, res) {
  let result = await search.search();
  let json = JSON.stringify(result);
  res.send(json);

});

app.get('/api/location/city',async function(req, res) {
    let string = req.url.split('=');
    let searchWord = string[1];
    let result = await search.searchCity(searchWord);
    let json = JSON.stringify(result);
    res.send(json);
});

app.delete('/api/comment', function(req, res) {
    let string = req.url.split('=');
    let removeId = string[1];
    let result = removeComment(removeId);
    res.send(result);
});

app.post('/api/comment', function(req, res) {
  id = req.body['id'];
  comment = req.body['comment'];
  add.addComment(id, comment);
  res.send("kiitos kommentistasi");
});

app.post('/api/add', function(req, res) {
  console.log(req.body);
//  add.addNewHall(req.body);
  res.send("halli lisätty");
});

/*
app.delete('/api/notification', function(req, res) {
  let string = req.url.split('=');
  let removeId = string[1];
  let result = removeNotification(removeId);
  res.send(result);
});

app.post('/api/notification', function(req, res) {

  //let result = addNotification(addMsg);
  res.send(result);
});
*/

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});