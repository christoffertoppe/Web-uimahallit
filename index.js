/**
 * import all Search methods from search.js to index.js
 * @type {Search}
 */
const Search = require('./search');
const search = new Search();

/**
 * import all Add methods from add.js to index.js
 * @type {Add}
 */
const Add = require('./add');
const add = new Add();

/**
 * import all Delete methods from delete.js to index.js
 * @type {Delete}
 */
const Delete = require('./delete');
const del = new Delete();

/**
 * import all Update methods from update.js to index.js
 * @type {Update}
 */
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
  /**
   * GET /api/location/all, return json with all the swimhalls.
   * @type get
   *
   */
  let result = await search.searchAll();
  let json = JSON.stringify(result);
  res.send(json);
});

/*
 * GET /api/location, return json with the swimhalls found with searchwork found in url.
 * @get
 */
app.get('/api/location', async function(req, res) {
  let string = req.url.split('=');
  let searchWord = string[1];
  let result = await search.search(searchWord);
  let json = JSON.stringify(result);
  res.send(json);
});

/*
 * GET /api/location/city, return all swimhalls found with the city found in url.
 * @GET
 */
app.get('/api/location/city', async function(req, res) {
  let string = req.url.split('=');
  let searchWord = string[1];
  let result = await search.searchCity(searchWord);
  let json = JSON.stringify(result);
  res.send(json);
});

/*
 *  DELETE /api/comment, removes the comment with the same id as the received json.
 *  @app.delete
 */
app.delete('/api/comment', async function(req, res) {
  let id = req.body['id'];
  let comment = req.body['comment'];
  let name = req.body['name'];
  await del.deleteComment(id, comment);
  let hall = await search.search(name);
  let result = JSON.stringify(hall);
  res.send(result);
});

/*
 * POST /api/comment, adds the comment to the swimhall with the same id
 * as the received json.
 */
app.post('/api/comment', async function(req, res) {
  let id = req.body['id'];
  let comment = req.body['comment'];
  let type = req.body['type'];
  let result = '';

  await add.addComment(id, comment);

   if(type.localeCompare("all") ===  0)  {
     result = await search.searchAll();
   } else {
     result = await search.searchCity(type);
   }
     if(result.length === 0) {
       result = await search.search(type);
     }


  res.send(result);
});

/*
 * POST /api/add, adds to the database a new swimhall exactly as the
 * received json.
 */
app.post('/api/add', async function(req, res) {
  let newhall = req.body;
  let count = await add.getCount();
  newhall['_id'] = count + 1;
  await add.addNewHall(newhall);
  let allHalls = await search.searchAll();
  allHalls = JSON.stringify(allHalls);
  res.send(allHalls);
});

/*
 * PUT /api/update, if received json has the length of 2 it will try to update the swimhall with same _id
 * by changing the  field called hinta with a new value.
 */
app.put('/api/update', async function(req, res) {
  let id = req.body['_id'];
  if (req.body.length === 2) {
    let hinta = parseInt(req.body['hinta']);
    await update.update(id, hinta);
  } else {
    await update.updateAll(id, req.body);
  }
  let allHalls = await search.searchAll();
  allHalls = JSON.stringify(allHalls);
  res.send(allHalls);
});

/*
 * DELELTE /api/removeswimhall, will remove the swimhall with the same _id value as in the received json.
 */
app.delete('/api/removeswimhall', async function(req, res) {
  let id = req.body['_id'];
  if (id != null) {
    await del.deleteSwimHall(id);
  }
  let allHalls = await search.searchAll();
  allHalls = JSON.stringify(allHalls);
  res.send(allHalls);
});

// code for a notification functionality that was never taken to use.
/*
app.delete('/api/notification', function(req, res) {
  let string = req.url.split('=');
  let removeId = string[1];
  let result = removeNotification(removeId);
  res.send(result);
});

app.post('/api/notification', function(req, res) {

  //let result = addNotification(message);
  res.send(result);
});
*/

/*
 *  POST /api/auth, method handler for authentication on the admin page on the main app.
 */
app.post('/api/auth', async function(req, res) {

  let username = process.env.ADMIN_USER;
  let password = process.env.ADMIN_PASSWORD;

  if (req.body['usr'] === username && req.body['pw'] === password) {
    res.json({status: 'ACCEPTED'});
  } else {
    res.json({status: 'DENIED'});
  }
});

/**
 * configuration on what port the server will be runned at
 * if the port is free, else it will stop with an error.
 * in our project the port is 8080
 * @type {http.Server}
 */
var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});