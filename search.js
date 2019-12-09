var mongo = require('mongodb');
require('dotenv').config();
const MongoClient = mongo.MongoClient;

/**
 * Class that have different search methods to get information from mongo database.
 */
class Search {
  /**
   * search database for swimhalls with same name as the keyword.
   * @param keyword search word
   *
   * @returns {Promise<*>}
   */
  async search(keyword) {
    keyword = keyword.replace(/%C3%A4/g, 'ä');
    keyword = keyword.replace(/%C3%A5/g, 'å');
    keyword = keyword.replace(/%C3%B6/g, 'ö');
    const uri = 'mongodb+srv://' + process.env.DB_USER + ':' +
        process.env.DB_PASSWORD +
        '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      let result = await findByWord(client, keyword);
      return (result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function findByWord(client, keyword) {
      const cursor = await client.db('swim_halls').
          collection('halls_capital_area').
          find({nimi: new RegExp('.*' + keyword + '.*', 'i')});
      const result = await cursor.toArray();
      return result;
    }
  }

  /**
   *  searchCity will search for swimminghalls with specific city name.
   * @param city city to search for
   * @returns {Promise<*>}
   */
  async searchCity(city) {
    const uri = 'mongodb+srv://' + process.env.DB_USER + ':' +
        process.env.DB_PASSWORD +
        '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      let result = await findByCity;
      return (result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function findByCity() {
      const cursor = await client.db('swim_halls').
          collection('halls_capital_area').
          find({kaupunki: city});
      const result = await cursor.toArray();
      return result;
    }
  }

  /**
   * searchAll will return all the data stored on the database.
   */
  async searchAll() {
    const uri = 'mongodb+srv://' + process.env.DB_USER + ':' +
        process.env.DB_PASSWORD +
        '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      let result = await findAllListings(client);
      return (result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function findAllListings(client) {
      const cursor = await client.db('swim_halls').
          collection('halls_capital_area').
          find();
      const result = await cursor.toArray();
      console.log(result);
      return (result);
    }
  }
}

module.exports = Search;