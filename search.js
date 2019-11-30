var mongo = require('mongodb');
require('dotenv').config();
const MongoClient = mongo.MongoClient;

const uri = 'mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri,
    {useNewUrlParser: true, useUnifiedTopology: true});

class Search {
// search will search for the given city in the address.
  async search(req) {
    try {
      await client.connect();
      let result = await findByCity(client, req);
      return(result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function findByCity(client) {
      const cursor = await client.db('swim_halls').collection('halls_capital_area').find({kaupunki: req});
      const result = await cursor.toArray();
      return result;
    }
  }
// searchAll will return all the data stored on the database.
  async searchAll() {
    try {
      await client.connect();
      let result = await findAllListings(client);
      return(result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function findAllListings(client) {
      const cursor = await client.db('swim_halls').collection('halls_capital_area').find();
      const result = await cursor.toArray();
      console.log(result);
      return(result);
    }
  }
  async searchEspoo(search) {

    return result;
  }

 async searchVantaa(search) {

    return result;
  }

async searchHelsinki(search) {

  try {
    await client.connect();
    let result = findByCity();
    return(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  async function findByCity(client) {
    const cursor = await client.db('swim_halls').collection('halls_capital_area').find({kaupunki: "Helsinki"});
    const result = await cursor.toArray();
    console.log(result);
  }
    return result;
  }

  async searchKauniainen(search) {

    return result;
  }

  async searchKerava(search) {

    return result;
  }
}

module.exports = Search;