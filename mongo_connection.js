var mysql = require('mysql');
var express = require('express');
var app = express();
var mongo = require('mongodb');
require('dotenv').config();

const MongoClient = mongo.MongoClient;

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//CREATE
async function createListing(client, newListing) {
  const result = await client.db('swim_halls').collection('halls_capital_area').insertOne(newListing);
  console.log(
      `New swimhall created with the following id: ${result.insertedId}`);
}

//READALL
async function findOAllListings(client) {
  const cursor = await client.db('swim_halls').collection('halls_capital_area').find();
  const result = await cursor.toArray();
  console.log(result);
}

//READ
async function findOneListingByName(client, nameOfListing) {
  const result = await client.db('swim_halls').collection('halls_capital_area').findOne({nimi: nameOfListing});
  if (result) {
    console.log(
        `Found a listing in the collection with the name '${nameOfListing}':`);
    console.log(result);
  } else {
    console.log(`No listings found with the name '${nameOfListing}'`);
  }
}

//UPDATE
async function updateListingByName(client, nameOfListing, updatedListing){
  result = await client.db('swim_halls').collection('halls_capital_area').updateOne({nimi: nameOfListing}, {$set: updatedListing});

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//DELETE
async function deleteListingByName(client, numberOfListing){
  result = await client.db('swim_halls').collection('halls_capital_area').deleteOne({_id: numberOfListing});
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function main() {
  const uri = 'mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
  const client = new MongoClient(uri,
      {useNewUrlParser: true, useUnifiedTopology: true});
  try {
    await client.connect();
    //await listDatabases(client);
    await findOAllListings(client);
    //await findOneListingByName(client, "Haagan uimahalli");
    //await deleteListingByName(client, 3);
    /*await updateListingByName(client, "Haagan uimahalli", {
      aika: [
            'kiinni',
            'kiinni',
            '16.00-20.00',
            '16.00-20.00',
            '16.00-20.00',
            '9.00–15.00',
            '9.00–15.00'],
    });
    await createListing(client,
        {
          _id: 3,
          nimi: 'BLAABLAA uimahalli',
          ratapituus: 25,
          //ratamäärä: ,
          puhelin: "0947741827",
          aika: [
            'kiinni',
            'kiinni',
            '16.00-20.00',
            '16.00-20.00',
            '16.00-20.00',
            '9.00–15.00',
            '9.00–15.00'],
          hinta: 5.0,
          alehinta: 2.5,
          osoite: 'Isonnevantie 8, 00320 Helsinki',
        },
    );*/
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.err);