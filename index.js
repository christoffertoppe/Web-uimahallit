const Search = require('./search');
const search = new Search();

const Add = require('./add');
const add = new Add();

const Delete = require('./delete');
const del = new Delete();

const Update = require('./update');
const update = new Update();

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
  let string = req.url.split('=');
  let searchWord = string[1];
  let result = await search.search(searchWord);
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
  let id = req.body['id'];
  let comment = req.body['comment'];
  del.deleteComment(id, comment);
    res.send();
});

app.post('/api/comment', function(req, res) {
  let id = req.body['id'];
  let comment = req.body['comment'];
  add.addComment(id, comment);
  res.send("kiitos kommentistasi");
});

app.post('/api/add', async function(req, res) {
  //console.log(req.body);
  let newhall = req.body;
  let count = await add.getCount();
  newhall['_id'] = count+1;
  //console.log(newhall['_id']);
  //console.log(newhall);
  await add.addNewHall(newhall);
  res.send("halli lisätty");
});

app.put('/api/update', function(req, res) {
  let id = req.body["_id"];
  if(req.body.length === 2) {
    let hinta = parseInt(req.body["hinta"]);
    update.update(id, hinta);
  } else {
    update.updateAll(id, req.body)
  }
  res.send();
});

app.delete('/api/removeswimhall', function (req, res) {
  let id = req.body["_id"];
  if( id != null) {
    del.deleteSwimHall(id);
  }
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

/* POST method handler for authentication on the admin page on the main app.*/
app.post('/api/auth', function(req, res){

  let username = process.env.ADMIN_USER;
  let password = process.env.ADMIN_PASSWORD;

  if(req.body["usr"] === username && req.body["pw"] === password){
    res.json({status: "ACCEPTED"});
  }else{
    res.json({status: "DENIED"});
  }
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});