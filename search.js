var mongo = require('mongodb');
require('dotenv').config();
const MongoClient = mongo.MongoClient;

const uri = 'mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri,
    {useNewUrlParser: true, useUnifiedTopology: true});

class Search {

  async search(req) {
    let string = req.url.split('=');
    let location = string[1];

    return result;
  }

  async searchAll() {

    try {
      await client.connect();
      let result = await findAllListings(client);
      console.log(result);
      return(result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function findAllListings(client) {
      const cursor = await client.db('swim_halls').collection('halls_capital_area').find();
      const result = await cursor.toArray();
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