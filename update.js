var mongo = require('mongodb');
require('dotenv').config();
const MongoClient = mongo.MongoClient;

/**
 * class that lets you update the information stored on the database
 */
class Update{
  /**
   * lets you update the price of the swimhalls ticket.
   * @param id
   * @param updateInfo
   * @returns {Promise<void>}
   */
  async update(id, updateInfo) {
    const uri = 'mongodb+srv://' + process.env.DB_USER + ':' +
        process.env.DB_PASSWORD +
        '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      let result = await updateField(client, id, updateInfo);
      return (result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function updateField(client, idOfListing, updateInfo) {
      console.log(updateInfo);
      let result = await client.db('swim_halls').
          collection('halls_capital_area').
          updateOne({_id: idOfListing}, {$set: {hinta: updateInfo}});
      console.log(`${result.matchedCount} document(s) matched the query criteria.`);
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
  }

  /**
   * lets you update the whole swimhalls info
   * @param id
   * @param updateInfo
   * @returns {Promise<void>}
   */
  async updateAll(id, updateInfo) {
    const uri = 'mongodb+srv://' + process.env.DB_USER + ':' +
        process.env.DB_PASSWORD +
        '@siseujula-vfiyp.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(uri,
        {useNewUrlParser: true, useUnifiedTopology: true});
    try {
      await client.connect();
      let result = await updateField(client, id, updateInfo);
      return (result);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function updateField(client, idOfListing, jsonObject) {
      let result = await client.db('swim_halls').
          collection('halls_capital_area').
          updateOne({_id: idOfListing}, {$set: {nimi:jsonObject["nimi"],
                                                ratapituus: jsonObject["ratapituus"],
                                                ratamäärä: jsonObject["ratamäärä"],
                                                puhelin: jsonObject["puhelin"],
                                                aika: jsonObject["aika"],
                                                hinta: jsonObject["hinta"],
                                                alehinta: jsonObject["alehinta"],
                                                osoite: jsonObject["osoite"],
                                                kaupunki: jsonObject["kaupunki"],
                                                kommentit: jsonObject["kommentit"],
                                                url: jsonObject["url"]
                                              }});
      console.log(`${result.matchedCount} document(s) matched the query criteria.`);
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
  }


}
module.exports = Update;