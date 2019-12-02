var mongo = require('mongodb');
require('dotenv').config();
const MongoClient = mongo.MongoClient;


class Search {

  async search(keyword) {
    const uri = 'mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      let result = await findByWord(client, keyword);
      return(result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function findByWord(client, keyword) {
      const cursor = await client.db('swim_halls').collection('halls_capital_area').find({nimi: new RegExp(".*"+keyword+".*", "i")});
      const result = await cursor.toArray();
      return result;
    }
  }

// search will search for swimminghalls with specific city name.
  async searchCity(req) {
    const uri = 'mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
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
    const uri = 'mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
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
}

module.exports = Search;